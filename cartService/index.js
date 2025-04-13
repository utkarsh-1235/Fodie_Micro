const express = require('express');
const dbConnect = require('./db');
const cartRoute = require('./cartRoute');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/carts', cartRoute)

app.listen(Port, async(req, res)=>{
    console.log(`Cart Service is running on ${Port}`);
    await dbConnect();
})