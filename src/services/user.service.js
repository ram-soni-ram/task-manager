import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const getUserService = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

export const editUserService = async (email, userName, userId) => {
  const isExisEmail = await User.findOne({ email });
  if (isExisEmail && isExisEmail._id.toString() !== userId.toString()) {
    throw new AppError("Email is already in use try diffrent", 400);
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user._id.toString() !== userId.toString()) {
    throw new AppError("Access denied. no permission", 403);
  }
  user.email = email || user.email;
  user.userName = userName || user.userName;
  await user.save();
  return user;
};

export const changePasswordService = async (oldPassword, newPassword, userId) => {
  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user._id.toString() !== userId.toString()) {
    throw new AppError("Access denied. no permission", 403);
  }
  if (!(await user.correctPassword(oldPassword))) {
    throw new AppError("InCorrect password", 400);
  }
  user.password = newPassword;
  await user.save();
};
