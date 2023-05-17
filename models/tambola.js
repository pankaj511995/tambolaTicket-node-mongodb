const mongoose=require('mongoose')
const tambola=new mongoose.Schema({
    stringTicket:{
        type:String,
       unique:true,
        require:true
    
    },
    ticket:Array
})
module.exports=mongoose.model('tambolaTicket',tambola)