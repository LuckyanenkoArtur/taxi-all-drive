const winston = require("winston");
const { combine, timestamp, json, prettyPrint, errors } = winston.format;

winston.loggers.add("ErrorLogger", {
  level: "debug",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "errors.log",
      dirname: "./logs/errors",
    }),
  ],
});
winston.loggers.add("LoginLogger", {
  level: "debug",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "auth.log", dirname: "./logs" }),
  ],
  defaultMeta: { event: "Login" },
});
winston.loggers.add("LogoutLogger", {
  level: "debug",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "auth.log", dirname: "./logs" }),
  ],
  defaultMeta: { event: "Logout" },
});

const errorLoggger = winston.loggers.get("ErrorLogger");
const loginLogger = winston.loggers.get("LoginLogger");
const logoutLogger = winston.loggers.get("LogoutLogger");

module.exports = { errorLoggger, loginLogger, logoutLogger };
