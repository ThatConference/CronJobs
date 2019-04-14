const logger = require("../utility/logger");
const slack = require("../core/slack");
const tito = require("../core/tito");

exports.get = async (req, resp, next) => {
  logger.debug("[CRON JOBS] API Called");

  try {
    const ticketSummary = await tito.getDailySummary();
    console.log(ticketSummary);
    slack.message(ticketSummary);
    resp.send(ticketSummary);
  } catch (e) {
    next(e);
  }
};
