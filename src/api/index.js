const tito = require("./tito");

module.exports = app => {
  app.route("/tito/daily").get(tito.get);
};
