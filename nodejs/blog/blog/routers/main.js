var express = require('express');
var router = express.Router();


// 首页模块
router.get('/', function(req, res, next) {
     //Do whatever...
    res.render('main/index')
});
// 内容页
router.get('/', function(req, res, next) {
    //Do whatever...
    res.send('main')
});
module.exports = router;