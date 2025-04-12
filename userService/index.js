const express = require('express');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;
app.listen(Port,()=>{
    console.log(`User Service is running on ${Port}`);
});