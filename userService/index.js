const express = require('express');
require('dotenv').config();
const dbConnect = require('./db');
const userRoute = require('./userRoute');
const morgan = require('morgan');
const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api/users',userRoute);
app.listen(Port,async(req,res)=>{
    console.log(`User Service is running on ${Port}`);
    await dbConnect();
});