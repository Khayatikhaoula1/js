const express=require('express')
var router=express.Router()
const chatService= require ('../Services/chatService') //import lel module kemel 
const {create,update,deleteC,read}= require ('../Services/chatService')//import lel hajet specifique kahaw  

router.get('/list',chatService.read)// shiha 
router.post('/create',create)// ou hedhi zeda  shiha 
router.put('/put',chatService.update)
router.delete('/delete',chatService.deleteC)

module.exports= router