var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var orderSchema = mongoose.Schema({
  symb: {type: String, unique: true, dropDups : true},
  price: Number,
  qty: Number,
  total: Number
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order; 


// var selectAll = function(callback) {
//   Order.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports.selectAll = selectAll;