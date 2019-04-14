require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("./utility/logger");

const routes = require("./api");

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("*", cors());

routes(app);

app.listen(port, () => {
  logger.info(`Http server listening on http://localhost:${port}`);
});
