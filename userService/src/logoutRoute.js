const express = require('express');
const authRoute = express.Router();

authRoute.post('/logout', async(req, res)=>{
    try{
        res.clearCookie('token');
        res.status(200).json({
            status: true,
            message: 'Logout successfully'
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = authRoute;