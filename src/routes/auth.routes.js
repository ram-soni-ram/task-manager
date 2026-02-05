import { Router } from "express";

import { registerSchema } from "../validation/yup.schemas.js";
import validateData from "../middlewares/validation.middleware.js";
import { loginLimiter } from "../config/ratelimit.config.js";
import protectRoute from "../middlewares/protectroute.middleware.js";
import {
  signup,
  login,
  logout,
  renewAccessToken,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/signup", validateData(registerSchema), signup);
authRoutes.post("/login", loginLimiter, login);
authRoutes.post("/logout", protectRoute, logout);
authRoutes.post("/renew-token", renewAccessToken);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;
