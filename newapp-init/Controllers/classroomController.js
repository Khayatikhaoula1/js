const express=require('express')
var router=express.Router()
const classroomService= require ('../Services/classroomService') //import lel module kemel 
const {create,update,deleteC,read}= require ('../Services/classroomService')//import lel hajet specifique kahaw  
const validate = require('../middleware/classroomValidation')

router.get('/list',classroomService.read)// shiha 
router.post('/create', validate, create)
router.put('/:id', validate, update);
router.delete('/:id', classroomService.deleteC)

module.exports= router