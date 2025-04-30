const orderModel = require('./orderSchema');
const userModel = require('../userService/userSchema');



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
                   getUserOrder
}