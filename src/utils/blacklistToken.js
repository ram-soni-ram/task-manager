import Blacklist from "../models/blacklist.model.js";
import jwt from "jsonwebtoken";
import logger from "../config/logger.config.js";

async function blacklistAccessToken(token) {
  if (!token) return;

  try {
    const decoded = jwt.decode(token);

    const expiryDate =
      decoded && decoded.exp ? new Date(decoded.exp * 1000) : new Date(Date.now() + 15 * 60 * 1000);

    await Blacklist.create({
      token: token,
      expiresAt: expiryDate,
    });

    return true;
  } catch (err) {
    logger.error(`Blacklist ERROR: ${err}`);
    return false;
  }
}

async function isTokenBlacklisted(token) {
  const blacklisToken = await Blacklist.findOne({ token });
  return !!blacklisToken;
}

export { blacklistAccessToken, isTokenBlacklisted };
