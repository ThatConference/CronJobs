const Winston = require("winston");

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    data: 3,
    trace: 4,
    debug: 5,
    verbose: 6
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    data: "grey",
    trace: "magenta",
    debug: "blue",
    verbose: "cyan"
  }
};

const transportProviders = [new Winston.transports.Console()];

const logger = Winston.createLogger({
  levels: logLevels.levels,
  level: process.env.LOG_LEVEL || "verbose",
  format: Winston.format.combine(
    Winston.format.splat(),
    Winston.format.label({ label: "CRON_JOBS" }),
    Winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:SS" }),
    Winston.format.printf(
      info => `[${info.label}] ${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: transportProviders
});

module.exports = logger;
