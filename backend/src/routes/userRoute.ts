import { FastifyInstance } from 'fastify'
import { getAllUsers, syncUser } from '../controllers/syncUser'

export default async function userRoutes(app: FastifyInstance) {
  app.post('/sync-user', syncUser)
   app.get('/get-all-users', getAllUsers)
}


