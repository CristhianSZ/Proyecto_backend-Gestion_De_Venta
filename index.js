const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const productosRouter = require("./routes/productosRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");
const ventasRouter = require("./routes/ventasRoutes");
const clientesRouter = require("./routes/clientesRoutes");
const app = express();
const port = process.env.PORT || 3000;

const db = require("./data/db");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/productos", productosRouter);
app.use("/api/usuarios", usuarioRouter);
app.use("/api/ventas", ventasRouter)
app.use("/api/clientes", clientesRouter)
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API del sistema de gestión!");
});

const conexionDB = async () => {
  try {
    await db.authenticate();
    console.log(`Conectado Ok a la Base de datos`);
  } catch (error) {
    console.log(`Hay un error y es el siguiente : ${error}`);
  }
};

app.listen(port, () => {
  conexionDB();
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
