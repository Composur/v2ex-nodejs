var express=require('express')
var router=express.Router()
var Note=require('../model/note').Note

router.get('/notes',function(req,res,next){
    var note=req.body.note
    console.log(note)
    console.log(req.body)
    res.render('index', { title:'stickNotes' })
})

router.get('/notes/add',function(req,res,next){
    var note=req.body.note
    console.log(note)
    console.log(req.body)
})

router.get('/notes/del',function(req,res,next){

})

router.get('/notes/update',function(req,res,next){

})

module.exports=router