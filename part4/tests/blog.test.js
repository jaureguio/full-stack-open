const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./test_helper')

const {
  initializeDB,
  clearDB,
  getUserList,
  getBlogList,
  dummyBlog,
  getUser,
  tokenizeUser
} = helper

const api = supertest(app)

afterAll(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
  await initializeDB()
})

describe('when there are some initial blogs saved', () => {
  test('all blog entries are correctly retrieved', async () => {
    const blogsAtStart = await getBlogList()
    const { body: blogList } =
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(blogList).toHaveLength(blogsAtStart.length)
  })

  test('a blog list entry have an id property defined', async () => {
    const { body: blogList } =
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(blogList[2].id).toBeDefined()
  })

  test('a blog entry has info about a user', async () => {
    const { body: blogList } =
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blog = blogList[0]
    const userInfo =  blog.user

    expect(userInfo.name).toBeDefined()
    expect(userInfo.username).toBeDefined()
    expect(userInfo.id).toBeDefined()
  })

  test('succeeds with statuscode 204 when a blog is deleted', async () => {
    const blogsAtStart = await getBlogList()

    const existingBlog = blogsAtStart[2]
    const userFromBlog = await getUser(existingBlog.user.id)
    const token = tokenizeUser(userFromBlog)

    await api
      .delete(`/api/blogs/${existingBlog.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)

    const blogsAtEnd = await getBlogList()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('updates likes count of a given blog', async () => {
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

describe('adding a new blog', () => {
  test('succeeds with likes set to 0 when it is not provided', async () => {
    const blogNoLikes = {
      author: 'Katiuska',
      title: 'How to watch movies without blinking',
      url: 'www.wonderfulmovies.com'
    }

    const anyUser = await getUser()
    const token = tokenizeUser(anyUser)

    const { body: addedBlog } = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogNoLikes)
      .expect(201)

    expect(addedBlog.likes).toBe(0)
  })

  test('a blog list entry displays info about any user', async () => {
    const anyUser = await getUser()
    const token = tokenizeUser(anyUser)
    const userInfoInBlog = {
      username: anyUser.username,
      id: anyUser._id.toString(),
      name: anyUser.name,
    }

    const { body: addedBlog } =
      await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${token}`})
        .send(dummyBlog)
        .expect(201)

    expect(addedBlog.user).toEqual(userInfoInBlog)
  })

  test('blog list gets incremented when a new entry is submitted', async () => {
    const blogsAtStart = await getBlogList()
    const anyUser = await getUser()
    const token = tokenizeUser(anyUser)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(dummyBlog)
      .expect(201)

    const blogsAtEnd = await getBlogList()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
  })

  test('fails with statuscode 400 when title or url properties are not provided', async () => {
    const blogsAtStart = await getBlogList()
    const anyUser = await getUser()
    const token = tokenizeUser(anyUser)

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
      .set('Authorization', `Bearer ${token}`)
      .send(invalidBlogNoUrl)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidBlogNoTitle)
      .expect(400)

    const blogsAtEnd = await getBlogList()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})
