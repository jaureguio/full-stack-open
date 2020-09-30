const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const utils = require('../utils')

const { config } = utils

blogsRouter.route('/')
  .get(async (_, res) => {
    // The express-async-errors package saves us the need to catch async errors in all the controller handlers with try/catch blocks
    // try {
    //   const blogs = await Blog.find({})
    //   res.json(blogs)
    // } catch (error) {
    //   next(error)
    // }

    const blogs =
      await Blog
        .find({})
        .populate('user', { name: 1, username: 1, id: 1 })

    res.json(blogs)
  })
  .post(async (req, res) => {
    const token = req.token
    const decodedToken = jwt.verify(token, config.SECRET)

    if(!token || !decodedToken.id) {
      throw Error(jwt.JsonWebTokenError)
    }

    const user = await User.findById(decodedToken.id)

    const { likes } = req.body

    const newEntry = {
      ...req.body,
      user: user._id,
      likes: likes ? likes : 0
    }

    const blog = new Blog(newEntry)
    const savedBlog =
      await blog.save()

    user.blogs = user.blogs.concat(savedBlog)
    await user.save()

    await savedBlog
      .populate('user', { name: 1, username: 1, id: 1 })
      .execPopulate()

    res.status(201).json(savedBlog)
  })

blogsRouter.route('/:id')
  .put(async (req, res) => {
    const updatedBlog =
      await Blog.findByIdAndUpdate(
        req.params.id,
        { $inc: { likes: 1 } },
        { new: true }
      )

    res.status(200).json(updatedBlog)
  })
  .delete(async (req, res) => {
    const blogId = req.params.id
    const token = req.token
    const decodedToken = jwt.verify(token, config.SECRET)
    if(!token || !decodedToken.id) {
      throw jwt.JsonWebTokenError
    }
    const userFromToken = await User.findById(decodedToken.id)
    const blogToRemove = await Blog.findById(blogId)

    if(userFromToken._id.toString() !== blogToRemove.user.toString()) {
      return res
        .status(401)
        .send({ error: 'user is not allow to delete this blog' })
    }

    await blogToRemove.remove()

    userFromToken.blogs =
      userFromToken
        .blogs
        .filter(blog => blogToRemove._id.toString() !== blog.toString())
    await userFromToken.save()

    res.status(204).end()
  })

module.exports = blogsRouter