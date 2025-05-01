const express = require('express');
const { createOrder } = require('./orderController');

const orderRoute = express();

orderRoute.post('/add', async(req,res)=>{
    try{
        console.log(req.body);
        const userId = req.body.user;
        const Items = req.body.items;
 
        console.log(userId, Items);
        if(!userId || !Items || Items.length === 0 ){
            return res.status(400).json('Please send Necessary details');
        }

        const user = await userModel.findById(userId);
        if(!user){
            return res.status(401).json('User Not found');
        }

        const newOrder = new orderModel({
            user: {
                userId: userId,
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