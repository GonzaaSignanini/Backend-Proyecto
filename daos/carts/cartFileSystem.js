const FileContainer = require("../../containers/FileContainer.js");
const fs = require('fs');
const productsURL = './public/txt/productos.txt'
const Utils = require('../../lib/utils.js')

module.exports =  class CartFileSystem extends FileContainer{
    constructor(){
        super('carritos.txt')
    }

    async createCart(){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let carts = JSON.parse(data)
            let cart = {
                title: 'Cart',
                id: carts.length + 1, 
                cartTimestamp: Utils.dateNow,
                productos:[]
            }
            carts.push(cart)
            try{
                await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2))
                return {status:"success", message:`Cart created`, cartId:cart.id}
            }
            catch(err){
                return {status:"error", message:`Error to add product ${productId} in Cart ${idNumber}: ${err}`}
            }
        }
        catch(err){
            console.log(`Error to create cart: ${err}`)
            return {status:"error", message:`Error to create cart: ${err}`}
        }
    }

    async getProductsByCartId(idNumber){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let carts = JSON.parse(data)
            let cartIndex = carts.findIndex(cart => cart.id === idNumber)
            let productsInCart = carts[cartIndex].productos
            if(productsInCart){
                return {status:"success", payload:productsInCart}
            }else{
                console.log(null)
                return {status:"error", payload:null}
            }
        }
        catch(err){
            return {status:"error", message:err}
        }
    }

    async addProduct(idNumber, productId){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let carts = JSON.parse(data)
            let cartIndex = carts.findIndex(cart => cart.id === idNumber)
            let cart = carts.find(cart => cart.id === idNumber)

            let dataProducts = await fs.promises.readFile(productsURL, 'utf-8')
            let allProducts = JSON.parse(dataProducts)
            let productToAdd = allProducts.find(prod => prod.id === productId)
            
            cart.productos.push(productToAdd)
            carts.splice(cartIndex, 1, cart)

            try{
                await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2))
                return {status:"success", message:`Product ${productId} added to Cart ${idNumber}`}
            }
            catch(err){
                return {status:"error", message:`Error to add product ${productId} in Cart ${idNumber}: ${err}`}
            }
        }
        catch(err){
            return {status:"error", message:`Error to add product ${productId} in Cart ${idNumber}: ${err}`}
        }
    }

    async deleteProduct(idNumber, productId){
        try{
            let data = await fs.promises.readFile(this.url, 'utf-8')
            let carts = JSON.parse(data)
            let cart = carts.find(cart => cart.id === idNumber)
            let cartIndex = carts.findIndex(cart => cart.id === idNumber)
            
            let productIndex = cart.productos.findIndex(prod => prod.id === productId)
            //let deletedProduct = productsinCart.find(prod => prod.id === productId)
            
            if(productIndex > -1){
                cart.productos.splice(productIndex, 1)
                carts.splice(cartIndex, 1, cart)
                try{
                    await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2))
                    console.log(`product deleted at cart ${cart.id}`)
                    return {status:"success",message:`product deleted at cart ${cart.id}`}
                }
                catch(err){
                    console.log(err)
                    return {status:"error",message:err}
                }
            }
        }
        catch(err){
            return {status:"error",message:err}
        }
    }
}