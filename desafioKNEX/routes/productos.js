const express = require("express");
const Contenedor = require("../public/js/Contenedor.js");

const router = express.Router();
const productos = new Contenedor("./public/txt/productos.txt");

router.get("/", async (req, res) => {
  res.render("pages/index", { productos: await productos.getAll() });
});

router.get("/productos", async (req, res) => {
  res.render("pages/listado", { productos: await productos.getAll() });
});

module.exports = router;