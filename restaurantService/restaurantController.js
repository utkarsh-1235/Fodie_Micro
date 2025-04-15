const RestaurantModel = require('./restaurantSchema');

const addRestaurant = async(req, res)=>{
    try{
    
        const{name, email, address, phoneNumber, description, cuisine, img} = req.body.restaurant;
        // const userId = req.body.userid;
        

        console.log(name,cuisine,address, email, phoneNumber, description)

        if(!name || !email || !address || !phoneNumber || !cuisine || !img || !description){
            return res.status(401).json("All fields are required");
        }

        const existingRestaurant = await RestaurantModel.findOne({name, address, email});

        if(existingRestaurant){
            return res.status(402).json("Restaurant already exist");
        }
          
        const restaurant = await RestaurantModel.create({
            name ,
            address  ,
            email ,
            description ,
            phoneNumber ,
            cuisineType: cuisine,
            image : img,

        })
        
        console.log(restaurant);

        res.status(200).json({
            success: true,
            data: restaurant
        })


    }catch(err){
        

        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getAllRestaurant = async(req,res)=>{
    try{
        const restaurants = await RestaurantModel.find();
        if(!restaurants){
            return res.status(401).json('There is no any single restaurant');
        }
         console.log(restaurants);
        res.status(200).json({
            success: true,
            data: restaurants
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getRestaurantsById = async(req, res)=>{
    try{
        const restaurantId = req.params.restaurantId;
        const restaurant = await RestaurantModel.findById(restaurantId);
        if(!restaurant){
            return res.status(401).json('Restaurant Not found')
        }
        res. status(200).json(restaurant);

    }catch(err){
        console.error("Error fetching restaurant:", err);
        res.status(500).json({
            status: false ,
            message: err.message
        })
    }
}

module.exports = {addRestaurant,
                  getAllRestaurant,
                  getRestaurantsById
};