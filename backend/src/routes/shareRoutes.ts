import { FastifyInstance } from 'fastify';
import { getUnsharedUsers, shareTask } from '../controllers/shareTaskController';



export default async function shareTaskRoute(app: FastifyInstance) {
  app.post("/share-task", shareTask)
  app.get("/unshared-users/:task_id", getUnsharedUsers)
}
