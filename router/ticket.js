
const {Router}=require('express')

const{addTicket,getAllTricket}=require('../controller/store')

const{authenticate}=require('../authentication/autho')

const router=Router()
 
router.get('/ticket',authenticate,addTicket)

router.post('/ticket',authenticate,getAllTricket)

module.exports=router 