const { knex } = require('./db/db.js');

// knex.schema.createTable('productos', (table) => {
//     table.string('title')
//     table.float('price')
//     table.string('thumbnail')
//     table.increments('id')
// })
// .then(()=> console.log("Tabla Creada"))
// .catch(error => console.log(error));

// const productos = [
//     {title: "Escuadra", price: 123.45, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"},
//     {title: "Calculadora", price: 234.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"},
//     {title: "Globo Terráqueo", price: 345.67, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"},
//     {title: "Notebook Gamer", price: 35000, thumbnail: "https://cdn1.iconfinder.com/data/icons/office-171/32/office-03-256.png"},
//     {title: "Mesa de Pool", price: 13000, thumbnail: "https://cdn2.iconfinder.com/data/icons/sports-apparel/24/sports-apparel-20-256.png"},
//     {title: "Silla Gamer", price: 7500, thumbnail: "https://cdn1.iconfinder.com/data/icons/office-171/32/office-10-256.png"},
//     {title: "Teclado Mecanico", price: 3200, thumbnail: "https://cdn0.iconfinder.com/data/icons/zondicons/20/keyboard-128.png"},
//     {title: "Mouse", price: 8700, thumbnail: "https://cdn3.iconfinder.com/data/icons/essential-pack/32/21-Mouse-128.png"},
//     {title: "Celular", price: 6500, thumbnail: "https://cdn1.iconfinder.com/data/icons/seo-outline-colored-free/128/Smartphone_iphone_phone-256.png"}
// ]

// knex('productos').insert(productos)
//     .then(()=> console.log('Productos insertados'))
//     .catch(err => {console.log(error); throw err})
//     .finally(()=> {
//         knex.destroy();
//     });

// knex.from('productos').select('*')
//     .then((rows) => {
//         for(row of rows){
//             console.log(`${row['id']} ${row['title']} ${row['price']} ${row['thumbnail']}`);
//         }
//     }).catch((err) => {console.log(err)})
//     .finally(() => {
//         knex.destroy();
//     })

// knex.from('productos').del()
//     .then(() => console.log("All products deleted"))
//     .catch((err) => {console.log(err)})
//     .finally(() => {
//         knex.destroy();
//     })