const { ProveedorModel } = require("../models/Proveedor");


const obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await ProveedorModel.findAll();
        res.json(proveedores);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los proveedores" });
    }
};

const obtenerProveedor = async (req, res) => {
    const { id } = req.params;
    
    try {

        const proveedor = await ProveedorModel.findOne({ where: { id } });
        if (!proveedor) {
            return res
                .status(401)
                .json({ message: "Proveedor no encontrado" });
        }

        res.json(proveedor);

    } catch (error) {
        res
            .status(500)
            .json({ message: "Error al traer proveedor", error: error.message });
    }
};

module.exports = {
    obtenerProveedor,
    obtenerProveedores
};