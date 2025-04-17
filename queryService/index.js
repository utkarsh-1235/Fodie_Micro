const bodyParser = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const app = express();
const Port = process.env.PORT;

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]
})

const orderSchema = new mongoose.Schema({
    _id: String,
    userId: String,
    dishes: [String],
    status: String,
})

const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

app.use(express.json({}));
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(process.env.mongodb_uri)
        .then((conn)=> console.log(`Database connected to query service ${conn.connection.host}`))
        .catch(err=>console.log(`ERROR ${err}`))


app.post('/events', async(req, res)=>{
    console.log(req.body);
   const {type, data} = req.body;
   const{_id, ...userWithoutId} = data.user;

   if(type === 'UserApproved'){
    await User.findOneAndUpdate({
        email: data.user.email
    },
      {$set: userWithoutId},
    {upsert: true, new: true})
   }
})
app.listen(Port,()=>{
    console.log(`Query Service is running on port ${Port}`);
})