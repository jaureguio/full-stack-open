const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.route('/')
  .get(async (_, res) => {
    // The express-async-errors package saves us the need to catch async errors in all the controller handlers with try/catch blocks
    // try {
    //   const blogs = await Blog.find({})
    //   res.json(blogs)
    // } catch (error) {
    //   next(error)
    // }

    const blogs = await Blog.find({})
    res.json(blogs)
  })
  .post(async (req, res, next) => {
    const { likes } = req.body

    const newEntry = {
      ...req.body,
      likes: likes ? likes : 0
    }
    const blog = new Blog(newEntry)

    try {
      const savedBlog = await blog.save()
      res.status(201).json(savedBlog)
    } catch(error) {
      next(error)
    }
  })

blogsRouter.route('/:id')
  .put(async (req, res, next) => {
    try {
      const updatedBlog =
        await Blog
          .findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true })
      res.status(200).json(updatedBlog)
    } catch (error) {
      next(error)
    }
  })
  .delete(async (req, res, next) => {
    try {
      await Blog.findByIdAndDelete(req.params.id)
      res.status(204).end()
    } catch(error) {
      next(error)
    }
  })

module.exports = blogsRouter