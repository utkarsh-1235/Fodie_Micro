const JWT = require('jsonwebtoken');

const verifyUserLoggedIn = (req, res, next)=>{
    const token = req.cookies.token;

    console.log(token);
    if(!token){
        return res.status(401).json({message: 'Unauthorized, no token provided'});
    }

    try{
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email
        };
        console.log(decoded);
        next();
    }catch(err){
        return res.status(400).json({message: 'Unauthorized, invalid token'});
    }
}

module.exports = {verifyUserLoggedIn};