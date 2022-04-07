import express from "express";
import userRouter from './routes/users.js'

const app = express()
const PORT = 8080
const server = app.listen(PORT,()=>console.log(`Listening on PORT ${PORT}`))

app.use(express.json())
app.use('/users',userRouter)