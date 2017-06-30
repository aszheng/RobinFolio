var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var Order = require('../../database/index.js');


exports.addOrder = function (req, res) {
  var inputSymb = req.body.symb;
  var addQty = Number(req.body.qty);
  var addTotal = Number(req.body.total);

  Order.findOne({symb: inputSymb})
    .exec(function (err, result) {
      //if result is null - write new document to collection 
      if (result === null) {
        var newOrder = new Order (req.body);
        newOrder.save( function (err, result) {if (err) {throw err}})
      //else edit document
      } else {
        addQty += result.qty;
        addTotal += result.total;
      }
    })
    .then( () => {
      Order.findOneAndUpdate(
        {symb: inputSymb},
        {qty: addQty, total: addTotal},
        function (err, result) {if (err) {throw err};}
      )
      res.end();
    })
};

exports.rmOrder = function (req, res) {
  var inputSymb = req.body.symb;
  var rmQty = Number(req.body.qty);
  var rmTotal = Number(req.body.total);

  Order.findOne({symb: inputSymb})
    .exec(function (err, result) {
      //if result.qty >= rmQty - delete document from collection 
      if (rmQty >= result.qty) {
        Order.deleteOne({ symb: inputSymb }, function (err, result) {if (err){throw err}})
      //else edit document
      } else {
        rmQty = result.qty - rmQty;
        rmTotal = result.total - rmTotal;
      }
    })
    .then( () => {
      Order.findOneAndUpdate(
        {symb: inputSymb},
        {qty: rmQty, total: rmTotal},
        function (err, result) {if (err) {throw err};}
      )
      res.end();
    })

  // .then( () => {
  //   Order.find({ }, function (err, result) {
  //     if (err){res.send(err)} else {
  //       res.json(result);  
  //     }
  //   });
  // })

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
    var ticker = req.body.symb;
    request({ url: 'http://dev.markitondemand.com/Api/v2/Quote/json', qs: { symbol: ticker }}, function (err, response,body) {
    res.json(body);
  })
};