// Importar el módulo express y crear un enrutador
const express = require("express");
const router = express.Router();

// Importar el middleware para verificar el token de autenticación
const { verificarToken } = require("../middlewares/authMiddleware");

// Importar los controladores de clientes
const {
    crearCliente,       // Controlador para crear un nuevo cliente
    actualizarCliente,  // Controlador para actualizar los datos de un cliente
    obtenerCliente,     // Controlador para obtener los clientes
    eliminarCliente,    // Controlador para eliminar un cliente de la base de datos
} = require("../controllers/clientesControllers");

// Definir la ruta para crear un nuevo cliente
router.post("/", crearCliente);

// Definir la ruta para obtener todos los clientes, con verificación de token
router.get("/", verificarToken, obtenerCliente);

// Definir la ruta para actualizar un cliente específico por ID
router.put("/:id", actualizarCliente);

// Definir la ruta para eliminar un cliente específico por ID
router.delete("/:id", eliminarCliente);

// Exportar el enrutador para que pueda ser utilizado en otras partes de la aplicación
module.exports = router;
