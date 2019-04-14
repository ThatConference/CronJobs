const Request = require("request");
const _ = require("lodash");

const SLACK_URL = process.env.SLACK_URL;
console.log(`SLACK_URL: ${SLACK_URL}`);

const headers = {
  "Content-Type": "application/json"
};

const options = {
  uri: SLACK_URL,
  method: "POST",
  headers: headers
};

const postPayload = {
  channel: "#everybody",
  username: "titoBot",
  icon_emoji: ":ghost:"
};

const whatColor = ticketType => {
  const colors = {
    speaker: "#3666a6",
    camper: "#36a64f",
    spouse: "#a436a6",
    kid: "#ebe815",
    sponsor: "#ff0000",
    pig: "#ff0000"
  };

  let color = colors.camper;

  switch (ticketType) {
    case "THAT Counselor (Tues - Thurs)":
      color = colors.speaker;
      break;
    case "THAT 4 Day Everything (Mon - Thurs)":
      color = colors.camper;
      break;
    case "THAT Pre-Conference (Mon)":
      color = colors.camper;
      break;
    case "THAT 3 Day Camper (Tue - Thu)":
      color = colors.camper;
      break;
    case "THAT Campmate/Adult (Tues - Thurs)":
      color = colors.spouse;
      break;
    case "THAT Geekling/Child (Tues - Thurs)":
      color = colors.kid;
      break;
    case "THAT Pig Roast":
      color = colors.pig;
      break;
    case "THAT Sponsor (Expo Hall Only)":
      color = colors.sponsor;
      break;
    case "THAT Sponsor Counselor":
      color = colors.speaker;
      break;
    case "THAT Give Camp (Sun - Mon)":
      color = colors.camper;
      break;
    case "THAT 3 Day Camper NO FOOD (Tues - Thurs)":
      color = colors.camper;
      break;
    case "THAT Counselor Bundle":
      color = colors.speaker;
      break;
  }

  return color;
};

const buildSlackMessage = ({ overallTotal, tickets }) => {
  let slackMessage = {
    text: `:tada: today's ti.to ticket count!!!
    \r\n
    Overall Ticket Count: ${overallTotal}`,
    attachments: []
  };

  //let's build each attachments
  for (t of tickets) {
    let attachment = {
      fallback: slackMessage.text,
      color: whatColor(t.ticket),
      author_name: t.ticket,
      text: t.count
    };

    slackMessage.attachments.push(attachment);
  }

  return slackMessage;
};

exports.message = tickets => {
  console.log(`[CRON JOBS] Tito Daily Message Called`);

  const slackMessage = buildSlackMessage(tickets);
  const payload = Object.assign({}, slackMessage, postPayload);
  const reqOpts = Object.assign({ body: JSON.stringify(payload) }, options);

  // console.log(
  //   `[CRON JOBS] Formatted Slack Message: \n ${JSON.stringify(payload)}`
  // );

  return Request(reqOpts);
};
