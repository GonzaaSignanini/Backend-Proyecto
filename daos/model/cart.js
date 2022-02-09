const mongoose = require('mongoose');
const collectionRef = 'carts'
const CartsSchema = new mongoose.Schema({
    products: {
        type:Array,
        required:true
    }

})

export const cartsService = mongoose.model(collectionRef, CartsSchema)