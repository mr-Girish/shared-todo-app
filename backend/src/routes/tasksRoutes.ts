import { FastifyInstance } from "fastify";
import { createTask, getTasks } from "../controllers/taskController";

export default async function taskRoutes(app: FastifyInstance) {
  app.post("/tasks", createTask), 
  app.get("/tasks-list", getTasks);
}
