const { CategoriaModel } = require("./Categoria"); //modificar a categoriaModels
const { ProveedorModel } = require("./Proveedor"); //modificar a proveedorModels
// importo la base de datos

const db = require("../data/db.js");

const { DataTypes } = require("sequelize");

const ProductoModel = db.define(
  "productos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      references: {
        model: CategoriaModel,
        key: "id",
      },
    },
    proveedorId: {
      type: DataTypes.INTEGER,
      references: {
        model: ProveedorModel,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

ProductoModel.belongsTo(CategoriaModel, { foreignKey: "categoriaId" });
ProductoModel.belongsTo(ProveedorModel, { foreignKey: "proveedorId" });

module.exports = { ProductoModel };
