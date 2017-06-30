var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');
mongoose.connect('mongodb://group:Hackreactor1@ds143342.mlab.com:43342/robinfolio');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var orderSchema = mongoose.Schema({
  companyName: String,
  symb: {type: String, unique: true, dropDups: true} ,
  price: Number,
  qty: Number,
  total: Number
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order; 