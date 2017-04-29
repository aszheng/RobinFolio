var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var Order = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))

var routes = require('./Routes/serverRoutes');
routes(app);

app.post('/getAPIData', function (req, res) {
    var ticker = req.body.symb;
    request({ url: 'http://dev.markitondemand.com/Api/v2/Quote/json', qs: { symbol: ticker }}, function (err, response,body) {
    res.json(body);
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});