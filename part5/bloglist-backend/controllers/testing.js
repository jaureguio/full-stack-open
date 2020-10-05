const fs = require('fs')
const path = require('path')
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.route('/reset')
  .post(async (_, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    res.status(204).end()
  })

router.route('/init')
  .post(async (_, res) => {
    const users = fs.readFileSync(path.join(__dirname, '/db-users.txt'), 'utf-8')
    const blogs = fs.readFileSync(path.join(__dirname, '/db-blogs.txt'), 'utf-8')

    await Blog.insertMany(JSON.parse(blogs))
    await User.insertMany(JSON.parse(users))

    res.status(204).end()
  })
module.exports = router