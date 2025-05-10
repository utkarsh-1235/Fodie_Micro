const {Schema, model} = require('mongoose');

const ownerSchema = new Schema({
    name:{
        type: String,
        required: [true, 'owner name is required'],
        minLength: [5, 'owner name must be atleast 5 characters'],
        maxLength: [50, 'owner name must be maximum 50 characters'],
        trim: true,
        lowercase: true
    },
    email:{
        type: String,
        required: [true, 'owner email is required'],
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
    restaurantId: [
        {
            type: String,
            required: true,
            unique: true
        }
    ],
    documents: {
        fssaiLicense: String,
        gstNumber: String
      },
      isVerified: Boolean,
      isActive: Boolean
    
  
},{
    timestamps: true
})

const ownermodel = model('owner', ownerSchema);
module.expoerts = ownermodel;