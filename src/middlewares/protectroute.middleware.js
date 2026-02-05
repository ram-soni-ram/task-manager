import { verifyAccessToken } from "../utils/jsonwebtoken.js";
import AppError from "../utils/AppError.js";
import { isTokenBlacklisted } from "../utils/blacklistToken.js";
import User from "../models/user.model.js";

async function protectRoute(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : req.cookies?.accessToken;

  if (!token) {
    return next(new AppError("Access denied. Please login first", 401));
  }

  try {
    if (await isTokenBlacklisted(token)) {
      return next(new AppError("Token is blacklisted. Please login again", 401));
    }

    const decoded = await verifyAccessToken(token);

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return next(new AppError("The user belonging to this token no longer exists", 401));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
}

export default protectRoute;
