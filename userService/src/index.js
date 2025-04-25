const express = require('express');
require('dotenv').config();
const dbConnect = require('./db');
const SignUpRoute = require('./SignUpRoute');
const logoutRoute = require('./logoutRoute');
const LoginRoute = require('./LoginRoute');
const addressRoute = require('./AddressRoute');
const SignUp = require('./SignUpRoute');
const morgan = require('morgan');
const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api/users',SignUp);
app.use('/api/users',LoginRoute);
app.use('/api/users',addressRoute);
app.use('/api/users',logoutRoute);
app.listen(Port,async(req,res)=>{
    console.log(`User Service is running on ${Port}`);
    await dbConnect();
});