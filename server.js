import express from 'express';
import path from 'path';
const app = express();
import randomObj from './Services/functions.js'
import Contenedor from '../../vscode/Backend - CoderHouse/Clase 4/Desafio/contenedor.js';
const allProducts = new Contenedor('./productos.txt');

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})
 
server.on("error", error => console.log(`Error en servidor ${error}`));

app.get('/', (req, res) => {
    res.send('Inicio del Proyecto de Backend');
})

app.get('/productos', (req, res) => {
    allProducts.getAll().then((data) => {
        res.send(`PRODUCTOS DISPONIBLES:  ${JSON.stringify(data)}`)
    }).catch((err) =>{throw err});
})
 
app.get('/productoRandom', (req, res) => {
    allProducts.getById(randomObj()).then((datos) => {
        res.send(`Productos random: ${JSON.stringify(datos)}`)
    }).catch((err) =>{throw err});
})

// console.log(randomObj());