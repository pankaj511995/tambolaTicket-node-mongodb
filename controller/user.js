const User=require('../models/user')
const bcrypt=require('bcrypt')
const JWT=require('jsonwebtoken')
//all function imported from service file
const {error,validate,throwError}=require('../service/check')
  
const signUp=async(req,res)=>{
    try{
    const {name,email,password}=req.body
    if(!validate({name,email,password})) return throwError(res,'please fill correctly')

    const hash=await bcrypt.hash(password,Number(process.env.SALT))

    if(!hash) return throwError(res, 'something went wrong')

    await User.create({name:name,email:email,password:hash})
    res.status(200).json({message:'login success'})

}catch(err){
    error(res,'found duplicate email',err.message)
}
}
const signIn=async(req,res)=>{
    try{
        const {email,password}=req.body
    if(!validate({email,password})) return throwError(res,' fill details correctly')

    const user=await User.findOne({email:email})
    if(!user) return throwError(res,'new user sighup now') 
    
    let hash=await bcrypt.compare(password,user.password)
    if(hash){
        res.status(200).json({token:JWT.sign({id:user._id},process.env.SECRATE_KEY)})
        
    }else return throwError(res,'incorrect password')
}catch(err){
    
    error(res,'something went wrong','duplicate email')
}
}
module.exports={
    signUp,
    signIn
}