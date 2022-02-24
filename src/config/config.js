const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    fileSystem:{
        baseUrl: './public/txt/'
    },
    mongo:{
        baseUrl:`mongodb+srv://Gonzaa:gonzasignanini123@cluster0.2umrg.mongodb.net/ecommerce?retryWrites=true&w=majority`
    },
    fireBase:{
        baseUrl:"https://proyecto-backend-10ae8.firebaseio.com"
    }
}