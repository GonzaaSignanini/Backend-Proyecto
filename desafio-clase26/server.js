import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import cors from 'cors'
import { __dirname } from './utils.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import ChatsService from './services/chatsService.js'
import uploadService from './services/uploadService.js'
import chats from './routes/chats.js'
import { UserModel } from './dao/models/User.js'
import initializePassportConfig from './passport-config.js'


const expires = 600
const chatsService = new ChatsService()

export const getConnection = async ()=> {
    try{
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect('mongodb+srv://Gonzalo:gonza123456@cluster0.ldyb1.mongodb.net/ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        }
        } catch (err) {
            console.error(err)
        }
}

const app =  express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.groupCollapsed(`listen on ${PORT} port`)
    getConnection()
})

const io = new Server(server)

io.on('connection', socket => {
    socket.emit('Bienvenido', '¡Conexión con socket.io establecida!')
    console.log('Cliente conectado.')
    chatsService.getChats()
        .then(result => io.emit('chats', result.payload))
        .catch(err => console.error(err))
    
    socket.on('chats', async data => {
        chatsService.createChat(data)
            .then(result => {
                io.emit('chats', result.payload)
                chatsService.getChats()
                .then(result => {
                    io.emit('chats', result.payload)
                })
                .catch(err => {
                    console.error(err)
                })
            })
        .catch(err => {
            console.error(err)
        })
    })
})

// app.engine('handlebars', engine())
// app.set('view engine', 'handlebars')
// app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// app.use('/uploads/', express.static(__dirname + '/uploads'))
app.use(express.static(__dirname + '/public'))

app.use(session({
    store: MongoStore.create({ mongoUrl:'mongodb+srv://Gonzalo:gonza123456@cluster0.ldyb1.mongodb.net/ecommerce?retryWrites=true&w=majority'}),
    secret:"CoderBackend",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000 }
}))

app.use(express.static('public'))

initializePassportConfig()

app.use(passport.initialize())
app.use(passport.session())
//Rutas Facebook
app.get('/auth/facebook',passport.authenticate('facebook',{scope:['email']}),(req,res)=>{

})
app.get('/auth/facebook/callback',passport.authenticate('facebook',{
    failureRedirect:'/paginadeFail'
}),(req,res)=>{
    res.send({message:"Login con Facebook Exitoso."})
})

app.get('/paginadeFail', (req, res) => {
    res.send({ status: 'error', message: 'Ha fallado el inicio de sesión en Facebook.' })
  })
  
  app.get('/logout', (req, res) => {
    req.logout();
  })