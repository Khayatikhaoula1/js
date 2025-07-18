var express=require('express')
var app=express()
const osRouter=require('./Controllers/osController')
const chatRouter=require('./Controllers/chatController')
const classroomRouter=require('./Controllers/classroomController')
var http=require('http')
const path = require('path')
const mongoose = require('mongoose')

app.set('views',path.join(__dirname,'Views'))
app.set('view engine','twig')
app.use(express.json())
app.use('/classroom', classroomRouter);
server =http.createServer(app)
server.listen(3000,()=>{
console.log("server started on 3000!")
})
const url=require('./database/mongodb.json')
mongoose.connect(url.mongo.url)
.then(()=>{
    console.log('DB CONNECTRED')})
.catch((error)=>console.log('DB error:'+error))
