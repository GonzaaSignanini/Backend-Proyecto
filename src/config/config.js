const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    fileSystem:{
        baseUrl: './src/public/txt/'
    },
    mongo:{
        baseUrl:`mongodb+srv://Gonzalo:gonza123456@cluster0.ldyb1.mongodb.net/ecommerce?retryWrites=true&w=majority`
    },
    fireBase:{
        baseUrl:"https://proyecto-backend-10ae8.firebaseio.com"
    }
}