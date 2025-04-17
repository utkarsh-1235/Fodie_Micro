const  axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

const containsProfanity = (text)=>{
    const bannedNames = ['white', 'black'];
    return bannedNames.some((word)=>text.toLowerCase().includes(word));
}

app.post('/events',async(req, res)=>{
    console.log(req.body);
  const {type, data} = req.body;
  
  if (type === 'UserCreated') {
    const validUserName = !containsProfanity(data.name);
    
    if (!validUserName) {
      await axios.post('http://localhost:3006/events', {
        type: 'UserRejected',
        data: { userId: data._id, reason: 'Profanity in name' }
      });
    } else {
      await axios.post('http://localhost:3006/events', {
        type: 'UserApproved',
        data: { user: data }
      });
    }
  }
  res.send({ status: 'OK' });
})

app.listen(Port, (req, res)=>{
  console.log(`Moderation service is running on port ${Port}`);
})