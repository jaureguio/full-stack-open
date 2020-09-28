const Blog = require('../models/blog')

const baseBlogList = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Sports Statistics App',
    author: 'Oscar Jauregui',
    url: 'https://oscarincredibleapps.com/',
    likes: 700
  },
  {
    title: 'Wonderful App',
    author: 'Esteban Agostini',
    url: 'https://oscarincredibleapps.com/',
    likes: 25,
  }
]

const initializeBlog = async () => {
  await Blog.deleteMany({})

  const createdBlogs = baseBlogList.map(blog => new Blog(blog))
  const blogsPromises = createdBlogs.map(blog => blog.save())

  await Promise.all(blogsPromises)
}

const getBlogList = async () => await Blog.find({})

module.exports = {
  baseBlogList,
  initializeBlog,
  getBlogList,
}