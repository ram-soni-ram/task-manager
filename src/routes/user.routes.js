import { Router } from "express";
import protectRoute from "../middlewares/protectroute.middleware.js";
import { getUser, editUser, changePassword } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", protectRoute, getUser);
userRoutes.patch("/", protectRoute, editUser);
userRoutes.patch("/change-password", protectRoute, changePassword);

export default userRoutes;
