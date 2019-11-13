var express     = require ('express');
var bodyParser  = require('body-parser');
var dataCtrl  = require('./api/data/data.controller');

var app  = express();
var cors = require('cors');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());

app.get ("/api/data",  dataCtrl.list);
app.post("/api/data",  dataCtrl.create);

app.use(function (req, resp) {
    resp.status(440);
    resp.send("Error File not Found");
});


var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }
  
  app.use(express.static('dist', options))
  app.use('/static', express.static('dist'))

// set port and start webserver
app.listen('3000', function () {
    console.log("Server running at http://localhost:3000");
});

