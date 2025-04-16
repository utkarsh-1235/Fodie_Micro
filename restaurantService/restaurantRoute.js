const express = require('express');
const { addRestaurant, getAllRestaurant, getRestaurantsById } = require('./restaurantController');

const restaurantRoute = express();

restaurantRoute.post('/add',addRestaurant);
restaurantRoute.get('/all',getAllRestaurant);
restaurantRoute.get('/:restaurantId', getRestaurantsById);

restaurantRoute.post('/events',(req,res)=>{
    console.log('Recieved events', req.body);
    res.status(200).send({ message: 'Event received successfully' });
})

module.exports = restaurantRoute;