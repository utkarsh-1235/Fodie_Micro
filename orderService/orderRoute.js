const express = require('express');
const { createOrder } = require('./orderController');

const orderRoute = express();

orderRoute.post('/add',createOrder);

module.exports = orderRoute;