import { FastifyInstance } from 'fastify'
import { syncUser } from '../controllers/syncUser'

export default async function userRoutes(app: FastifyInstance) {
  app.post('/sync-user', syncUser)
}
