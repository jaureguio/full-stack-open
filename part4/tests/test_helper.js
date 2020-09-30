const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
    author: 'Katiuska Guaita',
    url: 'https://katyincredibleapps.com/',
    likes: 25,
  }
]

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
  },
  {
    name: 'Michael Chan',
    username: 'mchan',
    password: 'mchan123'
  },
]

const initializeUsers = async () => {
  await User.deleteMany({})

  for(let baseUser of baseUserList) {
    baseUser.passwordHash = await bcrypt.hash(baseUser.password, 10)
  }

  const createUsers = baseUserList.map(baseUser => new User(baseUser))
  const usersPromises = createUsers.map(user => user.save())
  return Promise.all(usersPromises)
}

const initializeBlogs = async () => {
  await Blog.deleteMany({})
  const users = await getUserList()

  for(let user of users) {
    for(let blog of baseBlogList) {
      if(blog.author === user.name) {
        blog.user = user._id
      }
    }
  }

  const createBlogs = baseBlogList.map(baseBlog => new Blog(baseBlog))
  const blogsPromises = createBlogs.map(blog => blog.save())
  const createdBlogs = await Promise.all(blogsPromises)

  for(let blog of createdBlogs) {
    for(let user of users) {
      if(blog.author === user.name) {
        user.blogs = user.blogs.concat(blog._id)
      }
    }
  }

  const updateUsersPromises = users.map(user => user.save())
  await Promise.all(updateUsersPromises)
}

const initializeDB = async () => {
  await initializeUsers()
  await initializeBlogs()
}

const clearDB = async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
}
const getUserList = async () =>
  await User
    .find({})
    .populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1
    })

const getBlogList = async () =>
  await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1,
      id: 1
    })

const dummyUser = {
  name: 'Esteban Agostini',
  username: 'estaban1',
  password: 'esteban1234'
}
const dummyBlog = {
  title: 'Testing to Success',
  author: 'Esteban Agostini',
  likes: 12,
  url: 'https://oscarincredibleapps.com/',
}

const getUser = async (userId) => {
  if(!userId) {
    // get any user
    return await User.findOne({})
  }
  return await User.findById(userId)
}

const tokenizeUser = ({ username, _id }) => {
  const userForToken = { username, id: _id }
  return jwt.sign(userForToken, SECRET)
}

module.exports = {
  initializeDB,
  clearDB,
  baseBlogList,
  dummyBlog,
  getBlogList,
  dummyUser,
  getUserList,
  getUser,
  tokenizeUser,
}