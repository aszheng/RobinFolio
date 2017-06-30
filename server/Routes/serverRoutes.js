module.exports = function (app) {
  var orderTable = require('../controller/serverController');

  app.route('/buyingPower')
    .get(orderTable.getAll);

  app.route('/add')
    .post(orderTable.addOrder);

  app.route('/remove')
    .post(orderTable.rmOrder);

  app.route('/clearAll')
    .post(orderTable.clearAll);  

  app.route('/getAPIData')
    .post(orderTable.getAPIData);


}

