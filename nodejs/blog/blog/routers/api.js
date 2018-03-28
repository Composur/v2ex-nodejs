var express = require('express');
var router = express.Router();
// 引入数据模型对数据库进行查询判断用户是否已经注册
var User = require('../models/users')

// 对数据的处理 统一返回的格式
var responseData
router.use(function (req, res, next) {
    responseData = {
        // 初始化为空，无错误信息为空
        code: 0,
        message: ''
    }
    next()
})

// 注册
router.post('/user/register', function (req, res, next) {
    // Do whatever...  得到前端的数据 对数据进行验证 注册逻辑  console.log('register')
    // console.log(req.body)

    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    // console.log(username, password, repassword)

    if (username == '') {
        responseData.code = 1
        responseData.message = '用户名不能为空'
        res.json(responseData)
        return
    }
    if (password == '') {
        responseData.code = 2
        responseData.message = '密码名不能为空'
        res.json(responseData)
        return
    }
    if (password != repassword) {
        responseData.code = 3
        responseData.message = '两次输入密码不一致'
        res.json(responseData)
        return
    }

    // 注册判断  查找数据了进行判断
    User
        .findOne({username: username})
        .then(function (userInfo) {
            if (userInfo) {
                responseData.code = 4;
                responseData.message = '用户名已经被注册'
                res.json(responseData)
                return
            }
            // user模型的seve方法
            var user = new User({username: username, password: password})
            return user.save()
        })
        .then(function (newUserInfo) {
            console.log(newUserInfo)
            responseData.message = '注册成功'
            res.json(responseData)
        })

});

// 登陆
router.post('/user/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username == '' || password == '') {
        responseData.code = 1
        responseData.message = '用户名和密码不能为空！'
        res.json(responseData)
        return
    }

    // 查询数据库 User.findOne({username:})
    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        if(!userInfo){
            responseData.code=2
            responseData.message='用户名或密码错误'
            res.json(responseData)
            return
        }
        responseData.message='success!'

        // 设置前端的提示信息
        responseData.userInfo={
            _id:userInfo._id,
            username:userInfo.username
        }

        // 种植cookie 设置cookie以后浏览器再访问服务端的时候就会带上这段cookie，通过这段cookie来验证是否是一个登陆状态
        // userInfo是cookie的名字
        req.cookies.set('userInfo',JSON.stringify({
            _id:userInfo._id,
            username:userInfo.username
        }))
        res.json(responseData)
        return
    })
})

// 退出,把cookie设置为空
router.get('/user/exit',function(req,res,next){
    // 把cookie设置为空
    req.cookies.set('userInfo',null)
    responseData.message="退出成功!"
    res.json(responseData)
    return
})

module.exports = router;