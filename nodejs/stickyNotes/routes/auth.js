var express=require('express')
var router=express.Router()

router.get('/github',function(req,res,next){
    console.log(req.query)
    res.render('index', { title:'stickNotes' })
})

module.exports=router