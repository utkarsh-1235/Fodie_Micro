const express = require('express');
const {CreateCart, getUserCart, DeleteCart, DeleteItemsFromCart} = require('./cartController')

const cartRoute = express();

cartRoute.post('/createCart',CreateCart);
cartRoute.get('/:userId',getUserCart);
cartRoute.post('/delete',DeleteItemsFromCart);

cartRoute.post('/events',(req, res)=>{
    console.log('Received Event:', req.body);
    // You can process the event here
    res.status(200).send({ message: 'Event received successfully' });
})

module.exports = cartRoute;