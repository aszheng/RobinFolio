var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var Order = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/buyingPower', function (req, res) {
  console.log('INSIDE SERVER GET ROUTE');
});

app.post('/add', function (req, res) {
  console.log('REQ BODY ADD OBJ', req.body);

  var newOrder = new Order (req.body);
  newOrder.save().then( (savedOrder)=> {
    console.log('SAVED ORDER', savedOrder);
    res.json(savedOrder);
  }).catch((err)=> {
    console.log('ERR - DUPLICAT');
    res.end('DUPLICATE');
  });

});

app.post('/remove', function (req, res) {
  console.log('REQ BODY REMOVE OBJ', req.body.symb);


  Order.deleteOne({ symb: req.body.symb }, function (err) {
    console.log('DELETED')
  });

  res.end();  
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

