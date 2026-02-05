import dotenv from "dotenv";

dotenv.config();

const env = {
  dburl: process.env.DBURL || null,
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || "development", // change in production
  whiteListOrigins: ["http://127.0.0.1:5173", "https://productiondaomain.com"], // modify list in production
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtAccessExpiry: process.env.JWT_ACCESS_EXPIRY || "15m",
  jwtRefreshExpiry: process.env.JWT_REFRESH_ERPIRY || "7d",
  clientUrl: process.env.CLIENT_URL, // change client url in production
  senderEmail: process.env.SENDER_EMAIL,
  googleAppPassword: process.env.GOOGLE_APP_PASSWORD,
  logLevel: process.env.LOG_LEVEL || "debug", // change log level in production
};

export default env;
