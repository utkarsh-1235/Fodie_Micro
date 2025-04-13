const DishModel = require('../dishService/dishSchema');
const Restaurantmodel = require('../restaurantService/restaurantSchema');

const getAllDish = async(req,res)=>{
    try{
        
        const dishes = await DishModel.find().populate('restaurants').exec();
                            
        // console.log('Dishes',dishes);

        res.status(200).json({
            success: true,
            data: dishes
        })

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