const express = require('express');
const dbConnect = require('./db');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(Port, async(req, res)=>{
    console.log(`Cart Service is running on ${Port}`);
    await dbConnect();
})