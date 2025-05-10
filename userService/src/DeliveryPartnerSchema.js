const {Schema, model} = require('mongoose');

const DeliverySchema = new Schema({
    name:{
        type: String,
        required: [true, 'user name is required'],
        minLength: [5, 'user name must be atleast 5 characters'],
        maxLength: [50, 'user name must be maximum 50 characters'],
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        required: [true, 'user email is required'],
        unique: true,
        lowercase: true,
        unique: [true, 'already registerd'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
          ]
    },
    password:{
        type: String,
        required: [true, 'password is required'],
        minLength:[8, 'password must be at least 8 characters'],
        select: false,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    }, 
    vehicles: [{
       vehicleType: {
        type: String,
        required: true
       },
       vehicleNumber: {
        type: String, 
        required: true,
        unique: true
       }
    }],
    documents: {
        idProof: {
            type: String
        },
       drivingLicense: {
        type: String,
        required: true
    },
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

const deliveryModel = model('delivery', DeliverySchema);
module.exports = deliveryModel;