const mongoose = require('mongoose');
const collectionRef = 'products'

const ProductsSchema = new mongoose.Schema({
    title: {
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

})

export const productsModel = mongoose.model(collectionRef, ProductsSchema)