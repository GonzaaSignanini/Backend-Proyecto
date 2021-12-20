import fs from 'fs';
        
class Contenedor {
    constructor (file) {
        this.file = file;
    }

    async update(id) {
        const productos = await fs.promises.readFile(this.file, 'utf-8');
        const arrProds = await JSON.parse(productos);
        const objIndex = arrProds.getById();
        console.log(objIndex);
        return arrProds[objIndex];
    }

    async save (producto) {
        try {
            const data = await fs.promises.readFile(this.file, 'utf-8');
            let datos = [];
            if (data === ''){
                producto.id = 1;
                datos.push(producto);
            } else {
                datos = JSON.parse(data);
                producto.id = datos[datos.length -1].id + 1;
                datos.push(producto);
            }
            await fs.promises.writeFile(this.file, JSON.stringify(datos, null, 2));
            console.log("El producto con el id:" ,producto.id, "ha sido guardado en la base de datos");
            return producto;
        }
        catch (err){
            console.log(err);
        }
    }
    async getById (id){
        try {
            const productos = fs.readFileSync(this.file, 'utf-8');
            if (productos === '') {
                return console.log("no hay productos en la base de datos");
            } else {
                const arrProds = JSON.parse(productos);
                const existe = arrProds.filter(item => item.id === id);
                if (existe.length) {
                    console.log('El producto con el id numero:', id, "es", existe);
                    return existe;
                } else {
                    console.log("no existe un producto con ese id");
                    return "no existe un producto con ese id";
                }
            }
        }
        catch (err){
            console.log(err);
        }
    }
    async getAll () {
        try {
            const pedirDatos = fs.readFileSync(this.file, 'utf-8');
            if (pedirDatos === '') {
                console.log("NO HAY PRODUCTOS EN LA BASE DE DATOS");
                return "NO HAY PRODUCTOS EN LA BASE DE DATOS"
            } else {
                const datos = JSON.parse(pedirDatos);
                console.log("TODOS LOS PRODUCTOS GUARDADOS EN LA BASE DE DATOS SON: ", datos);
                return "TODOS LOS PRODUCTOS GUARDADOS EN LA BASE DE DATOS SON: ", datos;
            }
        }
        catch (err){
            console.log(err);
        }
    }
    async deleteById (id) {
        try {
            const productos = await fs.promises.readFile(this.file, 'utf-8');
            const arrProds = await JSON.parse(productos);
            const existe = arrProds.filter(item => item.id === id);
            if (existe.length) {
                const borrado = arrProds.filter(item => item.id !== id)
                await fs.promises.writeFile(this.file, JSON.stringify(borrado, null, 2));
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
            await fs.promises.writeFile(this.file, '');
            console.log("Todos los productos han sido borrados de la base de datos");
        }
        catch (err) {
            console.log(err);
        }
        
    }
}

// const contenedorPrueba = new Contenedor('./productos.txt');
// contenedorPrueba.save({title:"Zapatillas",price:5500,thumbnail:""});
// contenedorPrueba.getAll();
// contenedorPrueba.getById(3);
// contenedorPrueba.deleteById(1);
// contenedorPrueba.deleteAll();

export default Contenedor