const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
// const Artists = require('../database/Artists.js');
// const AppService = require('./AppService.js');

var Order = require('../database/index.js');

const app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/../client/dist'));


var routes = require('./Routes/serverRoutes');
routes(app);

// var mostRecentSearch = null;

// app.post('/search', function(req, res) {
//   AppService(req)
//     .then(data => {
//       mostRecentSearch = data;
//       res.json(data);
//     })
//     .catch(error => {
//       res.send(error);
//     });
// });

// app.get('/favoriteslist', function(req, res) {
//   Artists.fetchFavorites()
//     .then(results => {
//       res.send(results);
//     })
//     .catch(error => {
//       res.send(error);
//     });
// });


// app.post('/favorite', function(req, res) {
//   Artists.findAndUpdate({ artist_name: req.body }, mostRecentSearch, function(results, error) {
//     if (results) {
//       res.JSON(results);
//     } else {
//       res.send(error);
//     }
//   });
// });

var server = app.listen(port, function() {
  console.log(`Magical unicorns will arrive on port ${port}!`);
});