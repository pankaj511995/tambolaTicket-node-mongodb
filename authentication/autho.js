const JWT=require('jsonwebtoken')
const User=require('../models/user')
exports.authenticate=async(req,res,next)=>{
    // i am using token from env file
    try{
    const token=JWT.verify(process.env.TOKEN,process.env.SECRATE_KEY)
    const user=await User.findById(token.id)
    if(user){
        req.user=user
        next()
    }else res.status(400).json({message:'sign in for using this service'})
}catch(err){
        res.status(400).json({message:'semething went weong '})
        console.log('error while authentication')
}
}