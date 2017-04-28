require('dotenv').config()

const Hapi = require('hapi')
const logger = require('./utility/logger')

const server = new Hapi.Server()
const port = Number(process.env.PORT || 8000)
server.connection({
  port: port
})

server.route(require('./routes')())

exports.listen = () => {
  server.start((err) => {
    if (err) {
      logger.error(`Http server start error: ${err}`)
      throw err
    }

    logger.info(`Http server listening on http://localhost:${port}`)
  })
}

exports.close = (next) => {
  server.stop(next)
}

if (require.main === module) {
  exports.listen()
}
