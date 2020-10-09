const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

router.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', { name: 1, username: 1 })
  response.json(blog)
})

router.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete blogs' })
  }

  await blog.remove()
  user.blogs = user.blogs.filter(b => b.id.toString() !== request.params.id.toString())
  await user.save()
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = request.body
  blog.user = blog.user.id
  const updatedBlog = await (await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }))
    .populate('user', { username: 1, name: 1 })
    .execPopulate()
  response.json(updatedBlog)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: 'title or url missing ' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

  blog.user = user
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

router.post('/:id/comments', async (request, response) => {
  const { comment } = request.body

  const blogWithNewComment = await Blog
    .findByIdAndUpdate(
      request.params.id,
      { $push: { comments: comment } },
      { new: true },
    )

  const blogWithNewCommentPopulated = await blogWithNewComment
    .populate('user', { name: 1, username: 1 })
    .execPopulate()

  response.status(201).json(blogWithNewCommentPopulated)
})

module.exports = router