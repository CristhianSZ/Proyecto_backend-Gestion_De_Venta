const express = require("express");
const router = express.Router();
const { obtenerCategoria, obtenerCategorias } = require("../controllers/categoriaControllers");

router.get("/", obtenerCategorias);
router.get("/:id", obtenerCategoria);

module.exports = router;