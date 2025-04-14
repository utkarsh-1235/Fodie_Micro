const express = require('express');
require('dotenv').config();
const app = express();
const Port = process.env.PORT;

app.listen(Port,()=>{
    console.log(`Query Service is running on port ${Port}`);
})