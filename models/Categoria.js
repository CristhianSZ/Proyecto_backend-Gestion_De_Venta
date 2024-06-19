const { DataTypes } = require('sequelize');
const db = require('../data/db.js');

const CategoriaModel = db.define('categorias', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = {CategoriaModel};
