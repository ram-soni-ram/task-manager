import { connectToDatabase } from "./src/config/db.config.js";
import env from "./src/config/env.config.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import logger from "./src/config/logger.config.js";
import security from "./src/middlewares/security.middleware.js";
import authRoutes from "./src/routes/auth.routes.js";
import taskRoutes from "./src/routes/task.routes.js";
import userRoutes from "./src/routes/user.routes.js";

import express from "express";
import cookieParser from "cookie-parser";

const app = express();

security(app);
app.use(cookieParser());
app.use(express.json({ extended: true }));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.status(200).json({
    apiVersion: "1.0.0",
    status: "live",
    message: "Hello from Task API!",
    timestamps: new Date().toISOString(),
    statusCode: 200,
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/user", userRoutes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "Sorry, can't find that!",
    timestamps: new Date().toISOString(),
    url: req.url,
  });
});

connectToDatabase()
  .then(() => {
    logger.info("Database connected successfuly!");
    app.listen(env.port, () => {
      logger.info(`server is start on http://127.0.0.1:${env.port}`);
    });
  })
  .catch((err) => {
    logger.error(`Error while connecting database ${err.message}`);
    process.exit(1);
  });
