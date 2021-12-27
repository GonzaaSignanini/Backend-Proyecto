import express from 'express';
import cors from 'cors';
import multer from 'multer';
import Contenedor from '../Services/contenedor.js';
import productosRouter from './routes/productos.js';
const app = express();
const upload = multer();
app.use('/api/productos', productosRouter);
app.use(express.static('public'));
app.use(upload.single('file'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const allProducts = new Contenedor('../productos.txt');

app.set('views','./views');
app.set('view engine', 'ejs');


app.get('/productos', (req, res)=>{
    const prod = allProducts.getAll().then(result=>{
        let prod = result.message;
        res.render("productos", {
            productos: prod
        })
    })
})

app.post('/productos', (req, res)=>{
    const prod = req.body;
    allProducts.save(prod)
    res.redirect('/')
})














const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));