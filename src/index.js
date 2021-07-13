const express = require('express')
const cors =require('cors')
require('./db/mongoose')
const app = express()
const port = process.env.PORT 
const userRouter = require('./routers/user')
const taskRouter = require('./routers/Task')

const corsOptions ={
    origin: '*',
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port ,()=>{
    console.log("server is up at port "+ port)
})

