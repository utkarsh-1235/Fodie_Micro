const express = require('express');
const authRoute = express.Router();

const User = require('./userSchema');
const axios = require('axios');

const cookieOption = {
  maxAge: 7*24*60*60*1000, //7days
  httpOnly: true,
  secure: true
}

authRoute.post('/register', async(req, res)=>{
    try{
        
        const {name, email, password} = req.body;
        
        console.log(name,email, password);

        if(!name || !email || !password){
           return res.status(401).json('Every Field is required');
        }

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(403).json('Email already exist');
        }
        
        const user = await User.create({
            name: name,
            email: email,
            password: password
        })
           

        
        if(!user){
            return res.status(400).json('User registration failed, please try again')
          }
         
          // await user.save();

          user.password = undefined;
          const token = await user.jwtToken();
          res.cookie('token', token, cookieOption)

        
        //   await axios.post('http://localhost:3006/events',{
        //     type: 'UserCreated',
        //     data: user
        //  })
         res.status(200).json({
          success: true,
          data: user
         })
    }
    catch(err){
        
        res.status(500).json({
            error: err.message
        })
    }
});


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
