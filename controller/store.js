const{findTambolaArray}=require('../ticket/generate')
const {stringArrayTicket}=require('../ticket/stringTicket')
const {error}=require('../service/check')
const mongoose=require('mongoose')
const TambolaTicket=require('../models/tambola')

const addTicket=async(req,res)=>{
  const session=await mongoose.startSession()
    session.startTransaction()
  try{
        let storeUserTambol=findTambolaArray()
        if(!storeUserTambol) return res.status(400).json({message:' please try again'})
          
          let stringForm=stringArrayTicket(storeUserTambol)
      const tambolTicket=await TambolaTicket.create([{ticket:storeUserTambol,stringTicket:stringForm}],{session:session})
              req.user.ticket.push(tambolTicket[0]._id)
              await req.user.save({session:session})
              await session.commitTransaction()
              await session.endSession()
          res.status(200).json({ticket:storeUserTambol,ticketId:tambolTicket[0]._id})
  }catch(err){
    await session.abortTransaction()
    await session.endSession()
      // will get error when found duplicate 
      console.log(err.message)
    error(res,'sonething went wrong','duplicate value found')
  }
}


const getAllTricket=async(req,res)=>{
    try{
      const{perPage,currentPage}=req.body
      
  const returnTicket=await req.user.populate({
                      path:'ticket',
                      model:'tambolaTicket',
                      options:{
                          skip:Number(currentPage)*Number(perPage),
                          limit:Number(perPage)  
                      }
                      , select:
                        ['ticket']
                    })
  res.status(200).json(returnTicket.ticket)
}catch(err){
      error(res,'something went wrong','error while whowing all ticket of user')
}
}


module.exports={
    addTicket,
    getAllTricket
}