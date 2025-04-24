const express = require('express');
require('dotenv').config();
const dbConnect = require('./src/db');
const SignUpRpoute = require('./src/SignUpRoute');
const LoginRoute = require('./src/LoginRoute');
const addressRoute = require('./src/AddressRoute');
const SignUp = require('./src/SignUpRoute');
const morgan = require('morgan');
const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api/users',SignUp);
app.use('/api/users',LoginRoute);
app.use('/api/users',addressRoute);
app.listen(Port,async(req,res)=>{
    console.log(`User Service is running on ${Port}`);
    await dbConnect();
});