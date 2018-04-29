var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'StickyNotes' });
  res.render('index', { title:'stickNotes' })
})
module.exports = router;
