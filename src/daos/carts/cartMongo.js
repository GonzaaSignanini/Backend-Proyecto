const mongoose = require('mongoose');
const { Schema } = mongoose;
const MongoContainer = require('../../containers/MongoContainer.js');

module.exports = class CartMongo extends MongoContainer{
    constructor(){
        super(
            'carts',
            {
                productos:[{
                    type:Schema.Types.ObjectId,
                    ref:'productos',
                }]                
            },{ timestamps:true }
        )
    }

    async createCart(){
        try{
            let newCart = await this.collection.create({productos:[]})
            return {status:"succes", messagge:'new cart created', payload:newCart}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async addProduct(idNumber, productId){
        try{
            let result = await this.collection.updateOne({_id:idNumber},{$push:{productos:productId}})
            return {status:"success", payload:result}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error to add product ${productId} in Cart ${idNumber}: ${err}`}
            
        }
    }

    async getProductsByCartId(idNumber){
        try{
            const cart = await this.collection.findById(idNumber)
            const productos = cart.productos
            return {status:"success", payload:productos}
        }catch(err){
            return {status:"error", message:err}
        }
    }

    async deleteProduct(idNumber, productId){
        try{
            let result = await this.collection.updateOne({_id:idNumber},{$pull:{productos:productId}})
            return {status:"success", message:`product deleted at cart ${idNumber}`, payload:result}
        }catch(err){
            console.log(err)
            return {status:"error", message:`Error to delete product ${productId} in Cart ${idNumber}: ${err}`}
            
        }
    }

}