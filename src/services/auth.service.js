import User from "../models/user.model.js";
import logger from "../config/logger.config.js";
import AppError from "../utils/AppError.js";
import { hashToken, verifyHashToken } from "../utils/cryptoHash.js";
import { blacklistAccessToken } from "../utils/blacklistToken.js";
import env from "../config/env.config.js";
import crypto from "crypto";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setTokensInCookies,
} from "../utils/jsonwebtoken.js";

export const signupService = async (data) => {
  const exist = await User.findOne({ email: data.email });
  if (exist) throw new AppError("Email is already exist", 400);
  const newUser = await User.create(data);
  logger.info(`User created ${newUser._id}`);
  return newUser;
};

export const loginService = async ({ email, password }, res) => {
  let user = await User.findOne({ email }).select("+password +refreshTokenHash");
  const isAllOk = user && (await user.correctPassword(password)) ? true : false;
  if (!isAllOk) {
    throw new AppError("Invalid credentials", 401);
  }
  const accessToken = generateAccessToken({ userEmail: user.email, userId: user._id });
  const refreshToken = generateRefreshToken({ userId: user._id });
  user.refreshTokenHash = hashToken(refreshToken);
  await user.save();
  setTokensInCookies(res, accessToken, refreshToken);
  user = user.toObject();
  delete user.password;
  delete user.refreshTokenHash;
  return { user, accessToken, refreshToken };
};

export const logoutService = async (accessToken, userId) => {
  if (accessToken) {
    await blacklistAccessToken(accessToken);
  }
  const user = await User.findById(userId).select("+refreshTokenHash");
  if (user) {
    user.refreshTokenHash = undefined;
    await user.save({ validateBeforeSave: false });
  }
};

export const renewAccessTokenService = async (refreshToken, res) => {
  const decoded = await verifyRefreshToken(refreshToken);
  const user = await User.findById(decoded.userId).select("email +refreshTokenHash");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (!verifyHashToken(refreshToken, user.refreshTokenHash)) {
    throw new AppError("Invalid refresh token", 403);
  }
  const newAccessToken = generateAccessToken({ userEmail: user.email, userId: user._id });
  const newRefreshToken = generateRefreshToken({ userId: user._id });
  user.refreshTokenHash = hashToken(newRefreshToken);
  await user.save({ validateBeforeSave: false });
  setTokensInCookies(res, newAccessToken, newRefreshToken);
  return { newRefreshToken, newAccessToken };
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ email }).select("+resetPasswordHash +resetPasswordExpiry");
  if (!user) {
    throw new AppError("user not found", 404);
  }
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordHash = hashToken(resetToken);
  user.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${env.clientUrl}/reset-password?token=${encodeURIComponent(resetToken)}&id=${encodeURIComponent(user._id)}`;
  return resetUrl;
};

export const resetPasswordService = async (id, token, password) => {
  const user = await User.findById(id).select("+resetPasswordHash +resetPasswordExpiry +password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (!verifyHashToken(token, user.resetPasswordHash) || !user.resetPasswordExpiry > Date.now()) {
    throw new AppError("Reset link is invalid or has expired", 400);
  }
  user.password = password;
  user.resetPasswordHash = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();
};
