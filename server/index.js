var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var Order = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))

var routes = require('./Routes/serverRoutes');
routes(app);

app.listen(3000, function() {
  console.log('listening on port 3000!');
});