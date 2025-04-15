const express = require('express');
const { addRestaurant, getAllRestaurant, getRestaurantsById } = require('./restaurantController');

const restaurantRoute = express();

restaurantRoute.post('/add',addRestaurant);
restaurantRoute.get('/all',getAllRestaurant);
restaurantRoute.get('/:restaurantId', getRestaurantsById);

module.exports = restaurantRoute;