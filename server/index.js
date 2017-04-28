var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/buyingPower', function (req, res) {
  console.log('INSIDE SERVER GET ROUTE');
});

app.post('/add', function (req, res) {
  console.log('INSIDE SERVER ADD POST ROUTE');
  console.log('REQ BODY', req.body);
  res.end();
});

app.post('/remove', function (req, res) {
  console.log('INSIDE SERVER ADD POST ROUTE');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

