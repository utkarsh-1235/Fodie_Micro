const express = require('express');
const dbConnect = require('./db');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;

app.listen(Port, async(req, res)=>{
    console.log(`Dish Service is running on ${Port}`);
    await dbConnect();
});
