const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/usuariosControllers");
const { route } = require("./productosRoutes");

router.post("/register", register);

router.post("/login", login);



module.exports = router;
