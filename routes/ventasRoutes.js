// Importar el módulo express y crear un enrutador
const express = require("express");
const router = express.Router();
// Importar el middleware para verificar el token de autenticación
const { verificarToken } = require("../middlewares/authMiddleware");

// Importar los controladores de ventas
const {
    crearVenta,       // Controlador para crear una nueva venta
    obtenerVentas,     // Controlador para obtener ventas
    obtenerTodasLasVentas
} = require("../controllers/ventasControllers");

// Definir la ruta para crear una nueva venta
router.post("/", crearVenta);

// Definir la ruta para obtener una venta específica por su ID
// Esta ruta utiliza el método HTTP GET y requiere autenticación mediante verificarToken
router.get("/:id", verificarToken, obtenerVentas);

// Definir la ruta para obtener todas las ventas realizadas
router.get("/", verificarToken, obtenerTodasLasVentas);

module.exports = router