const mongoose = require('mongoose');

module.exports = async () => {
      await mongoose.connect('mongodb+srv://Gonzalo:gonza123456@cluster0.ldyb1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true
      }, err => {
        if(err) throw new Error(`Error de conexión a la base de datos ${err}`);
        console.log('Base de datos conectada');
      })
};