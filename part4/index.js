const http = require('http')
const app = require('./app')
const utils = require('./utils')

const { config, logger } = utils

const { PORT } = config

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
