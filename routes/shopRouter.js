const express = require('express');
const router = express.Router();
const { carts, persistence, products  } = require('../daos/index.js');
const { authMiddleware } = require('../lib/utils.js');

/*  ----------------------------------------- */

//GETS
router.get('/productos', async (req, res) => {
    products.getAll()
    .then(result => {
        res.send(result)
    })
})

router.get('/productos/:pid', (req, res) => {
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.pid)
    }else{
        id = req.params.pid
    }
    products.getById(id)
    .then(result=>{
        res.send(result)
    })
})


//POSTS
router.post('/productos', async (req, res) => {
    await products.addProduct(req.body)
    res.redirect('/nuevoProducto')
})

//PUTS
router.put('/productos/:pid', (req,res) => {
    let body = req.body;
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.pid)
    }else{
        id = req.params.pid
    }
    products.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})

//DELETES
router.delete('/productos/:pid', (req,res) => {
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.pid)
    }else{
        id = req.params.pid
    }
    products.deleteById(id).then(result => {
        res.send(result)
    })
})

router.delete('/productos/', (req,res) => {
    products.deleteAll().then(result => {
        res.send(result)
    })
})

/*  ----------------------------------------- */

//POSTS
router.post('/carrito', (req, res) => {
    carts.createCart()
    .then(result => res.send(result))
    console.log()
})

router.post('/carrito/:cid/productos', (req, res) => {
    let cartId;
    let productId;
    if(persistence === "fileSystem"){
        cartId = parseInt(req.params.cid)
        productId = parseInt(req.body.id)
    }else{
        cartId = req.params.cid
        productId = req.body.id
    }
    carts.addProduct(cartId, productId)
    .then(result => res.send(result))
})

//DELETES
router.delete('/carrito/:cid', (req, res) => {
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.cid)
    }else{
        id = req.params.cid
    }
    carts.deleteById(id)
    .then(result => res.send(result))
})

router.delete('/carrito/:cid/productos/:pid', (req, res) => {
    let cartId;
    let productId;
    if(persistence === "fileSystem"){
        cartId = parseInt(req.params.cid)
        productId = parseInt(req.params.pid)
    }else{
        cartId = req.params.cid
        productId = req.params.pid
    }
    carts.deleteProduct(cartId, productId)
    .then(result => res.send(result))
})


//GETS
router.get('/carrito/:cid/productos', (req, res) => {
    let id;
    if(persistence === "fileSystem"){
        id = parseInt(req.params.cid)
        
    }else{
        id = req.params.cid
    }
    carts.getProductsByCartId(id)
    .then(result => res.send(result))
})

router.get('/carrito', (req,res)=>{
    carts.getAll().then(result=>{
        res.send(result)
    })
})

module.exports = router;