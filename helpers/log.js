const winston = require('winston');
const winstonDailyRotateFile = require('winston-daily-rotate-file');

const logDir = 'logs';
const fs = require('fs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const now = new Date();
/* eslint new-cap: ["error", { "newIsCap": false }] */
const logger = new (winston.createLogger)({
  transports: [

    new winston.transports.Console(),

    new winston.transports.File({
      name: 'error-file',
      filename: './logs/exceptions.log',
      level: 'error',
      json: false,
    }),

    new (winstonDailyRotateFile)({
      filename: `${logDir}/apimodules.log`,
      timestamp: now,
      datePattern: 'DD-MM-yyyy',
      prepend: true,
      json: false,
      level: 'info',
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write(message) {
    logger.info(message);
  },
};
