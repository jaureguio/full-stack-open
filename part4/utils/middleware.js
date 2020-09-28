const logger = require('./logger')
const unknowEndpoint = (_, res) => res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (error, _, res, next) => {
  logger.error('logger: ', error.name)
  // if(error.name === 'CastError') {
  //   return res.status(400).send({ error: 'malformatted id' })
  // }

  if(error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknowEndpoint,
  errorHandler
}