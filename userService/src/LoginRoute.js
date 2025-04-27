const express = require('express');

const authRoute = express.Router();
const User = require('./userSchema');
const axios = require('axios');

const cookieOption = {
    maxAge: 7*24*60*60*1000, //7days
    httpOnly: true,
    secure: true
  }

authRoute.post('/login', async(req,res)=>{
    try{

        const {email, password} = req.body;
         console.log(email, password)
        if(!email || !password){
            return res.status(402).json('Every Field is required');
        }
    
        const user = await User.findOne({email}).select('+password');
          console.log(user);
    
        if(!user){
                return res.status(403).json("Account doesn't exist with this email")
        }
    
        const token = await user.jwtToken();
        console.log(token);
    
        res.cookie('token',token,cookieOption);

        // await axios.post('http://localhost:3006/events',{
        //     type: 'UserLoggedIn',
        //     data: {
        //         userId: user._id,
        //         timestamps: new Date().toISOString()
        //     }
        // })
        res.status(200).json({
            status: true,
            message: 'User Loggedin Successfully',
            token: token,
            user
        })
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({
            error: err.message
        })
    }
});

module.exports = authRoute;