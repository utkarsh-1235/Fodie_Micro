const express = require('express'); 
require('dotenv').config();
const dbConnect = require('./db');
const restaurantRoute = require('./restaurantRoute');
const bodyParser = require('body-parser');

const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/restaurants',restaurantRoute);

app.listen(Port, async(req,res)=>{
  console.log(`Restaurant Service is running on ${Port}`);
  await dbConnect();
})