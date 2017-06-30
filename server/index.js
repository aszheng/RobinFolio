// const express = require('express');
// const bodyParser = require('body-parser');
// const request = require('request');
// const dotenv = require('dotenv').config();

// var port = process.env.PORT || 3000;

// var Order = require('../database-mongo');

// var app = express();

// app.use(express.static(__dirname + '/../react-client/dist'));
// app.use(bodyParser.urlencoded({ extended: false }))

// var routes = require('./Routes/serverRoutes');
// routes(app);

// app.listen(3000, function() {
//   console.log(`listening on port ${port}!`);
// });  

const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');

var Order = require('../database-mongo/index.js');

const app = express();

var port = process.env.PORT || 3000;
console.log('process.env.PORT', process.env.PORT)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/../react-client/dist'));
console.log('APP USE STATIC', __dirname + '/../react-client/dist')


var routes = require('./Routes/serverRoutes');
routes(app);

var server = app.listen(port, function() {
  console.log(`Magical unicorns will arrive on port ${port}!`);
});