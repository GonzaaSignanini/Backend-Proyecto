import express from 'express';
const router = express.Router();
import Contenedor from '../../Services/contenedor.js';

const productos = new Contenedor('../productos.txt');



//GETS
router.get('/', (req, res)=>{
    productos.getAll().then(result => {
        res.send(result.message);
    });
});

router.get('/:id', (req, res)=>{
    let num = parseInt(req.params.id);
    productos.getById(num).then(result => {
        res.send(result.message);
    })
});



//POSTS
router.post('/productos', (req, res)=>{
    const prod = req.body;
    productos.save(prod).then(data => {
        res.send(data)
    })
})

//PUTS
router.put('/:id', (req, res)=>{
    let num = parseInt(req.params.id);
    let producto = req.body;
    productos.update(num, producto).then(result => {
        res.send(result.message);
    })
})

//DELETES
router.delete('/:id', (req, res)=>{
    let num = parseInt(req.params.id);
    productos.deleteById(num).then(result => {
        res.send(result.message);
    })
});

router.delete('/', (req, res)=>{
    productos.deleteAll().then(result => {
        res.send(result.message);
    })
});

export default router;