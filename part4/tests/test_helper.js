const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const utils = require('../utils')

const { config } = utils
const { SECRET } = config

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

  return Promise.all(blogsPromises)
}

const getBlogList = async () => await Blog.find({})

const baseUserList = [
  {
    name: 'Oscar Jauregui',
    username: 'oscarj',
    password: 'oscar1234'
  },
  {
    name: 'Katiuska Guaita',
    username: 'kbdv',
    password: 'katy1234'
  }
]

const initializeUsers = async () => {
  await User.deleteMany({})

  for(let i = 0; i < baseUserList.length; i++) {
    baseUserList[i].password = await bcrypt.hash(baseUserList[i].password, 10)
    baseUserList[i] = new User(baseUserList[i])
  }
  return Promise.all(baseUserList)
}

const getUserList = async () => await User.find({})

module.exports = {
  baseBlogList,
  initializeBlog,
  getBlogList,
  initializeUsers,
  getUserList,
}