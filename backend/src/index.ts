import Fastify from 'fastify'
import dotenv from 'dotenv'
import db from '../src/db/db'
import userRoutes from './routes/userRoute'
import cors from '@fastify/cors' 
import taskRoutes from './routes/tasksRoutes'
import shareTaskRoute from './routes/shareRoutes'


dotenv.config()


// { logger: true }  pass this object to the Fastify if want to show the log

const app = Fastify()


//cors
 app.register(cors, {
  origin: 'http://localhost:5174', 
  credentials: true
})

app.register(userRoutes)
app.register(taskRoutes)
app.register(shareTaskRoute)


const port = process.env.PORT || 4001


app.listen({port:Number(port)},(err,address)=>{
    if(err){
        console.error(err)
        process.exit(1)
    }
  console.log(`🚀 Server listening at ${port}`)
})

app.register(db)

