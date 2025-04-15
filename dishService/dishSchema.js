const {model, Schema} = require('mongoose');

const DishSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    rating:{
        type: Schema.Types.ObjectId,
        ref: 'Reviewrating'
    },
    // restaurants:[
    //     {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Restaurants'
    //     }
    // ]

    restaurantId: {
        type: Schema.Types.ObjectId,
        required: true
    }
},{
    timestamps: true
})

const DishModel = model('Dishes', DishSchema);
module.exports = DishModel;