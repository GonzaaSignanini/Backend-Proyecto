import mongoose from 'mongoose'

export default class MongoClient{
    constructor(){
        mongoose.connect('mongodb+srv://Gonzalo:gonza123456@cluster0.ldyb1.mongodb.net/ecommerce?retryWrites=true&w=majority')
    }
}