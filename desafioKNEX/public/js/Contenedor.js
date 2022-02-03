const { knex } = require('../../db/db.js');


class Contenedor{
    constructor(archivo){
        this.archivo = archivo
    }

    async save(producto){
        try {
            const newProduct = await knex.from('productos').insert(producto);
            return newProduct
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
          const productos = await knex.from('productos').select('*');
          return productos;
        } catch (error) {
          throw error;
        }
      }

    async deleteById(number){
        try {
            const prodEliminado = await knex.from('productos').where('id', '==', number).del()
            return prodEliminado
        } catch (err){
            throw err;
        }
    }

    async deleteAll(){
        try {
            const productoEliminado = await knex.from('productos').del()
            return productoEliminado
        } catch (err) {
            throw err;
        }
    }

    async updateById(number, product){
        try {
            const productoActualizado = await knex.from('productos').where('id', '==', number).update(product)
            return productoActualizado
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Contenedor