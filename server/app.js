const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

var bodyParser = require('body-parser');
var dataCtrl = require('./api/data/data.controller');

var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000/api/data"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/data", dataCtrl.list);
app.post("/api/data", dataCtrl.create);

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

app.use(express.static('../dist/test2'))

app.get('*', (req, res) => {
  const options = {
    root: path.join(__dirname, '../dist/test2')
  }

  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`dist/test2/${req.url}`));
  } else {
    return res.sendFile('index.html', options)
  }
});

app.use(function (req, resp) {
  resp.status(440);
  resp.send("Error File not Found");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))