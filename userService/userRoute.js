const express = require('express');
const authRoute = express();

const {signUp, login, addAddress} = require('./userController');

authRoute.post('/register',signUp);
authRoute.post('/login',login);
authRoute.post('/addAddress',addAddress);
authRoute.post('/events', (req, res) => {
    console.log('Received Event:', req.body);
    // You can process the event here
    res.status(200).send({ message: 'Event received successfully' });
  });

module.exports = authRoute;
