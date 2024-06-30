const { CategoriaModel } = require("../models/Categoria");


const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaModel.findAll();
        res.json(categorias);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
};

const obtenerCategoria = async (req, res) => {
    const { id } = req.params;
    
    try {

        const categoria = await CategoriaModel.findOne({ where: { id } });
        if (!categoria) {
            return res
                .status(401)
                .json({ message: "Categoría no encontrada" });
        }

        res.json(categoria);

    } catch (error) {
        res
            .status(500)
            .json({ message: "Error al traer categoría", error: error.message });
    }
};

module.exports = {
    obtenerCategoria,
    obtenerCategorias
};