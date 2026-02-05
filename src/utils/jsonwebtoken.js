import jwt from "jsonwebtoken";
import env from "../config/env.config.js";

function generateAccessToken(payload) {
  if (!payload) return;
  return jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiry,
  });
}

function generateRefreshToken(payload) {
  if (!payload) return;
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiry,
  });
}

async function verifyAccessToken(token) {
  if (!token) return;
  return await jwt.verify(token, env.jwtAccessSecret);
}

async function verifyRefreshToken(token) {
  if (!token) return;
  return await jwt.verify(token, env.jwtRefreshSecret);
}

function setTokensInCookies(res, accessToken, refreshToken) {
  if (!res || !accessToken || !refreshToken) return;
  const cookieOptions = {
    httpOnly: true,
    secure: env.nodeEnv !== "development",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, cookieOptions);
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  setTokensInCookies,
};
