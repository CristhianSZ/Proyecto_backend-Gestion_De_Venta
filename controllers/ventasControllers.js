const { VentaModel } = require("../models/Ventas");

// Crear una nueva venta
const crearVenta = async (req, res) => {
    // Extraer los datos necesarios del cuerpo de la solicitud
    const { fecha, cantidad, total, productoId, clientesId} = req.body;
    try {
        // Crear una nueva venta con los datos proporcionados
        const nuevaVenta = await VentaModel.create({
            fecha,
            cantidad,
            total,
            productoId,
            clientesId
        });
        // Enviar una respuesta con la venta creada, estableciendo el estado HTTP a 201 (Creado)
        res.status(201).json(nuevaVenta);
    } catch (error) {
        // Registrar cualquier error que ocurra en la consola
        console.error("Error al crear la venta:", error);
        // Enviar una respuesta de error con el estado HTTP 500 (Error Interno del Servidor)
        res.status(500).json({ error: "Error al crear la venta" });
    }
}

// Obtener una venta específica por su ID
const obtenerVentas = async (req, res) => {
    try {
        // Obtener el ID de la venta de los parámetros de la solicitud
        const ventaId = req.params.id;

        // Buscar la venta por su ID utilizando el método findByPk (buscar por clave primaria)
        const venta = await VentaModel.findByPk(ventaId);

        // Si la venta no se encuentra, enviar una respuesta con el estado HTTP 404 (No Encontrado)
        if (!venta) {
            return res.status(404).json({ mensaje: "Venta no encontrada" });
        }

        // Enviar una respuesta con la venta encontrada, estableciendo el estado HTTP a 200 (OK)
        res.status(200).json(venta);
    } catch (error) {
        // Registrar cualquier error que ocurra en la consola
        console.error("Error al obtener la venta:", error);
        // Enviar una respuesta de error con el estado HTTP 500 (Error Interno del Servidor)
        res.status(500).json({ error: "Error al obtener la venta" });
    }
}

// Obtener todas las ventas
const obtenerTodasLasVentas = async (req, res) => {
    try {
        // Obtener todas las ventas utilizando el método findAll
        const ventas = await VentaModel.findAll();
        // Enviar una respuesta con todas las ventas obtenidas
        res.json(ventas);
    } catch (error) {
        // Registrar cualquier error que ocurra en la consola
        console.error("Error al obtener las ventas", error);
        // Enviar una respuesta de error con el estado HTTP 500 (Error Interno del Servidor)
        res.status(500).json({ error: "Error al obtener las ventas" });
    }
};

// Exportar las funciones para su uso en otras partes de la aplicación
module.exports = { crearVenta, obtenerVentas, obtenerTodasLasVentas };
