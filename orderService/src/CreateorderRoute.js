const express = require('express');
const { verifyUserLoggedIn } = require('./Middleware/userAuth');
const axios = require('axios');

const orderRoute = express();

orderRoute.post('/add', verifyUserLoggedIn, async(req,res)=>{
    try{
        console.log(req.body);
        const user = req.user;
        const Items = req.body.items;
 
        console.log(user, Items);
        if(!user || !Items || Items.length === 0 ){
            return res.status(400).json('Please send Necessary details');
        }

        // const user = await userModel.findById(userId);
        // if(!user){
        //     return res.status(401).json('User Not found');
        // }

        const newOrder = new orderModel({
            user: {
                userId: user.id,
                name: user.name,
                email: user.email
            },
            items: Items.map((item)=>({
                dish:{
                dishId: item.dishId,
                name: item.name,
                image: item.image,
                price: item.price
            }})),
            // totalPrice: totalPrice,

        })
        await newOrder.save();

          await axios.post('http://localhost:3006/events',{
                    type: 'orderCreated',
                    data: newOrder
                 })
                 
        
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});

orderRoute.post('/events',(req, res)=>{
    console.log('Recieved events', req.body);
    res.status(200).send({ message: 'Event received successfully' });
})

module.exports = orderRoute;