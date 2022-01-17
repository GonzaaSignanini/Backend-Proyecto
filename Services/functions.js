// import random from 'random'

// function randomObj() {
//     const numRandom = random.int(1, 6);
//     return numRandom;
// }

// export default randomObj;


const Contenedor = require('./contenedor.js');
const productos = new Contenedor('../public/txt/productos.txt');

function totalProducts() {
    await productos.getAll();
}

module.exports = totalProducts;


