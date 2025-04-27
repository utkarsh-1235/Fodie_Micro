const express = require('express');
const { verifyUserLoggedIn } = require('./Middleware/Auth.Middleware');
const authRoute = express.Router();
const User = require('./userSchema');
const axios = require('axios');

authRoute.get('/getUser', verifyUserLoggedIn,async(req, res)=>{
    try{
        const userId = req.user._id;

        if(!userId){
            return res.status(402).json('Please provide a valid user id');
        }
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(403).json('User not found');
        }

        res.status(200).json({
            success: true,
            user
        });

    }
    catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
})

module.exports = authRoute;
