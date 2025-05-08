const express = require('express');
const { verifyUserLoggedIn } = require('./Middleware/userAuth');
const orderModel = require('./orderSchema');
const orderRoute = express();

orderRoute.patch('update/:id', verifyUserLoggedIn, async(req, res)=>{
    try{
        const orderId = req.params.id;
        const status = req.body.status;

        if(!orderId || !status){
            return res.status(400).json('please send all details');
        }
  
        const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status value' });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
                             orderId,
                            {
                                status: status,
                                updatedAt: date.now()
                            },
                            { new: true}
                            );
                            if (!updatedOrder) {
                                return res.status(404).json({ success: false, message: 'Order not found' });
                            }
                    
                            res.status(200).json({
                                success: true,
                                message: 'Order status updated successfully',
                                order: updatedOrder
                            })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})