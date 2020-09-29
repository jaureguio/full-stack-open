const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const utils = require('./utils')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/user')

const { middleware } = utils

const { unknowEndpoint, errorHandler } = middleware

morgan.token('body', (req) => {
  if(req.method !== 'POST') return null

  return `${JSON.stringify(req.body)}`
})

app
  .use(cors())
  .use(express.json())
  .use(morgan(
    ':method :url :status :res[content-length] - :response-time ms :body'
  ))
  .use('/api/blogs', blogsRouter)
  .use('/api/users', userRouter)
  .use(unknowEndpoint)
  .use(errorHandler)

module.exports = app