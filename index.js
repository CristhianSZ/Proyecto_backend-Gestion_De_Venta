const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const productosRouter = require("./routes/productosRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");
const ventasRouter = require("./routes/ventasRoutes");
const clientesRouter = require("./routes/clientesRoutes");
const categoriaRouter = require("./routes/categoriaRoutes");
const proveedorRouter = require("./routes/proveedorRoutes");
const db = require("./data/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/productos", productosRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/ventas", ventasRouter);
app.use("/api/clientes", clientesRouter);
app.use("/api/categorias", categoriaRouter);
app.use("/api/proveedores", proveedorRouter);

app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API del sistema de gestión!");
});

const conexionDB = async () => {
  try {
    await db.authenticate();
    console.log("Conectado correctamente a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
};

app.listen(port, () => {
  conexionDB();
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
