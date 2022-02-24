const express = require('express')
const router = express.Router()
const { products  } = require('../daos/index.js');
let session = {}

router.get('/', (req, res) => {
    res.render('pages/login')
})

router.post('/home', async (req, res) => {
    if(req.body.user == 'admin' && req.body.password == 123){
        session = {usr:req.body.user, pwd: req.body.password, role: req.body.user}
        console.log(session)
        res.render('pages/indexAdmin', {productos: await products.getAll()
            .then(result => {return result.payload})
            .catch(err => console.log(err))})
         
    }else{
        if(req.body.user == 'test' && req.body.password == 'test'){
            session = {usr:req.body.user, pwd: req.body.password, role: req.body.user}
            console.log(session)
            res.render('pages/indexUser', {productos:  await products.getAll()
                .then(result => {return result.payload})
                .catch(err => console.log(err))})
             
        }else{
            res.redirect('/')
        }
    }
})

router.get('/home', async (req, res) => {
    if(session){
        session.role == 'admin' ? res.render('pages/indexAdmin') : res.render('pages/indexUser')
    }else{
        res.redirect('/')
    }
})

router.get('/nuevoProducto', (req, res) => {
    res.render('pages/nuevoProducto')
})

module.exports = router