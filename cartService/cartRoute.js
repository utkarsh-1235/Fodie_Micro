const express = require('express');
const {CreateCart, getUserCart, DeleteCart, DeleteItemsFromCart} = require('./cartController')

const cartRoute = express();

cartRoute.post('/createCart',CreateCart);
cartRoute.get('/:userId',getUserCart);
cartRoute.post('/delete',DeleteItemsFromCart);


module.exports = cartRoute;