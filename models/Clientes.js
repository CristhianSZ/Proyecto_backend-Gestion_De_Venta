// Importar la instancia de conexión a la base de datos
const db = require("../data/db.js");

// Importar los tipos de datos de Sequelize
const { DataTypes } = require("sequelize");

// Definir el modelo de la tabla 'clientes' utilizando Sequelize
const ClienteModel = db.define("clientes", {
    // Definición del campo 'id' como clave primaria autoincremental
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    // Definición del campo 'nombre' como tipo STRING que no puede ser nulo
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Definición del campo 'apellido' como tipo STRING que puede ser nulo
    apellido: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Definición del campo 'telefono' como tipo STRING con validación específica
    telefono: {
        type: DataTypes.STRING,
        validate: {
            is: /^\d{4}-\d{5}$/ // Validación para números de teléfono en formato específico
        }
    }
}, {
    timestamps: true,      // Incluir campos createdAt y updatedAt automáticos 
});

// Exportar el modelo ClienteModel para que pueda ser utilizado en otras partes de la aplicación
module.exports = { ClienteModel };
