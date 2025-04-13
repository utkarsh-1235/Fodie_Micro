const express = require('express');
const { addRestaurant, getAllRestaurant } = require('./restaurantController');

const restaurantRoute = express();

restaurantRoute.post('/add',addRestaurant);
restaurantRoute.get('/all',getAllRestaurant);

module.exports = restaurantRoute;