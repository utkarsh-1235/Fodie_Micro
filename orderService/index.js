const express = require('express'); 
const dbConnect = require('./db');
const orderRoute = require('./orderRoute');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/orderservice',orderRoute);

app.listen(Port, async(req,res)=>{
  console.log(`Order Service is running on ${Port}`);
  await dbConnect();
})