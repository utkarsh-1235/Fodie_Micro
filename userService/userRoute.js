const express = require('express');
const authRoute = express();

const {signUp, login, addAddress} = require('./userController');

authRoute.post('/register',signUp);
authRoute.post('/login',login);
authRoute.post('/addAddress',addAddress);

module.exports = authRoute;
