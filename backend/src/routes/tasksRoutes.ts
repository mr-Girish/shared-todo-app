import { FastifyInstance } from "fastify";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskController";

export default async function taskRoutes(app: FastifyInstance) {
  app.post("/create-task", createTask);
  app.get("/tasks-list", getTasks);
  app.delete("/delete-task/:id", deleteTask);
  app.put("/edit-task/:id", updateTask);
}
