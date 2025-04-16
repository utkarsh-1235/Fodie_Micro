const {Schema, model} = require('mongoose');

const RestaurantSchema = new Schema({
   name:{
    type: String,
    required: true
   },
   address:{
    type: String,
    required: true
   },
   email:{
     type: String,
     required: true,
     match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'please fill a valid email address']
   },
   description:{
    type: String,
    required: true
   },
   phoneNumber:{
     type: String,
     required: true,
     maxLength: 10
    //  match: [/^\d{3}-\d{3}-\d{4}$/, 'Please fill a valid phone number (XXX-XXX-XXXX)']
   },
   cuisineType: {
      type: String,
      required: true
   },
   image:{
    type: String,
    required: true
   },
//    paymenOptions:{
//       type: [String],
//       required: true,
//       enum: ['Cash on delivery', 'Credit', 'Online Payment'],
//       default: 'Online Payment'
//    },
   hoursOfOperation:{
      type: String,
      
   },
   items:[
    {
        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish',
            
        }
    }
   ],
   review:[
    {
        rating:{
            type: Number,
            min: 1,
            max: 5
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
   ]
},{
    timestamps: true
})

const Restaurantmodel = model('Restaurants',RestaurantSchema);
module.exports = Restaurantmodel;