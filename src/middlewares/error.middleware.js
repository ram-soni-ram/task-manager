import env from "../config/env.config.js";
import logger from "../config/logger.config.js";

function errorHandler(err, req, res, _) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  logger.error(`ERROR: ${err}`);

  if (env.nodeEnv === "development") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  const error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    error.message = `Invalid ${err.path}: ${err.value}`;
    error.statusCode = 400;
    error.isOperational = true;
  }

  if (err.code === 11000) {
    const value = Object.values(err.keyValue)[0];
    error.message = `Duplicate field value: ${value}. Please use another value!`;
    error.statusCode = 400;
    error.isOperational = true;
  }

  if (err.name === "JsonWebTokenError") {
    error.message = "Invalid token. Please log in again!";
    error.statusCode = 401;
    error.isOperational = true;
  }
  if (err.name === "TokenExpiredError") {
    error.message = "Your token has expired! Please log in again.";
    error.statusCode = 401;
    error.isOperational = true;
  }

  if (err.name === "ValidationError" && err.inner) {
    error.statusCode = 400;
    error.isOperational = true;
    error.message = "Validation failed";

    error.errors = err.inner.map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      errors: error.errors || [],
    });
  }

  logger.error(`CRITICAL ERROR: ${err}`);
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
}

export default errorHandler;
