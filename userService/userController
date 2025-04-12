const User = require('./userSchema');

const cookieOption = {
    maxAge: 7*24*60*60*1000, //7days
    httpOnly: true,
    secure: true
}
const signUp = async(req, res)=>{
    try{
        
        const {name, email, password} = req.body;
        
        console.log(name,email, password);

        if(!name || !email || !password){
           return res.status(401).json('Every Field is required');
        }

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(403).json('Email already exist');
        }
        
        const user = await User.create({
            name: name,
            email: email,
            password: password
        })
           

        
        if(!user){
            return res.status(400).json('User registration failed, please try again')
          }
         
          await user.save();

          user.password = undefined;
          const token = await user.jwtToken();
          res.cookie('token', token, cookieOption)

          res.status(200).json({
            status: true,
            message: 'Successfully register the user',
            token: token,
            user,
          })
    }
    catch(err){
        
        res.status(500).json({
            error: err.message
        })
    }
}

const login = async(req,res)=>{
    try{

        const {email, password} = req.body;
         console.log(email, password)
        if(!email || !password){
            return res.status(401).json('Every Field is required');
        }
    
        const user = await User.findOne({email}).select('+password');

    
        if(!user){
                return res.status(403).json("Account doesn't exist with this email")
        }
    
        const token = await user.jwtToken();
    
        res.cookie('token',token,cookieOption);
        res.status(200).json({
            status: true,
            message: 'User Loggedin Successfully',
            token: token,
            user
        })
    }
    catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}

const addAddress = async(req, res)=>{
    try{
        console.log(req.body);
        const {state, dist, city, pin, address, phoneNumber} = req.body.address;
        const userId = req.body.userId;
    
        if(!userId || !state || !dist || !pin || !address){
            return res.status(400).json('All fields are required');
        }
    
        // const user = await userModel.findByIdAndUpdate(
        //                            userId,
        //                            {$push: { address: address} });
        const user = await userModel.findById(userId);
         if(!user){
            return res.status(401).json('User Not Found');
         }
        
         user.address.push({
            phoneNumber: phoneNumber,
            state: state,
            district: dist,
            pinCode: pin,
            city: city,
            address: address
         })
         
         await user.save();
         res.status(200).json({
            status: true,
            message: `Address added successfully ${user.name}`,
            user
         })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {signUp,
                  login,
                  addAddress
};
