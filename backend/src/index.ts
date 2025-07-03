import Fastify from 'fastify'
import dotenv from 'dotenv'
import db from '../src/db/db'
import userRoutes from './routes/userRoute'


dotenv.config()


// { logger: true }  pass this object to the Fastify if want to show the log

const app = Fastify()


app.register(userRoutes)

const port = process.env.PORT || 4001


app.listen({port:Number(port)},(err,address)=>{
    if(err){
        console.error(err)
        process.exit(1)
    }
  console.log(`🚀 Server listening at ${port}`)
})

app.register(db)

