var Order = require('../../database-mongo');

exports.addOrder = function (req, res) {

  var newOrder = new Order (req.body);

  newOrder.save( function (err, savedOrder) {
    if (err) {res.send(err)}
    res.json(savedOrder);
  })

};

exports.rmOrder = function (req, res) {
  
  Order.deleteOne({ symb: req.body.symb }, function (err, result) {
    if (err){res.send(err)}
    res.end('Removed');  
  });

};

exports.getAll = function (req, res) {

  Order.find({ }, function (err, result) {
    if (err){res.send(err)}
    res.json(result);  
  });

};