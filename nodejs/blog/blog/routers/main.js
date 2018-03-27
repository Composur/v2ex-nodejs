var express = require('express');
var router = express.Router();


// 首页模块
router.get('/', function(req, res, next) {
     //Do whatever...
    //  第二个参数传入的对象就是给模板使用的对象,在模板中就可以使用模板的变量
    res.render('main/index',{
        userInfo:req.userInfo,
    })
});
// 内容页
// router.get('/', function(req, res, next) {
//     //Do whatever...
//     res.send('main')
// });
module.exports = router;