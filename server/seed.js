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
                { session_key: 123456, session_name: "123456", session_description: "Feelings", question: "How are you feeling today?", session_category: "test", session_status: true }
                , { session_key: 987654, session_name: "987654", session_description: "Movie Thoughts", question: "How was that movie?",session_category: "test", session_status: true }
            ])
                .then(function () {
                    console.log("done creating session records");
                }),
                Word.bulkCreate([
                    { session_id: 1, term: "what a beautiful day", prediction: "POS", confidence: 0.9999399185180664 }
                    , { session_id: 2, term: "today is a great day", prediction: "POS", confidence: 0.904884934425354 }
                ])
                    .then(function () {
                        console.log("done creating data records");
                    })
    }
}
