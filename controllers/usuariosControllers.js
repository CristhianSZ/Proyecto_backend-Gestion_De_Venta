const { UsuarioModel } = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Función para manejar el registro de usuarios
const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Verifica si el usuario ya existe
    const usuarioExistente = await UsuarioModel.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashea la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea el nuevo usuario
    const nuevoUsuario = await UsuarioModel.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
    });

    res
      .status(201)
      .json({ message: "Usuario registrado con éxito", usuario: nuevoUsuario });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al registrar usuario", error: error.message });
  }
};
// Clave secreta para firmar el token, en producción debería ser más segura y estar en variables de entorno
const SECRET_KEY = "tu_clave_secreta";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica si el usuario existe
    const usuario = await UsuarioModel.findOne({ where: { email } });
    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Compara la contraseña ingresada con la contraseña hasheada en la base de datos
    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};

module.exports = {
  register,
  login,
  SECRET_KEY
};
