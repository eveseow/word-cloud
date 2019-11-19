var Sequelize = require('sequelize');
var configDB = require("./configDB");
let fs = require('file-system');

let devOpts = new Sequelize(
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
})

let prodOpts = new Sequelize(
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
    dialectOptions: {
        ssl: {
            cert: fs.fs.readFileSync('server/BaltimoreCyberTrustRoot.crt.pem')
        }
    }    
})

let database = new Sequelize(
    process.env.ENVIRONMENT === "production" ? prodOpts : devOpts
);

var Data = require("./data.model")(database);

database.sync({
    force: configDB.seed
})
    .then(() => {
        require("./seed")();
        console.log("Database is in sync now")
    });

module.exports = {
    Data: Data,
    // "development": {
    //     "username": "p1748927",
    //     "password": "Evelyn37!",
    //     "database": "datadb",
    //     "host": "localhost",
    //     "dialect": "mysql"
    // },
    // "production": {
    //     "username": "process.env.MYSQL_USERNAME",
    //     "password": "process.env.MYSQL_PASSWORD",
    //     "database": "process.env.SCHEMA",
    //     "host": "process.env.DB_HOST",
    //     "dialect": "mysql",
    //     "dialectOptions": {
    //         ssl: {
    //             cert: fs.fs.readFileSync("./server/BaltimoreCyberTrustRoot.crt.pem")
    //         }
    //     }
    // }
}