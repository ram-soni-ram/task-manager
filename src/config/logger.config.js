import winston from "winston";
import "winston-daily-rotate-file";

import env from "./env.config.js";

const { combine, timestamp, printf, colorize, errors } = winston.format;
const { transports } = winston;

const fileFormat = combine(
  colorize({ all: true }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS A" }),
  errors({ stack: true }),
  printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] - [${level}] - ${stack || message}`;
  })
);

const logger = winston.createLogger({
  level: env.logLevel,
  format: combine(timestamp(), errors({ stack: true })),
  transports: [
    new transports.Console({
      level: env.logLevel,
      silent: env.nodeEnv === "production",
      format: fileFormat,
    }),
    new transports.DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      level: "info",
      format: fileFormat,
    }),
    new transports.DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "28d",
      level: "error",
      format: fileFormat,
    }),
  ],
  exitOnError: false,
});

export default logger;
