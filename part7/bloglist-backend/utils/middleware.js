const morgan = require('morgan')
const logger = require('./logger')

const errorHandler = (error, _, res, next) => {
  logger.error('logger: ', error.name)

  switch (error.name) {
    case 'CastError': {
      return res.status(400).send({ error: 'malformatted id' })
    }
    case 'ValidationError': {
      return res.status(400).send({ error: error.message })
    }
    case 'JsonWebTokenError': {
      return res.status(401).send({ error: 'invalid token' })
    }
    default: {
      next(error)
      break
    }
  }
}

const unknowEndpoint = (_, res) => res.status(404).send({ error: 'unknown endpoint' })

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const requestsLogger = () => {
  morgan.token('body', (req) => {
    if(req.method !== 'POST' || req.method !== 'PUT') return null
    return `${JSON.stringify(req.body)}`
  })

  return morgan(':method :url :status :res[content-length] - :response-time ms :body')
}
module.exports = {
  errorHandler, tokenExtractor, unknowEndpoint, requestsLogger
}