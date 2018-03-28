var express = require('express');
var router = express.Router();
var User=require('../models/users')
var Category=require('../models/category')




// 后台管理页面入口
// 1.判断登陆者是否是管理员
router.use(function(req,res,next){
    // 非管理员
    // console.log(req.userInfo.isAdmin)
    if(!req.userInfo.isAdmin){
       res.send('你不是管理员!')
       return
    }
    next()
})

// 首页
router.get('/', function(req, res, next) {
    res.render('admin/index',{
        userInfo:req.userInfo
    })
});

//用户管理 
router.get('/user', function(req, res, next) {


/**
 * 进行分页处理,借用数据库的limit()限制获取的条数
 * skip(2)忽略掉前两条数据,从第三条数据开始显示
 * 通过http请求得到前端传来的分页数据\
 * 用User.count()得到数据的总数
 */
    var page=Number(req.query.page||1)
    var pages=0
    var limit=2


    User.count().then(function(count){
        // console.log(count)
        // 因为是异步的要放到里面


        // 计算总页数
        pages=Math.ceil(count/limit)

        // 限定page的范围

        page=Math.min(page,pages)//最不能大于最大页数
        page=Math.max(page,1)//最小是第一页

        var skip=(page-1)*limit
        User.find().limit(limit).skip(skip).then(function(users){
            res.render('admin/user',{
                userInfo:req.userInfo,
                users:users,
                page:page,
                count:count,
                limit:limit,
                pages:pages
            })
        })
    
    })
    
    
  
});

// 分类首页
router.get('/category',function(req,res,next){
    

    res.render('admin/category',{
        userInfo:req.userInfo
    })
})



// 添加首页
router.get('/category/add',function(req,res,next){
    

    res.render('admin/category_add',{
        userInfo:req.userInfo
    })
})

// 得到新增分类的数据
router.post('/category/add',function(req,res,next){
        var name=req.body.name||''
       console.log(req.userInfor)

        // 判断数据类型 
        if(name==''){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'分类名不能为空!'
            })
        }

       console.log(req.body)
        
    // res.render('admin/category_add',{
    //     userInfo:req.userInfo
    // })
})



module.exports = router;