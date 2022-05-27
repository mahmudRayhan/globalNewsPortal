const jwt = require('jsonwebtoken');
const User=require('../models/SignUpModel.js')

module.exports=  async function(req,res,next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send('Access_Denied');
    }

    try{
        const verifiedUser = jwt.verify(token,process.env.TOKEN_SECRET)
        console.log(verifiedUser)

        const user  = await User.findOne({_id:verifiedUser.id})
        console.log( user)
        req.token=token;
        req.user= user;
        
        next()
    }catch(err){
        res.status(401).send("Invalid Token")
    }
}