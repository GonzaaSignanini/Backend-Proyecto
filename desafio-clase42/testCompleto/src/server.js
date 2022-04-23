import express from 'express'
import MongoClient from './models/MongoClient.js'
import userRouter from './routes/userRoute.js'

const app = express()
const server = app.listen(8080,()=>console.log('conecto'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

new MongoClient()

app.use('/users',userRouter)