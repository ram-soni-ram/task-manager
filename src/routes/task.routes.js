import { Router } from "express";

import { taskSchema } from "../validation/yup.schemas.js";
import validateData from "../middlewares/validation.middleware.js";
import protectRoute from "../middlewares/protectroute.middleware.js";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/task.controller.js";

const taskRoutes = Router();

taskRoutes.post("/", protectRoute, validateData(taskSchema), createTask);
taskRoutes.get("/", protectRoute, getTasks);
taskRoutes.patch("/:id", protectRoute, updateTask);
taskRoutes.delete("/:id", protectRoute, deleteTask);

export default taskRoutes;
