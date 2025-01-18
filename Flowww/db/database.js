const Datastore = require('nedb');
const path = require('path');

// Настройка базы данных
const productsDb = new Datastore({ filename: path.join(__dirname, 'products.db'), autoload: true });
const ordersDb = new Datastore({ filename: path.join(__dirname, 'orders.db'), autoload: true });

module.exports = {
    productsDb,
    ordersDb,
};
