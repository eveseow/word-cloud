var configDB = require("./configDB");
var database = require("./database");

var apiURI = "http://localhost:3000";

var Word = database.Word;
var User = database.User;
var Session = database.Session;

module.exports = function () {
    if (configDB.seed) {
        User.bulkCreate([
            { username: "admin", password: "admin123" }
        ])
            .then(function () {
                console.log("done creating register records");
            }),
            Session.bulkCreate([
                { session_key: 123456, session_name: "1st Event", session_description: "Testing Seed 1", session_category: "test", session_status: true }
                , { session_key: 987654, session_name: "2nd Event", session_description: "Testing Seed 2", session_category: "test", session_status: true }
            ])
                .then(function () {
                    console.log("done creating session records");
                }),
                Word.bulkCreate([
                    { session_id: 1, term: "this belongs to room 123456" }
                    , { session_id: 2, term: "this belongs to room 987654" }
                ])
                    .then(function () {
                        console.log("done creating data records");
                    })
    }
}
