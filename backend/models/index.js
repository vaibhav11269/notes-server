const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const config = require("./config");

let sequelize = new Sequelize(config.databaseUrl, {
    dialect: 'postgres',
    port: config.port,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

var db = {};
fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf(".") !== 0 && file !== "index.js" && file !== "config.js"
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        console.log("model: ", model);
        db[model.name] = model;
    })
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//sync the db
db.sequelize
    .sync()
    .then(() => {
        console.log("Database looks fine");
    })
    .catch((error) => {
        console.log("Something went wrong with the database", error);
    })

    
module.exports = db;