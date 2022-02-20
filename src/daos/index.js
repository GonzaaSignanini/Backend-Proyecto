let products;
let carts;
let persistence = "mongo";

switch(persistence){
    case "fileSystem":
        const ProductFileSystem =  require('./products/productFileSystem.js')
        const CartFileSystem = require('./carts/cartFileSystem.js')
        products = new ProductFileSystem()
        carts = new CartFileSystem()
        break
    case "mongo":
        const ProductMongo = require('./products/productMongo.js')
        const CartMongo =   require('./carts/cartMongo.js')
        products = new ProductMongo
        carts =  new CartMongo
        break
    case "firebase":
        const ProductFirebase = require('./products/productFirebase.js')
        const CartFirebase =  require('./carts/cartFirebase.js')
        products = new ProductFirebase
        carts =  new CartFirebase
        break
}

module.exports = {products, carts, persistence}