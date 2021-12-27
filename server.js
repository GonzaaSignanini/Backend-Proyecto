import express from 'express';
import randomObj from './Services/functions.js';
import Contenedor from './Services/contenedor.js';
const { Router } = express;
const app = express();
const routerProductos = Router();
app.use('/api/productos', routerProductos);
app.use(express.static('public'));
routerProductos.use(express.json());
routerProductos.use(express.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: true }))
const allProducts = new Contenedor('./productos.txt');

/* METODOS GET */

routerProductos.get('', (req, res) => {
    allProducts.getAll().then((data) => {
        res.send(`PRODUCTOS DISPONIBLES:  ${JSON.stringify(data)}`)
    }).catch((err) =>{throw err});
});

routerProductos.get('/:id', async (req, res) => {
    let numero = parseFloat(req.params.id);
    const productos = await allProducts.getAll()
    
    if (numero > productos.length) {
        res.send( { error : 'producto no encontrado' } );
    }else {
        allProducts.getById(numero).then((date) => {
            res.send(`PRODUCTO SELECCIONADO:  ${JSON.stringify(date)}`);
        }).catch((err) =>{throw err});
    }
});

/*  METODO POST */
 
routerProductos.post('', async (req, res) => {
    await allProducts.save(req.body);
    res.send(`PRODUCTO AÑADIDO: ${JSON.stringify(req.body)}`);
});

/* METODO PUT */

routerProductos.put('/:id', async (req, res) => {
    const id = parseFloat(req.params.id);
    const object = req.body;
    const productos = await allProducts.getAll()
    if (!productos.find(item => item.id == id)) {
        res.send( {error: "Producto no encontrado"} );
        return
    }
    allProducts.update(id, object);
    res.send(`Producto con id: #${id} ha sido actualizado.`)
});

/* METODO DELETE */

routerProductos.delete('/:id', (req, res) => {
    let numero = parseFloat(req.params.id);
    allProducts.deleteById(numero).then((date) => {
        res.send(`PRODUCTO ELIMINADO: ${JSON.stringify(date)}`);
    }).catch((err) =>{throw err});
});









// app.get('/productoRandom', (req, res) => {
//     allProducts.getById(randomObj()).then((datos) => {
//         res.send(`Productos random: ${JSON.stringify(datos)}`)
//     }).catch((err) =>{throw err});
// })
const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));