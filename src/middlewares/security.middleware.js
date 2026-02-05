import cors from "cors";
import helmet from "helmet";

import env from "../config/env.config.js";
import requestLogger from "../middlewares/requestlogger.middleware.js";
import { apiLimiter } from "../config/ratelimit.config.js";
import AppError from "../utils/AppError.js";

const corsOption = {
  credentials: true,
  origin: function (origin, callback) {
    if (env.whiteListOrigins.includes(origin)) {
      callback(null, origin);
    }
    if (env.nodeEnv === "development") {
      callback(null, "*");
    } else {
      callback(new AppError("CORS: ERROR not allowd origin"), null);
    }
  },
};

function security(app) {
  if (env.nodeEnv !== "test") {
    app.use(requestLogger);
  }

  app.use(apiLimiter);
  app.use(cors(corsOption));
  app.use(helmet());
}

export default security;
