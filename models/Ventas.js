// Importar el modelo ProductoModel desde el archivo Producto
const { ProductoModel } = require("./Producto");
// Importar el modelo ClienteModel desde el archivo Clientes.js
const { ClienteModel } = require("./Clientes.js");

// Importar la instancia de conexión a la base de datos
const db = require("../data/db.js");

// Importar los tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Definir el modelo de la tabla 'ventas' utilizando Sequelize
const VentaModel = db.define("ventas", {
    // Definición del campo 'id' como clave primaria autoincremental
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Definición del campo 'fecha' como tipo DATE que no puede ser nulo
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    // Definición del campo 'cantidad' como tipo INTEGER que no puede ser nulo
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Definición del campo 'total' como tipo DECIMAL(10, 2) que no puede ser nulo
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // Definición del campo 'productoId' como tipo INTEGER que referencia al campo 'id' en la tabla 'productos'
    productoId: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductoModel, // Referencia al modelo ProductoModel
            key: "id",            // Clave en el modelo referenciado
        },
    },
    // Definición del campo 'clientesId' como tipo INTEGER que referencia al campo 'id' en la tabla 'clientes'
    clientesId: {
        type: DataTypes.INTEGER,
        references: {
            model: ClienteModel, // Referencia al modelo ClienteModel
            key: "id",           // Clave en el modelo referenciado
        },
    },
}, {
    // Configuración de la tabla para incluir campos de timestamps (createdAt y updatedAt)
    timestamps: true,
});

// Establecer la relación de pertenencia entre VentaModel y ProductoModel
VentaModel.belongsTo(ProductoModel, { foreignKey: "productoId" });
// Establecer la relación de pertenencia entre VentaModel y ClienteModel
VentaModel.belongsTo(ClienteModel, { foreignKey: "clientesId" });

// Exportar el modelo VentaModel para que pueda ser utilizado en otras partes de la aplicación
module.exports = { VentaModel };
