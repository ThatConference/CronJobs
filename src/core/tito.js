const fetch = require("node-fetch");

const options = {
  port: 443,
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Token token=${process.env.TITO_API_TOKEN}`
  }
};

exports.getDailySummary = async () => {
  const ticketsReturned = await fetch(
    `https://${process.env.TITO_API_HOST}${process.env.TITO_API_PATH}`,
    options
  ).then(res => res.json());

  const overallTotal = ticketsReturned.data.reduce(
    (accum, val) => accum + parseInt(val.attributes[`quantity-sold`]),
    0
  );

  console.log(overallTotal);

  let tickets = ticketsReturned.data.map(ticket => ({
    ticket: ticket.attributes.title,
    count: ticket.attributes[`quantity-sold`]
  }));

  return { overallTotal, tickets };
};
