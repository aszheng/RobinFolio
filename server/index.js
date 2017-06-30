const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const dotenv = require('dotenv').config();

var port = process.env.PORT || 3000;

var Order = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))

var routes = require('./Routes/serverRoutes');
routes(app);

app.listen(3000, function() {
  console.log(`listening on port ${port}!`);
});  