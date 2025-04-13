const CartModel = require('../cartService/cartSchema');
const DishModel = require('../dishService/dishSchema');
const Restaurantmodel = require('../restaurantService/restaurantSchema');
const userModel = require('../userService/userSchema');

const CreateCart = async(req, res)=>{
    try{
        console.log(req.body);
        const cartData = req.body.cartData.cartData;
        const {userId,items, totalPrice, totalItems} = cartData;
        
        items.map(item => console.log(item));
        
    //  console.log(userId, totalPrice,items, totalItems)
    // console.log('items', items);

     if(!userId || !items || items.length === 0 ){
        return res.status(401).json('All  the fields are required');
    }

    const user = await userModel.findById(userId);
    // console.log('user',user);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    let existingCart = await CartModel.findOne({'user.email':user.email});
    //  console.log('existing cart',existingCart);
    const dishIds = items.map((item)=>item.dishId);
    // console.log('DishIds',dishIds);

    
    const dishes = await DishModel.find({_id: {$in: dishIds}});
    // const dishes = await Promise.all(dishIds.map(async(dishId)=> await DishModel.findById(dishId)));
    console.log('Fetching Dishes',dishes);

    if (!dishes || dishes.length === 0) {
        return res.status(402).json({ success: false, message: "Dishes not found" });
    }


    const formattedItems = items.map(item => {
        const dish = dishes.find(d=>d._id.toString() === item.dishId.toString());
        console.log('dish', dish);
        if (!dish) {
            console.log(`Dish not found for ID: ${item.dishId}`); // Debugging log
            return null; // Skip missing dishes
        }
        return{
            dish:{
                dishId: dish._id,
                name: dish.name,
                image: dish.img,
                price: dish.price
            },
            quantity: item.qty
        }
    }).filter(item => item !== null);
   
    if (formattedItems.length === 0) {
        return res.status(400).json({ success: false, message: "No valid items found" });
    }

    console.log('FormattedItems',formattedItems);

    if(existingCart !== null && existingCart?.items.length !== 0){
        console.log('length', existingCart.items.length);
        formattedItems.forEach(newItem => {
            const existingItem = existingCart.items.find((item)=>item.dish.dishId.toString() === newItem.dish.dishId.toString())
            if(existingItem){
                // existingItem.quantity += newItem.quantity;
                existingItem.quantity = newItem.quantity;
            }else{
              existingCart.items.push(newItem) ;
            }
        })
            // existingCart.items.push(...formattedItems);
            // existingCart.totalitems += totalItems;
            // existingCart.totalPrice += totalPrice;
        }else if(existingCart !== null && existingCart.items.length === 0){
            existingCart.items = formattedItems.map((item)=>({
                dish: {
                    dishId: item.dish.dishId,
                    name: item.dish.name,
                    image: item.dish.image,
                    price: item.dish.price
                },
                quantity: item.quantity

        }))
        existingCart.totalitems = totalItems          //existingCart.items.reduce((t, i) => t + i.quantity, 0);
        existingCart.totalPrice = totalPrice          //existingCart.items.reduce((t, i) => t + (i.quantity * i.dish.price), 0);
        
        console.log('updated existing Cart',existingCart)
        }
        else{
            
            existingCart = new CartModel({
                user: { name: user.name, email: user.email },
                items: formattedItems,      
                totalitems: formattedItems.reduce((t, i) => t + i.quantity, 0),
                totalPrice: formattedItems.reduce((t, i) => t + (i.quantity * i.dish.price), 0)
            });
        }
        existingCart.totalitems = totalItems //existingCart.items.reduce((t, i) => t + i.quantity, 0);
        existingCart.totalPrice = totalPrice           //existingCart.items.reduce((t, i) => t + (i.quantity * i.dish.price), 0);
        console.log('Updating existing cart',existingCart);

        await existingCart.save();

                res.status(200).json({
                    success: true,
                    message: "Cart created successfully",
                    cart: existingCart
                })

        }

    catch(err){
        console.log(err);
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}


const getUserCart = async(req, res)=>{
    try{
      const {userId} = req.params;   

      if(!userId){
        return res.status(401).json('Please send any User for getting Cart details')
      }
     
      const user = await userModel.findById(userId);

      if(!user){
        return res.status(403).json('User not found');
      }

      const carts = await CartModel.findOne({'user.email': user.email}).lean();
      console.log(carts.items);
      if(!carts){
        return res.status(402).json('Please Create Cart for this user no carts found');
      }
    
      res.status(200).json({
        status: true,
        cartItems: Array.isArray(carts.items) ? carts.items : [],
      })
    }catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

const DeleteItemsFromCart = async(req, res)=>{
    try{
        console.log(req.body);
        const {id, userId} = req.body.item;

        if(!id || !userId){
            return res.status(400).json('Item not selected');
        }
        
        const user = await userModel.findById(userId);

        if(!user){
            return res.status(401).json('User Not Found');
        }
        const updatedCart = await CartModel.findOneAndUpdate(
                                    {'user.email': user.email},
                                     { $pull: {items: {_id: id}}},
                                    { new: true});

                if(!updatedCart){
                    return res.status(402).json('Cart not found');
                }
        console.log(updatedCart);
        res.status(200).json({
            success: true,
            message: 'Item removed successfully',
            cartItems: Array.isArray(updatedCart.items) ? updatedCart.items : [],

        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

}

const DeleteCart = async(req, res)=>{
    try{
        console.log(req.body);
        const {items, UserId} = req.body.data;

      if(!items || !Array.isArray(items) || items.length === 0|| !UserId){
        return res.status(400).json('Items and Carty Required');
      }

    const user = await userModel.findById(UserId);
    if(!user){
        return res.status(401).json('User Not Found');
    }

    const existingCart = await CartModel.findOne({'user.email': user.email});
    if(!existingCart){
        return res.status(402).json('Cart does not exist');
    }

    const initialItems = existingCart.items.length;
    
    console.log("Existing Cart Items:", existingCart.items);
existingCart.items.forEach(item => {
    if (!item.dish || !item.dish._id) {
        console.error("Invalid item detected:", item);
    }
});

    existingCart.items = existingCart.items.filter(CartItem => CartItem.dish && CartItem.dish._id && !items.includes(CartItem.dish._id.toString()));

    if(existingCart.items.length === initialItems){
        return res.status(403).json('Items Match not found in Cart');
    }

    existingCart.totalitems = existingCart.items.reduce(
        (total, item) => total + item.quantity, 
        0
    );
    existingCart.totalPrice = existingCart.items.reduce(
        (total, item) => total + (item.quantity * item.dish.price), 
        0
    );

    const validationError = existingCart.validateSync();

    if(validationError){
        throw new Error(validationError.message);
    }
  await existingCart.save();
  res.status(200).json({
    success: true,
    message: 'Items removed successfully',
    cart: existingCart
  })
    }catch(err){
        console.log(err);
      res.status(500).json({
        success: false,
        message: err.message
      })
    }
}
    
module.exports = {CreateCart,
                  getUserCart,
                  DeleteItemsFromCart,
                  DeleteCart
};