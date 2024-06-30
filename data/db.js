const {Sequelize} = require ("sequelize")

/*  nombre de la base de datos -  user - contraseña - {donde esta alojada?,lenguaje, puerto} */

const db = new Sequelize ("sistema_gestion_venta","root","1234",{
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database:process.env.MYSQL_ADDON_DB,
    dialect: "mysql",
    port: process.env.MYSQL_ADDON_PORT
})

module.exports= db