const unknowEndpoint = (_, res) => res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (error, req, res, next) => {
  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  if(error.name === 'ValidationError') {
    return res.status(403).send({ error: error.message })
  }

  next(error)
}

module.exports = {
  unknowEndpoint,
  errorHandler
}