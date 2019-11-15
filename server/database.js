var Sequelize = require('sequelize');
var configDB = require("./configDB");
let fs = require('file-system');

var database;

database = new Sequelize(
    configDB.mysql.database,
    configDB.mysql.username,
    configDB.mysql.password, {
        host: configDB.mysql.host,
        dialect: 'mysql',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false,
    });

var Data = require("./data.model")(database);

database.sync({
    force: configDB.seed
})
    .then(() => {
        require("./seed")();
        console.log("Database is in sync now")
    });

module.exports = {
    Data: Data
}