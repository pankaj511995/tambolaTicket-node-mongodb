const checkSpace=(str)=>str.trim().split(' ').length!=1

const validate=({name=' ',email,password})=>{
    
    if(name===''||email===''||password===''){
        return false
        
    }
    if(!checkSpace(name) && !checkSpace(email)&&!checkSpace(password)){
        
            return true
    }else return false
}
const error=(res,sendErrorMessage,printErrorMessage)=>{
    console.log(printErrorMessage)
  return  res.status(400).json(sendErrorMessage)
   
}
const throwError=(res,message)=>res.status(400).json({message:message})
module.exports={
    error,
    validate,
    throwError
}
