const { ProductoModel } = require("../models/Producto");

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, categoriaId, proveedorId } = req.body;
  try {
    const nuevoProducto = await ProductoModel.create({
      nombre,
      descripcion,
      precio,
      categoriaId,
      proveedorId,
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await ProductoModel.findAll();
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};


// Actualizar un producto
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoriaId, proveedorId } = req.body;
  try {
    const productoActualizado = await ProductoModel.update({
      nombre,
      descripcion,
      precio,
      categoriaId,
      proveedorId,
    }, {
      where: { id }
    });
    if (productoActualizado[0] === 1) {
      res.status(200).json({ message: "Producto actualizado correctamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const productoEliminado = await ProductoModel.destroy({
      where: { id }
    });
    if (productoEliminado === 1) {
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

module.exports = { crearProducto, obtenerProductos, actualizarProducto, eliminarProducto };
