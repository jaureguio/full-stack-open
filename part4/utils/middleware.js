const jwt = require('jsonwebtoken')
const logger = require('./logger')
const helpers = require('./helpers')

const { getTokenFromHeader } = helpers

const tokenExtractor = (req, res, next) => {
  req.token = getTokenFromHeader(req)
  next()
}

const unknowEndpoint = (_, res) => res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (error, _, res, next) => {
  logger.error('logger: ', error.name)

  switch (error.name) {
    case 'CastError': {
      res.status(400).send({ error: 'malformatted id' })
      break
    }
    case 'ValidationError': {
      res.status(400).send({ error: error.message })
      break
    }
    case 'JsonWebTokenError': {
      res.status(401).send({ error: 'invalid token' })
      break
    }
    default: {
      next(error)
      break
    }
  }
}

module.exports = {
  tokenExtractor,
  unknowEndpoint,
  errorHandler
}