const Request = require('request')
const logger = require('../utility/logger')
const slack = require('./slack')

let options = {
  url: '',
  host: 'localhost',
  path: '/',
  port: 443,
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Token token=${process.env.TITO_API_TOKEN}`
  }
}

exports.getTickets = (callback) => {
  options.url = `https://${process.env.TITO_API_HOST}${process.env.TITO_API_PATH}`
  logger.debug(`Tito HTTP Request Options: \r\n ${options}`)

  Request(options, (error, response, payload) => {
    const ticketsReturned = JSON.parse(payload)

    //todo .... reduce the totals...
    let totals = {
        professionals: 0,
        family: 0,
        sponsors: 0,
        counselors: 0,
        total: 0
    }

    totals.total = ticketsReturned.data.reduce((accum, val) => accum + parseInt(val.attributes[`quantity-sold`]), 0)

    let tickets = ticketsReturned.data.map((ticket) => {

      switch (ticket.attributes.title) {
        case 'Counselor':
          totals.counselors = totals.counselors + ticket.attributes[`quantity-sold`]
          break

        case 'Sponsored Counselor':
          totals.counselors = totals.counselors + ticket.attributes[`quantity-sold`]
          break

        case 'Family Access - Adult':
          totals.family = totals.family + ticket.attributes[`quantity-sold`]
          break

        case 'Invoiced Family Access - Adult':
          totals.family = totals.family + ticket.attributes[`quantity-sold`]
          break

        case 'Family Access - Child':
          totals.family = totals.family + ticket.attributes[`quantity-sold`]
          break

        case 'Invoiced Family Access - Child':
          totals.family = totals.family + ticket.attributes[`quantity-sold`]
          break

        case 'Sponsor (Expo Hall Only)':
          totals.sponsors = totals.sponsors + ticket.attributes[`quantity-sold`]
          break

        default:
          totals.professionals = totals.professionals + ticket.attributes[`quantity-sold`]
          break

        }

      return Object.assign({}, {ticket: ticket.attributes.title}, {count: ticket.attributes[`quantity-sold`] })
    })

    let ticketSummary = Object.assign({}, {totals: totals}, {tickets: tickets})

    logger.debug(`CLARK ${JSON.stringify(ticketSummary)}`)

    slack.message(ticketSummary)

    callback(`ok`)
  })
}
