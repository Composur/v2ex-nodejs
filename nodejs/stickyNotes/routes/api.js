var express=require('express')
var router=express.Router()
var Note=require('../model/note').Note

// 首页加载查询所有
router.get('/notes',function(req,res,next){
    var note=req.body.note
    Note.findAll({raw:true}).then(data=>{
        res.send({
            status:0,
            data:data
        })
    })
})

router.post('/notes/add',function(req,res,next){
    var note=req.body.note
    Note.create({text:note}).then(function(){
        res.send({status:0})
    }).catch(function(){
        res.send({status:1,errorMsg:'数据库出错！'})
    })
})

router.get('/notes/del',function(req,res,next){

})

router.get('/notes/update',function(req,res,next){

})

module.exports=router