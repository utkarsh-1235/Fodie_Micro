const orderModel = require('./orderSchema');
const userModel = require('../userService/userSchema');

const createOrder = async(req,res)=>{
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
}

const getUserOrder = async(req, res)=>{
   try{
    const {userId}= req.body.userId;

    if(!userId){
        return res.status(400).json('User id required');
    }

    const orders = await orderModel.find({'user.userId': userId}).populate('items.dish', 'name price image');

    if(orders.length === 0){
        return res.status(401).json('No Orders found please order something');
    }

    return res.status(200).json({
        succes: true,
        message: 'Orders fetched succesfully',
        Orders: Array.isArray(orders) ? orders : []
    })

   }catch(err){
    res.status(500).json({
        success: false,
        message: err.message
    })
   }
}

module.exports = {
                   createOrder,
                   getUserOrder
}