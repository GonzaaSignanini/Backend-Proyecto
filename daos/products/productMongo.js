const MongoContainer = require("../../containers/MongoContainer.js");

class ProductMongo extends MongoContainer{
    constructor(){
        super(
            'productos',
            {   title: {
                    type:String,
                    required:true
                },
                price: {
                    type:Number,
                    required:true
                },
                thumbnail: {
                    type:String,
                    required:true
                }
            }
        )}

    async addProduct(product){
        try{
            let result = await this.collection.create(product)
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

    async updateProduct(id,body){
        try{
            let result = await this.collection.findByIdAndUpdate(id, {$set: body})
            return {status: "success", payload:result}
        }catch(err){
            return {status:"error", error:err.message}
        }
    }

}

module.exports = ProductMongo;