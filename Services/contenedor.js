const fs = require('fs');
const productUrl = './public/txt/productos.txt'
const Productos = require('./productos.js')
const Utils = require('../lib/utils.js');
let db = [];

class Contenedor {

    update(id, object) {
        this.getAll().then(async obj => {
            let datos = obj;
            const index = datos.findIndex(obj => obj.id == id);
            datos[index].title = object.title || "";
            datos[index].price = object.price || "";
            datos[index].thumbnail = object.thumbnail || "";

            await fs.promises.writeFile(productUrl, JSON.stringify(datos, null, 2));
        })
        .catch(error => {
            console.log("No se pudo actualizar el objeto.", error);
        })
    }

    maxId() {
        let id = 0
        try{
            let fileProductos = fs.readFileSync(productosURL);
            let productos = JSON.parse(fileProductos);
            
            let res = productos.reduce((prev, currentValue, i) =>{
                if(i==0){
                    return {
                        id: currentValue.id  
                    }
                }else{
                    let MaxId = prev.id > currentValue.id ? prev.id : currentValue.id;
                    return {
                        id: MaxId
                    }
                }          
            });
            id = res.id
        }catch{
            return id;
        }
        return id;
    }

    save(producto){   
        let id = this.maxId();
        id += 1;     
        let productoNuevo = new Productos(producto.codigo, producto.title, Utils.dateNow, producto.stock, producto.thumbnail, producto.price, id);
        producto = productoNuevo;
        const escribirProductos = async () => {
            try{
                const res = await fs.promises.readFile(productUrl, 'utf-8')
                if(res.length == 0){
                    producto.id = 1
                    db.push(producto)
                    await fs.promises.writeFile(productUrl, JSON.stringify(db))
                    return producto
                }else {
                    db = JSON.parse(res)
                    producto.id = db[db.length - 1].id + 1
                    db.push(producto)
                    await fs.promises.writeFile(productUrl, JSON.stringify(db))
                    return producto
                }
                
            }
            catch (err) {
                console.log(`${err} No se encuentra el archivo ${productUrl}, se procede a crearlo`)
                await fs.promises.writeFile(productUrl, '')
            }
        }
        
        let respuesta = escribirProductos().then((res) => {return res})
        return respuesta

    }    

    async getById (id){
        try {
            const productos = fs.readFileSync(productUrl, 'utf-8');
            if (productos === '') {
                return console.log("no hay productos en la base de datos");
            } else {
                const arrProds = JSON.parse(productos);
                const existe = arrProds.filter(item => item.id === id);
                if (existe.length) {
                    return existe;
                } else {
                    return;
                }
            }
        }
        catch (err){
            console.log(err);
        }
    }
    getAll(){

        const recuperarObjetos = async () => {
            try {
                const res = await fs.promises.readFile(productUrl, 'UTF-8')
                if (res.length == 0 || res == '[]') {
                    return {error: 'El contenedor esta vacio'}
                } else {
                    const db = JSON.parse(res)
                    //console.log(db);
                    return db
                }
            }
            catch (err){
                console.log(err);
            }
        }

        let response = recuperarObjetos().then((res) => {return res})
        return response

    }
    
    async deleteById (id) {
        try {
            const productos = await fs.promises.readFile(productUrl, 'utf-8');
            const arrProds = await JSON.parse(productos);
            const existe = arrProds.filter(item => item.id === id);
            if (existe.length) {
                const borrado = arrProds.filter(item => item.id !== id)
                await fs.promises.writeFile(productUrl, JSON.stringify(borrado, null, 2));
                console.log(`El producto con el id: ${id}, ha sido borrado de la base de datos`);
                return existe;
            } else  {
                console.log(`No se pudo borrar el producto con el id: ${id}, porque no existe en la base de datos`);
                return (`No se pudo borrar el producto con el id: ${id}, porque no existe en la base de datos`);
            }
        }
        catch (err){
            console.log(err);
        }
    }
    async deleteAll () {
        try {
            await fs.promises.writeFile(productUrl, '');
            console.log("Todos los productos han sido borrados de la base de datos");
        }
        catch (err) {
            console.log(err);
        }
        
    }

    maxId() {
        let id = 0
        try{
            let fileProductos = fs.readFileSync(productUrl);
            let productos = JSON.parse(fileProductos);
            
            let res = productos.reduce((prev, currentValue, i) =>{
                if(i==0){
                    return {
                        id: currentValue.id  
                    }
                }else{
                    let MaxId = prev.id > currentValue.id ? prev.id : currentValue.id;
                    return {
                        id: MaxId
                    }
                }          
            });
            id = res.id
        }catch{
            return id;
        }
        return id;
    }

    updateById(n, object){

        const actualizarProductos = async () => {
            try{
                const res = await fs.promises.readFile(productUrl, 'UTF-8')
                db = JSON.parse(res)
                const filtroId = db.filter((el) => {return el.id == n})
                if(filtroId[0] == undefined){
                    //console.log(`No se encontraron objetos con id ${n}`)
                    return {error: 'producto no encontrado'}
                }else{
                    object.id = filtroId[0].id
                    filtroId[0] = object
                    db[--n] = filtroId[0]
                    await fs.promises.writeFile(productUrl, JSON.stringify(db))
                    //console.log(`Se ha actualizado el producto con id ${filtroId[0].id}`)
                    return {correcto: `se ha actualizado el producto ${filtroId[0].id}`}
                }            
            }
            catch (err) {
                console.log(`${err} No se encuentra el archivo ${productUrl}, se procede a crearlo`)
            }
        }
        
        let response = actualizarProductos().then((res) => {return res})
        return response

    }
}

// const contenedorPrueba = new Contenedor('../public/txt/productos.txt');
// contenedorPrueba.save({title:"dsds", price:3444, thumbnail:""});

// contenedorPrueba.save({title:"Zapatillas",price:5500,thumbnail:""});
// contenedorPrueba.getAll();
// contenedorPrueba.getById(3);
// contenedorPrueba.deleteById(1);
// contenedorPrueba.deleteAll();

module.exports = Contenedor;