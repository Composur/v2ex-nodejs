var express = require('express');
var router = express.Router();

router.get('/user', function(req, res, next) {
     //Do whatever...
     res.send('admin')
});

module.exports = router;