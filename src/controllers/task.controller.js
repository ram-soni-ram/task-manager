import ApiResponse from "../utils/ApiResponse.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { mongoose } from "../config/db.config.js";
import {
  creatTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService,
} from "../services/task.service.js";

export const createTask = asyncHandler(async (req, res) => {
  const task = await creatTaskService({ ...req.filteredData, author: req.user._id });
  ApiResponse.created(res, task, "Task created Successfully");
});

export const getTasks = asyncHandler(async (req, res) => {
  const { task, page, limit, totalDocs } = await getTasksService(req);
  ApiResponse.paginated(res, task, page, limit, totalDocs, "Data retrieved Successfully");
});

export const updateTask = asyncHandler(async (req, res) => {
  const { description, title, status } = req.body;
  const taskId = req.params.id;
  if (!description && !title && !status) {
    throw new AppError("Provide at least one field to update", 400);
  }
  if (status && !["pending", "success"].includes(status)) {
    throw new AppError("Invalid status value", 400);
  }
  if (!mongoose.isValidObjectId(taskId)) {
    throw new AppError("Task ID is invalid", 400);
  }
  const task = await updateTaskService(description, title, status, taskId, req?.user._id);
  ApiResponse.success(res, task, "Task updated Successfully");
});

export const deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  if (!mongoose.isValidObjectId(taskId)) {
    throw new AppError("Task ID is invalid", 400);
  }
  const message = await deleteTaskService(taskId, req.user._id);
  ApiResponse.success(res, null, message);
});
