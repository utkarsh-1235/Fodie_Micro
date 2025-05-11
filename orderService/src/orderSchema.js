const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const orderSchema = new Schema({
  user: {
    userId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address:{
        type: String,
        
    }
   
  },
  items: [
    {
        dishId: {
          type: String,
          required: true
        }
    }
  ],
  totalPrice: {
     type: Number,
     required: true
  },
  totalItems: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
},{
    timestamps: true
})

const orderModel = model('Order',orderSchema);
module.exports = orderModel;