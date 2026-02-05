import ApiResponse from "../utils/ApiResponse.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import env from "../config/env.config.js";
import sendMail from "../utils/sendMail.js";
import { mongoose } from "../config/db.config.js";
import logger from "../config/logger.config.js";
import {
  signupService,
  loginService,
  logoutService,
  renewAccessTokenService,
  forgotPasswordService,
  resetPasswordService,
} from "../services/auth.service.js";

export const signup = asyncHandler(async (req, res) => {
  await signupService(req.filteredData);
  ApiResponse.created(res, null, "Signup Successfullyl");
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("email and password are required", 400);
  }
  const result = await loginService(req.body, res);
  ApiResponse.success(res, result, "loggedIn Successfully");
});

export const logout = asyncHandler(async (req, res) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader ? authHeader.split(" ")[1] : req.cookies.accessToken;
  const cookieOptions = {
    httpOnly: true,
    secure: env.nodeEnv !== "development",
    sameSite: "Strict",
  };
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  await logoutService(accessToken, req.user._id);
  ApiResponse.success(res, null, "Successfully logged out");
});

export const renewAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }
  const { newRefreshToken, newAccessToken } = await renewAccessTokenService(refreshToken, res);
  ApiResponse.success(
    res,
    { accessToken: newAccessToken, refreshToken: newRefreshToken },
    "Tokens renewed successfully"
  );
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new AppError("email is required", 400);
  }
  const resetUrl = await forgotPasswordService(email);
  const html = `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the button below:</p>
        <a href="${resetUrl}" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Reset Password
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #777;">
            This link will expire in 15 minutes.
        </p>
    </div>`;
  const subject = "Reset your password";
  await sendMail(email, subject, html);
  logger.info(`forgot password request. userEmail: ${email}`);
  ApiResponse.success(res, null, "Reset password link sent to your email");
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, id } = req.query;
  const { password } = req.body;
  logger.info(`reset password request. userId: ${id}`);
  if (!token || !id) {
    throw new AppError("url part missing", 400);
  }
  if (!password) {
    throw new AppError("password is required", 400);
  } else if (password.length < 6) {
    throw new AppError("password must be atleast 6 characters long", 400);
  }
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError("invalid id", 400);
  }
  await resetPasswordService(id, token, password);
  ApiResponse.success(res, null, "Password reset successfully. You can now login.");
});
