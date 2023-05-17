const mongoose=require('mongoose')
const user=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    ticket:[{type:mongoose.Schema.Types.ObjectId, ref:'tambolaTicket'}]
})
module.exports=mongoose.model('user',user)