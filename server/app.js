var express = require('express');
var bodyParser = require('body-parser');
var wordCtrl = require('./api/word/word.controller');
var userCtrl = require('./api/user/user.controller');
var sessionCtrl = require('./api/session/session.controller');
var sentiCtrl = require('./api/sentiment/sentiment.controller');

var app = express();
var cors = require('cors');

var axios = require('axios')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/word", wordCtrl.list);
app.post("/api/word", wordCtrl.create);
app.get("/api/word/:session_id", wordCtrl.listSession);

app.get("/api/user", userCtrl.list);
app.post("/api/user", userCtrl.create);

app.get("/api/session", sessionCtrl.list);
app.post("/api/session", sessionCtrl.create);

app.get("/api/sentiment", sentiCtrl.list);
app.post("/api/sentiment", sentiCtrl.create);



app.use(function (req, resp) {
    resp.status(440);
    resp.send("Error File not Found");
});

// set port and start webserver
app.listen('3000', function () {
    console.log("Server running at http://localhost:3000");
});

