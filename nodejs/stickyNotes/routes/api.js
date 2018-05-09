var express=require('express')
var router=express.Router()
var Note=require('../model/note').Note


router.get('/notes',function(req,res,next){
    var note=req.body.note
    Note.findAll({raw:true}).then(data=>{
        res.send({
            status:0,
            data:data
        })
    })
})


router.get('/notes',function(req,res,next){
        console.log('notes')
})

router.post('/notes/add',function(req,res,next){
   console.log('test')
})

router.get('/notes/del',function(req,res,next){

})

router.get('/notes/update',function(req,res,next){

})

module.exports=router