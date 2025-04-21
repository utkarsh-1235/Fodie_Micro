const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URL = process.env.mongodb_uri;

const dbConnect = ()=>{
    mongoose.connect(MONGODB_URL)
            .then((conn)=> console.log(`Database connected for payment service succesfully ${conn.connection.host}`))
            .catch((err)=>console.log(`Error ${err}`))
}

module.exports = dbConnect;
