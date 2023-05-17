const app=require('express')()  
require('dotenv').config()

const mongoose=require('mongoose')

const ticketRout=require('./router/ticket')
const userRout=require('./router/userRout')

 const cors=require('cors')
 const bodyParser=require('body-parser')
 
 app.use(bodyParser.json({extended:false}))
 app.use(cors())
 
app.use('/user',userRout)
app.use('/',ticketRout)

mongoose.connect(process.env.URL).then(res=>{
    app.listen(3000)
    console.log('connected')
})  
.catch(err=>{
    console.log(err.message,'gating this error')
})
