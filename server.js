const express = require('express')
const app = express()
const indexRouter = require('./routes/indexRouter')
const shopRouter = require('./routes/shopRouter')
const path = require('path')

//View engine
app.set('view engine', 'ejs')
app.set('views', './views');

//Router API
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', indexRouter)
app.use('/api', shopRouter)
app.use(function(req, res){
    res.status(404).send({"error": -2, "descripcion": `ruta ${req.url} método ${req.method} no implementada`});
});

///Server
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto ${server.address().port}`)
}) 
server.on("error", error => console.log(`${error}`))                  

module.exports = app;