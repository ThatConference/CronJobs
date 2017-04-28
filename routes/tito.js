const Tito = require('../core/tito')
const logger = require('../utility/logger')

exports.dailyUpdate = () => {
  return function (request, reply) {
    logger.info('Tito Seed Called')
    Tito.getTickets(reply)
  }
}
