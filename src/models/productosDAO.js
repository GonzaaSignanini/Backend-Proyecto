const Product = require('./productos.js')

class ProductDAO {
    constructor() {}
  
    async findAll() {
      return await Product.find();
    }
    async getById(id) {
      return await Product.findById(id);
    }
  }
  
module.exports = ProductDAO;