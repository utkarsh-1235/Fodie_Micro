const express = require('express'); 
const dbConnect = require('./db');
const orderRoute = require('./CreateorderRoute');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const {trusted} = require('mongoose');
const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(cookieSession({
    signed: false,
    secure: trusted
}));
app.use(bodyParser.json());

app.use('/api/orders',orderRoute);


app.listen(Port, async(req,res)=>{
  console.log(`Order Service is running on ${Port}`);
  await dbConnect();
})