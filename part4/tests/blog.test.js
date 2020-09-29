const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')

const { getBlogList, initializeBlog } = helper

const api = supertest(app)

afterAll(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
  await initializeBlog()
})

describe('when there are some initial blogs saved', () => {
  test('all blog entries are correctly retrieved', async () => {
    const blogs = await getBlogList()

    expect(blogs).toHaveLength(3)
  })

  test('a blog list entry have an id property defined', async () => {
    const blogs = await getBlogList()
    expect(blogs[2].id).toBeDefined()
  })

  test.skip('a blog list entry displays info about authoring user', async () => {
    // TODO
  })

  test('blog list gets incremented when a new entry is submitted', async () => {
    const blogsAtStart = await getBlogList()

    const newBlog = {
      title: 'Testing to Success',
      author: 'Oscar Jauregui',
      likes: 12,
      url: 'https://oscarincredibleapps.com/',
    }

    const { body: addedBlog } =
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await getBlogList()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    expect(addedBlog.title).toBe(newBlog.title)
  })

  describe('adding a new blog', () => {
    test('succeeds with likes set to 0 when it is not provided', async () => {
      const blogNoLikes = {
        author: 'Katiuska',
        title: 'How to watch movies without blinking',
        url: 'www.wonderfulmovies.com'
      }

      const { body: addedBlog } = await api
        .post('/api/blogs')
        .send(blogNoLikes)
        .expect(201)

      expect(addedBlog.likes).toBe(0)
    })

    test('fails with statuscode 400 when title or url properties are not provided', async () => {
      const blogsAtStart = await getBlogList()

      const invalidBlogNoUrl = {
        author: 'Katiuska',
        title: 'How to watch movies without blinking',
        likes: 23,
      }
      const invalidBlogNoTitle = {
        author: 'Katiuska',
        url: 'www.ilovemovies.com',
        likes: 23,
      }

      await api
        .post('/api/blogs')
        .send(invalidBlogNoUrl)
        .expect(400)
      await api
        .post('/api/blogs')
        .send(invalidBlogNoTitle)
        .expect(400)

      const blogsAtEnd = await getBlogList()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
  })

  test('succeeds with statuscode 204 when a blog is deleted', async () => {
    const blogsAtStart = await getBlogList()

    const existingBlog = blogsAtStart[2]

    await api
      .delete(`/api/blogs/${existingBlog.id}`)
      .expect(204)

    const blogsAtEnd = await getBlogList()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('updates like count of a given blog', async () => {
    const blogsAtStart = await getBlogList()

    const { id: blogId } = blogsAtStart[2]

    await api
      .put(`/api/blogs/${blogId}`)
      .send({ likes: 1 })
      .expect(200)

    const blogsAtEnd = await getBlogList()

    expect(blogsAtEnd[2].likes).toBe(blogsAtStart[2].likes + 1)
  })
})

