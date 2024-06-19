// middlewares/authMiddleware.js
const { SECRET_KEY } = require("../controllers/usuariosControllers");
const jwt = require("jsonwebtoken");
const db = require("../data/db");

// Middleware para verificar el token de autenticación
const verificarToken = (req, res, next) => {
  // Obtener el token del header de la solicitud
  const token = req.headers["authorization"];

  // Verificar si hay un token
  if (token) {
    // Verificar el token con la clave secreta
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({ mensaje: "Token inválido o expirado" });
      } else {
        // Decodificar el token y añadir el usuario a la solicitud
        req.usuario = decoded.usuario;
        next();
      }
    });
  } else {
    // No hay token
    return res
      .status(401)
      .json({ mensaje: "Acceso denegado, token no proporcionado" });
  }
};
module.exports = { verificarToken };
