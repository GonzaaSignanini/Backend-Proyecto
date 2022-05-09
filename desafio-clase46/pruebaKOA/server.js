import Koa from 'koa'
import Body from 'koa-body'
import userRouter from'./routes/Users.js'
const app = new Koa()

app.use(Body())
// app.use(async context=>{
//     context.body={
//         message:'Hola gente buen dia'
//     }
// })
app.use(userRouter.routes())
app.listen(8080,()=>console.log('server arriba 8080'))

