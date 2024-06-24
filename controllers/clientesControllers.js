// Importar el modelo de Cliente desde la carpeta de modelos
const { ClienteModel } = require("../models/Clientes");

// Función para crear un nuevo cliente
const crearCliente = async (req, res) => {
  const { nombre, apellido, telefono } = req.body; // Desestructurar los datos del cuerpo de la solicitud
  try {
    // Crear un nuevo registro de cliente en la base de datos
    const nuevocliente = await ClienteModel.create({
      nombre,
      apellido,
      telefono
    });
    // Enviar una respuesta con el estado 201 (creado) y el nuevo cliente creado
    res.status(201).json(nuevocliente);
  } catch (error) {
    // Manejo de errores en caso de fallo al crear el cliente
    res.status(500).json({ error: "Error al crear el cliente" });
  }
};

// Función para obtener todos los clientes
const obtenerCliente = async (req, res) => {
  try {
    // Obtener todos los registros de clientes de la base de datos
    const clientes = await ClienteModel.findAll();
    // Enviar una respuesta con la lista de clientes obtenidos
    res.json(clientes);
  } catch (error) {
    // Manejo de errores en caso de fallo al obtener los clientes
    console.log(error);
    res.status(500).json({ error: "Error al obtener los clientes" });
  }
};

// Función para actualizar un cliente existente
const actualizarCliente = async (req, res) => {
  const { id } = req.params; // Obtener el ID del cliente desde los parámetros de la solicitud
  const { nombre, apellido, telefono } = req.body; // Desestructurar los datos del cuerpo de la solicitud
  try {
    // Actualizar el registro del cliente en la base de datos
    const clienteActualizado = await ClienteModel.update({
      nombre,
      apellido,
      telefono,
    }, {
      where: { id } // Condición para actualizar el cliente por ID
    });
    if (clienteActualizado[0] === 1) {
      // Enviar una respuesta con el estado 200 (OK) si el cliente fue actualizado correctamente
      res.status(200).json({ message: "cliente actualizado correctamente" });
    } else {
      // Enviar una respuesta con el estado 404 (no encontrado) si el cliente no fue encontrado
      res.status(404).json({ error: "cliente no encontrado" });
    }
  } catch (error) {
    // Manejo de errores en caso de fallo al actualizar el cliente
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

// Función para eliminar un cliente existente
const eliminarCliente = async (req, res) => {
  const { id } = req.params; // Obtener el ID del cliente desde los parámetros de la solicitud
  try {
    // Eliminar el registro del cliente en la base de datos
    const clienteEliminado = await ClienteModel.destroy({
      where: { id } // Condición para eliminar el cliente por ID
    });
    if (clienteEliminado === 1) {
      // Enviar una respuesta con el estado 200 (OK) si el cliente fue eliminado correctamente
      res.status(200).json({ message: "cliente eliminado correctamente" });
    } else {
      // Enviar una respuesta con el estado 404 (no encontrado) si el cliente no fue encontrado
      res.status(404).json({ error: "cliente no encontrado" });
    }
  } catch (error) {
    // Manejo de errores en caso de fallo al eliminar el cliente
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};

// Exportar las funciones para ser utilizadas en otras partes de la aplicación
module.exports = { crearCliente, obtenerCliente, actualizarCliente, eliminarCliente };
