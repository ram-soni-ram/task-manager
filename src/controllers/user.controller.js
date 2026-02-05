import ApiResponse from "../utils/ApiResponse.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  getUserService,
  editUserService,
  changePasswordService,
} from "../services/user.service.js";
import * as yup from "yup";

export const getUser = asyncHandler(async (req, res) => {
  const user = await getUserService(req.user._id);
  ApiResponse.success(res, user, "User fetched Successfuly");
});

export const editUser = asyncHandler(async (req, res) => {
  const { email, userName } = req.body;
  let validEmail;
  if (!email && !userName) {
    throw new AppError("Please provide one field to update user", 400);
  }
  if (email) {
    const emailSchema = yup.object({
      email: yup.string().email("Please provide a valid email address"),
    });
    validEmail = await emailSchema.validate({ email });
  }
  if (userName.length < 3) {
    throw new AppError("UserName must be atleast 3 characters long", 400);
  }
  const updatedUser = await editUserService(validEmail?.email, userName, req.user._id);
  ApiResponse.success(res, { user: updatedUser }, "User updated Successfuly");
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new AppError("Both password fields are required", 400);
  }
  if (newPassword.length < 6) {
    throw new AppError("newPassword must be atleast 6 characters long", 400);
  }
  await changePasswordService(oldPassword, newPassword, req.user._id);
  ApiResponse.success(res, null, "Password change Successfuly");
});
