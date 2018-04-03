var express = require('express');
var router = express.Router();

// 导入数据库中的category数据模型进行前台展示
var Category=require('../models/category')

// 首页模块
router.get('/', function(req, res, next) {
   
    // render 第二个参数传入的对象就是给模板使用的对象,在模板中就可以使用模板的变量
    //读取所有的category
    Category.find().then(function(categorys){
        res.render('main/index',{
            userInfo:req.userInfo,
            categorys:categorys
        })
    })
    
});

module.exports = router;