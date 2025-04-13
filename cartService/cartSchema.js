const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const CartSchema = new Schema({
    // dishId:{
    //      type: String,
    //      required: true
    // },
    
    user:{
        name:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        }
     },
    items:[{
        dish: {
            dishId:{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Dish',
              required: true
            },
           name:{
            type: String,
            required: true
           },
           image:{
            type: String,
            required: true
           },
           price:{
            type: Number,
            required: true
          }
          },
          quantity:{
            type: Number,
            required: true
          },
          
    }],
    // restaurants:[{
    //     restaurant: {
    //         name:{
    //             type: String,
    //             required: true
    //         },

    //         email: {
    //             type: String,
    //             required: true,
    //             match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'please fill a valid email address']
    //         }
    //     }
    // }],
    status:{
        type: String,
        enum: ['Pending', 'Processing', 'Delivered'],
        default: 'Pending'
    },
    totalPrice:{
        type: Number
    },
    totalitems:{
        type: Number
    },
    added:{
        type: Date,
        default: Date.now
    }
})

const CartModel = model('cart',CartSchema);
module.exports = CartModel;