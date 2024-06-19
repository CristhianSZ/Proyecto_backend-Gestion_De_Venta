const express = require("express");
const router = express.Router();
const {verificarToken} = require("../middlewares/authMiddleware")

// Importar los controladores de productos
const {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productosControllers");

// Ruta para crear un nuevo producto
router.post("/", crearProducto);

// Ruta para obtener todos los productos
router.get("/",verificarToken, obtenerProductos);

// Ruta para actualizar un producto
router.put("/:id", actualizarProducto);

// Ruta para eliminar un producto
router.delete("/:id", eliminarProducto);

module.exports = router;
