const DishModel = require('./dishSchema');
// const Restaurantmodel = require('../restaurantService/restaurantSchema');
const axios = require('axios');

const getAllDish = async(req,res)=>{
    try{
        
        const dishes = await DishModel.find().exec();

        const dishWithRestaurant = await Promise.all(
            dishes.map(async(dish)=>{
                let restaurant = null;
                try{
                    const response = await axios.get(`http://localhost:3004/api/restaurants/${dish.restaurantId}`);
                    restaurant = response.data;

                }
                catch(err){
                    console.log('Error in fetching restaurant',err);
                }
            }))
                            
        // console.log('Dishes',dishes);
        await axios.post('http://localhost:3006/events',{
            type: 'dish fetched',
            data: dishWithRestaurant
        })

        // res.status(200).json({
        //     success: true,
        //     data: dishes
        // })

    }catch(err){
        console.log('Error',err);
        return res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

module.exports = {
    getAllDish
}