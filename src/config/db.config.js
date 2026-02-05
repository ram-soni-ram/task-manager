import mongoose from "mongoose";
import env from "./env.config.js";
import logger from "./logger.config.js";

async function connectToDatabase() {
  if (!env.dburl) {
    return logger.warn("db url is missing");
  }
  await mongoose.connect(env.dburl, { serverSelectionTimeoutMS: 5000 });
}

mongoose.connection.on("disconnected", () => {
  logger.error("MongoDB disconnected! Exiting process...");
  process.exit(1);
});

mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB error: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason.message}`);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

export { mongoose, connectToDatabase };
