const {Sequelize} = require ("sequelize")

/*  nombre de la base de datos -  user - contraseña - {donde esta alojada?,lenguaje, puerto} */

const db = new Sequelize ("sistema_gestion_venta","root","1234",{
    host: "127.0.0.1",
    dialect: "mysql",
    port:3306
})

module.exports= db