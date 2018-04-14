const Request = require('request')

const SLACK_URL = process.env.SLACK_URL
console.log(`SLACK_URL: ${SLACK_URL}`)

const headers = {
    'Content-Type': 'application/json'
}

const options = {
    url: SLACK_URL,
    method: 'POST',
    headers: headers,
}

const postPayload = {
  channel: '#core-team',
  username: 'titoBot',
  icon_emoji: ':ghost:'
}

exports.message = (tickets) => {
  console.log(`Session Updated Message Called`)

  const slackMessage = buildSlackMessage(tickets)
  const payload = Object.assign({}, slackMessage, postPayload)
  const reqOpts = Object.assign({ body: JSON.stringify(payload) }, options)

  console.log(`Formatted Slack Message: \n ${JSON.stringify(payload)}`)

  Request(reqOpts)
}

const buildSlackMessage = (tickets) => {

  let slackMessage = {
    text: `:tada: today's ti.to ticket count!!!
    \r\n
    Total Professionals: ${tickets.totals.professionals}
    Total Family: ${tickets.totals.family}
    Total Sponsors: ${tickets.totals.sponsors}
    Total Counselors: ${tickets.totals.counselors}
    Total: ${tickets.totals.total}`,
    attachments: []
  }

  //let's build each attachments
  for (ticket of tickets.tickets) {
    let attachment = {
      fallback: slackMessage.text,
      color: whatColor(ticket.ticket),
      author_name: ticket.ticket,
      text: ticket.count,
    }

    slackMessage.attachments.push(attachment)
  }

  return slackMessage
}

const whatColor = (ticketType) => {
  const colors = {
      speaker: '#3666a6',
      camper: '#36a64f',
      spouse: '#a436a6',
      kid: '#ebe815',
      sponsor: '#ff0000'
  }

  let color = colors.camper;

  switch (ticketType) {
    case 'Counselor':
      color = colors.speaker
      break

    case 'Sponsored Counselor':
      color = colors.speaker
      break

    case 'Family Access - Adult':
      color = colors.spouse
      break

    case 'Invoiced Family Access - Adult':
      color = colors.spouse
      break

    case 'Family Access - Child':
      color = colors.kid
      break

    case 'Invoiced Family Access - Child':
      color = colors.kid
      break

    case 'Sponsor (Expo Hall Only)':
      color = colors.sponsor
      break
  }

  return color
}
