var express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');

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

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
  ];

app.use(express.static('../dist/project-ai-lab'))

app.get('*', (req, res) => {
  const options = {
    root: path.join(__dirname, '../dist/project-ai-lab')
  }

  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`dist/project-ai-lab/${req.url}`));
  } else {
    return res.sendFile('index.html', options)
  }
});

app.use(function (req, resp) {
    resp.status(440);
    resp.send("Error File not Found");
});

// set port and start webserver
// app.listen('8000', function () {
//     console.log("Server running at http://localhost:8000");
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 