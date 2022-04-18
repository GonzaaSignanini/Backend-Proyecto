import express from "express";
import usersRouter from './routers/usersRouter.js'
import MongoClient from "./daos/MongoClient.js";

const app = express()
const PORT = 8080
const server = app.listen(PORT,()=>console.log("Listen on PORT: " + server.address().port+"."))

let client = new MongoClient()
client.connect()

app.use(express.json())
app.use('/users',usersRouter)