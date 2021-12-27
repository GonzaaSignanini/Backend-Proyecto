import fs from 'fs';
        
class Contenedor {
    constructor (file) {
        this.file = file;
    }

    update(id, object) {
        this.getAll().then(async obj => {
            let datos = obj;
            const index = datos.findIndex(obj => obj.id == id);
            datos[index].title = object.title || "";
            datos[index].price = object.price || "";
            datos[index].thumbnail = object.thumbnail || "";

            await fs.promises.writeFile(this.file, JSON.stringify(datos, null, 2));
        })
        .catch(error => {
            console.log("No se pudo actualizar el objeto.", error);
        })
    }

    async save(producto) {
        let id = this.maxId();
        id += 1;
        let obj = { ...producto, id: id}
        try{
            let fileProductos = await fs.promises.readFile(this.file , 'utf-8');
            let productos = JSON.parse(fileProductos);
            if(productos.some(prod => prod.title === obj.title)){
                return {status:"error",message: "El producto ya existe"};
            }else{
                productos.push(obj);
                try{
                    await fs.promises.writeFile(this.file , JSON.stringify(productos, null, 2));
                    return {status:"success",message: `Producto registrado. ID: ${obj.id}`}
                }catch{
                    return {status:"error",message:"No se pudo agregar el producto"}
                }
            }
        }catch{
            try{
                await fs.promises.writeFile(this.file , JSON.stringify([obj], null, 2));
                return {status: "success",message: `Producto registrado. ID: ${obj.id}`}
            }catch{
                return {status: "error",message: "No se pudo agregar el producto"}
            }
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
    async getAll() {
        try{
            let archivo = await fs.promises.readFile(this.file , 'utf-8');
            let productos = JSON.parse(archivo);
            return {status: "success", message: productos};
        }catch{
            //El archivo no existe
            return {status: "error", message: "El archivo no existe"}
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

    maxId() {
        let id = 0
        try{
            let fileProductos = fs.readFileSync(this.file);
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
}

// const contenedorPrueba = new Contenedor('./productos.txt');
// contenedorPrueba.update(2);

// contenedorPrueba.save({title:"Zapatillas",price:5500,thumbnail:""});
// contenedorPrueba.getAll();
// contenedorPrueba.getById(3);
// contenedorPrueba.deleteById(1);
// contenedorPrueba.deleteAll();

export default Contenedor