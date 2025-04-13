const express = require('express');
const dbConnect = require('./db');
const dishRoute = require('./dishRoute');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('api/dishservice',dishRoute);
app.listen(Port, async(req, res)=>{
    console.log(`Dish Service is running on ${Port}`);
    await dbConnect();
});
