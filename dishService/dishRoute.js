const express = require('express');

const {getAllDish} = require('./dishController');
const dishRoute = express();

dishRoute.get('/all',getAllDish);
module.exports = dishRoute;