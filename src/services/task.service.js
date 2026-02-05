import Task from "../models/task.model.js";
import filterQuery from "../utils/filterQuery.js";
import AppError from "../utils/AppError.js";

export const creatTaskService = async (data) => {
  const newTask = await Task.create(data);
  const task = await newTask.populate("author", "userName");
  return task;
};

export const getTasksService = async (req) => {
  const { searchQuery, sortDirection, page, limit, skip } = filterQuery(req.query, req.user._id);
  const [totalDocs, userTask] = await Promise.all([
    Task.countDocuments(searchQuery),
    Task.find(searchQuery)
      .sort({ createdAt: sortDirection })
      .skip(skip)
      .limit(limit)
      .populate("author", "userName"),
  ]);
  return { task: userTask, page, limit, totalDocs };
};

export const updateTaskService = async (description, title, status, taskId, userId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  if (task.author.toString() !== userId.toString()) {
    throw new AppError("Access denied. You have no permission to update this task", 403);
  }
  task.description = description || task.description;
  task.title = title || task.title;
  task.status = status || task.status;
  let updatedTask = await task.save();
  updatedTask = await updatedTask.populate("author", "userName");
  return updatedTask;
};

export const deleteTaskService = async (taskId, userId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    return "Task already deleted or not found";
  }
  if (task.author.toString() !== userId.toString()) {
    throw new AppError("Access denied. You do not have permission", 403);
  }
  await task.deleteOne();
  return "Task deleted Successfully";
};
