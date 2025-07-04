import Fastify from 'fastify'
import dotenv from 'dotenv'
import db from '../src/db/db'
import userRoutes from './routes/userRoute'
import cors from '@fastify/cors' 
import taskRoutes from './routes/tasksRoutes'
import shareTaskRoute from './routes/shareRoutes'
import fastifyFormbody from '@fastify/formbody'


dotenv.config()

// { logger: true }  pass this object to the Fastify if want to show the log

const app = Fastify()
app.register(db)

app.register(fastifyFormbody)


//cors
 app.register(cors, {
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
})



app.register(userRoutes)
app.register(taskRoutes)
app.register(shareTaskRoute)


const port = process.env.PORT || 4001


app.listen({port:Number(port), host: '0.0.0.0'},(err,address)=>{
    if(err){
        console.error(err)
        process.exit(1)
    }
  console.log(`🚀 Server listening at ${port}`)
})


