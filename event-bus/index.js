const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.post('/events', async(req, res)=>{
  console.log(req.body);
  const event = req.body;
  
  try {
    await axios.post('http://localhost:3001/api/users/events', event);
    console.log('Event sent to User Service');
  } catch (error) {
    console.error('Error sending to User Service:', error.message);
  }
//    axios.post('http://localhost:3002/events', event);
//    axios.post('http://localhost:3003/events', event);
//    axios.post('http://localhost:3004/events', event);
//    axios.post('http://localhost:3005/events', event);
  

   res.send({status: 'OK'})
})
app.listen(Port, (req, res)=>{
    console.log(`Event is Running on Port ${Port}`);
})
