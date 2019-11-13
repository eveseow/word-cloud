var configDB = require("./configDB");
var database = require("./database");

var apiURI = "http://localhost:3000";

var Data = database.Data;

module.exports = function () {
    if (configDB.seed) {
        Data.bulkCreate([
            { word: "This is delicious" }
            , { word: "It tastes awful" }
        ])
            .then(function () {
                console.log("done creating data records");
            })
        }
    }
