const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(Port, (req, res)=>{
    console.log(`Payment Service is running on port ${Port}`);
})