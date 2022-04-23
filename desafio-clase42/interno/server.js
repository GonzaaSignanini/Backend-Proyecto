import express from "express";
const app = express()
const server = app.listen(8080,()=>console.log("listening"))

app.get('/testget',(req,res)=>{
    console.log(req.query)
    res.send('llego')
})

app.post(('/testget',(req,res)=>{
    console.log(req.body)
    res.send('llego')
}))