const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URL = process.env.mongodb_uri;

const dbConnect = ()=>{
    mongoose.connect(MONGODB_URL)
            .then((conn)=> console.log(`Database connected successfully for restaurant service ${conn.connection.host}`))
            .catch((err)=>{console.error(`Error ${err}`)})
}

module.exports = dbConnect;