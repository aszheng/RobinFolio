var express = require('express');
var bodyParser = require('body-parser');
var Order = require('../../database-mongo');


exports.addOrder = function (req, res) {

  var newOrder = new Order (req.body);

  newOrder.save( function (err, savedOrder) {
    if (err) {res.send(err)}
  }).then(() => {
    Order.find({ }, function (err, result) {
      if (err){res.send(err)} else {
        console.log('RESULT in addORDER SERVER', result)
        res.json(result);  
      }
    });
    }
  )

};

exports.rmOrder = function (req, res) {
  
  Order.deleteOne({ symb: req.body.symb }, function (err, result) {
    if (err){res.send(err)}
  }).then( () => {
    Order.find({ }, function (err, result) {
      if (err){res.send(err)} else {
        res.json(result);  
      }
    });
  })

};

exports.getAll = function (req, res) {

  Order.find({ }, function (err, result) {
    if (err){res.send(err)} else {
      res.json(result);  
    } 
  });

};

exports.clearAll = function (req, res) {
  Order.remove({}, function (err, result){});
  res.end();
};

exports.getAPIData = function (req, res) {
  console.log("INSIDE getAPIData")
  res.end('HELLO BACK from GET API DATA')
};