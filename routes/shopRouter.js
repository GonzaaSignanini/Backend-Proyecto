const express = require('express');
const router = express.Router();
const Contenedor = require('../Services/contenedor');
const productos = new Contenedor();
const ContenedorCarrito = require('../Services/cartContainer');
const carrito = new ContenedorCarrito();

/*  ----------------------------------------- */

router.get('/productos', async (req, res) => {
    res.json(await productos.getAll())
})

router.get('/productos/:id', async (req, res) => {
    res.json(await productos.getById(parseInt(req.params.id)));
})

router.post('/productos', async (req, res) => {
    await productos.save(req.body)
    res.redirect('/nuevoProducto')
})

router.put('/productos/:id', async (req, res) => {
    await productos.updateById(parseInt(req.params.id), req.body)
    res.redirect('/home')
})

router.delete('/productos/:id', async (req, res) => {
    await productos.deleteById(parseInt(req.params.id));
    res.redirect('/home')
})

/*  ----------------------------------------- */

router.get('/carrito/:id/productos', (req, res)=>{
    let num = parseInt(req.params.id);
    carrito.getById(num).then(result=>{
        res.send(result.message);
    })
})

router.post('/carrito', (req, res)=>{
    carrito.create().then(result =>{
        res.send(result.message);
    })
})

//Dentro del body debo recibir los parametros id y stock
router.post('/carrito/:id/productos', (req, res)=>{
    let number = parseInt(req.params.id);
    let productoAdd = req.body;
    carrito.addProduct(number, productoAdd).then(result=>{
        res.send(result.message);
    })
})

router.delete('/carrito/:id/productos/:id_prod', (req, res)=>{
    let idCart = parseInt(req.params.id);
    let idProd = parseInt(req.params.id_prod);
    carrito.productDel(idCart, idProd).then(result=>{
        res.send(result.message);
    })
})

router.delete('/carrito/:id', (req, res)=>{
    let idCart = parseInt(req.params.id);
    carrito.cartDel(idCart).then(result=>{
        res.send(result.message);
    })
})

module.exports = router;