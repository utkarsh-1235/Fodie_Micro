const express = require('express');
const { createOrder } = require('./orderController');

const orderRoute = express();

orderRoute.post('/add',createOrder);
orderRoute.post('/events',(req, res)=>{
    console.log('Recieved events', req.body);
    res.status(200).send({ message: 'Event received successfully' });
})

module.exports = orderRoute;