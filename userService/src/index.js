const express = require('express');
require('dotenv').config();
const dbConnect = require('./db');
const getUserRoute = require('./getUserRoute');
const SignUpRoute = require('./SignUpRoute');
const logoutRoute = require('./logoutRoute');
const LoginRoute = require('./LoginRoute');
const addressRoute = require('./AddressRoute');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { trusted } = require('mongoose');
const app = express();
const Port = process.env.PORT;

app.set('trust proxy', true); // trust first proxy
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(cookieSession({
    signed: false,
    secure: trusted
}));
app.use('/api/users',SignUpRoute);
app.use('/api/users',LoginRoute);
app.use('/api/users',addressRoute);
app.use('/api/users',logoutRoute);
app.use('/api/users', getUserRoute);

app.listen(Port,async(req,res)=>{
    console.log(`User Service is running on ${Port}`);
    await dbConnect();
});