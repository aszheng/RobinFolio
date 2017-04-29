module.exports = function (app) {
  var orderTable = require('../Controller/serverController');

  app.route('/buyingPower')
    .get(orderTable.getAll);

  app.route('/add')
    .post(orderTable.addOrder);

  app.route('/remove')
    .post(orderTable.rmOrder);

  app.route('/clearAll')
    .post(orderTable.clearAll);


}

