var express=require('express')
var router=express.Router()
const{info}= require ('../Services/osService')

router.get('/info',info)

module.exports= router