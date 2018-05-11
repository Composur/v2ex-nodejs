var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'StickyNotes' });

  var Login={
    title:'hahah',
    isLogin:true,
    user:{
      username:'test',
      avatar:'https://www.baidu.com/img/bd_logo1.png'
    }

  }

  res.render('index', Login)
})
module.exports = router;
