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

  try{
    await axios.post('http://localhost:3008/events', event);
    console.log('Event sent to Moderation Service', event)
  }catch(error){
    console.error('Error sending to Moderation Service:', error.message);
  }
  
  try {
    await axios.post('http://localhost:3001/api/users/events', event);
    console.log('Event sent to User Service', event);
  } catch (error) {
    console.error('Error sending to User Service:', error.message);
  }
  try{
    await axios.post('http://localhost:3007/events', event);
    console.log('Event sent to Query Service', event)
  }catch(error){
    console.error('Error sending to Query Service:', error.message);
  }

//   try {
//     await axios.post('http://localhost:3005/api/dishes/events', event);
//     console.log('Event sent to Dish Service');
//   } catch (error) {
//     console.error('Error sending to Dish Service:', error.message);
//   }

//   try{
//     await axios.post('http://localhost:3002/api/carts/events', event);
//     console.log('Event sent to Cart Service')
//   }catch(error){
//     console.error('Error sending to Cart Service:', error.message);
//   }

//   try{
//     await axios.post('http://localhost:3003/api/orders/events', event);
//     console.log('Event sent to Order Service')
//   }catch(error){
//     console.error('Error sending to Order Service:', error.message);
//   }

//   try{
//     await axios.post('http://localhost:3004/api/restaurants/events', event);
//     console.log('Event sent to Restaurant Service')
//   }catch(error){
//     console.error('Error sending to Restaurant Service:', error.message);
//   }

  
//    axios.post('http://localhost:3002/events', event);
//    axios.post('http://localhost:3003/events', event);
//    axios.post('http://localhost:3004/events', event);
//    axios.post('http://localhost:3005/events', event);
  

   res.send({status: 'OK'})
})
app.listen(Port, (req, res)=>{
    console.log(`Event is Running on Port ${Port}`);
})
