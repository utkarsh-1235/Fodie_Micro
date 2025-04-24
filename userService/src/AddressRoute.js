const express = require('express');
const authRoute = express.Router();
const User = require('./userSchema');
const axios = require('axios');

authRoute.post('/addAddress', async(req, res)=>{
    try{
        console.log(req.body);
        const {state, dist, city, pin, address, phoneNumber} = req.body.address;
        const userId = req.body.userId;
    
        if(!userId || !state || !dist || !pin || !address){
            return res.status(400).json('All fields are required');
        }
    
        // const user = await userModel.findByIdAndUpdate(
        //                            userId,
        //                            {$push: { address: address} });
        const user = await User.findById(userId);
         if(!user){
            return res.status(401).json('User Not Found');
         }
        
         user.address.push({
            phoneNumber: phoneNumber,
            state: state,
            district: dist,
            pinCode: pin,
            city: city,
            address: address
         })
         
         await user.save();

         await axios.post('http://localhost:3006/events',{
                     type: 'AddressAdded',
                     data: {
                        phoneNumber: phoneNumber,
                        state: state,
                        district: dist,
                        pinCode: pin,
                        city: city,
                        address: address,
                         timestamps: new Date().toISOString()
                     }
                 })
       
         res.status(200).json({
            status: true,
            message: `Address added successfully ${user.name}`,
            user
         })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = authRoute;