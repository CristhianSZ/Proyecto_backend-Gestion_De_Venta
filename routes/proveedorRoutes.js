const express = require("express");
const router = express.Router();
const { obtenerProveedor, obtenerProveedores } = require("../controllers/proveedorControllers");

router.get("/", obtenerProveedores);
router.get("/:id", obtenerProveedor);

module.exports = router;