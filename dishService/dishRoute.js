const express = require('express');

const {getAllDish} = require('./dishController');
const dishRoute = express();

dishRoute.get('/all',getAllDish);
dishRoute.post('/events', (req, res)=>{
    console.log('Recieved events', req.body);
    res.status(200).send({ message: 'Event received successfully' });
})
module.exports = dishRoute;