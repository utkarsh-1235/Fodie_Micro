const express = require('express');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;

app.listen(Port, (req, res)=>{
    console.log(`Cart Service is running on ${Port}`);
})