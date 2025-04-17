const express = require('express');
const authRoute = express();

const {signUp, login, addAddress} = require('./userController');
const userModel = require('./userSchema');

authRoute.post('/register',signUp);
authRoute.post('/login',login);
authRoute.post('/addAddress',addAddress);

authRoute.post('/events', async(req, res) => {
    console.log('Received Event:', req.body);
    const {type, data} = req.body;

    if(type === 'UserRejected'){
        await userModel.findByIdAndDelete(data.userId);
        console.log(`User ${data.userId} rejected: ${data.reason}`);
    }
    if (type === 'UserApproved') {
        console.log(`User ${data.user._id} approved`);
      }
    // You can process the event here
    res.status(200).send({ message: 'Event received successfully' });
  });

module.exports = authRoute;
