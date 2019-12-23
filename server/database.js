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
    logging: configDB.mysql.logging,
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
    },
    timezone: '+08:00'
});

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
    logging: configDB.mysql.logging,
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true,
        ssl: {
            cert: fs.fs.readFileSync('server/BaltimoreCyberTrustRoot.crt.pem')
        }
    },
    timezone: '+08:00'
})

let database = process.env.ENVIRONMENT === "production" ? prodOpts : devOpts

var Word = require("./models/word.model")(database);
var User = require("./models/user.model")(database);
var Session = require("./models/session.model")(database);

Session.hasMany(Word, {
    foreignKey: "session_id"
});

database.sync({
    force: configDB.seed
})
    .then(() => {
        require("./seed")();
        console.log("Database is in sync now")
    });

module.exports = {
    Word: Word,
    User: User,
    Session: Session
}