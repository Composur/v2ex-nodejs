var express = require('express');
var router = express.Router();

// 导入数据库中的category数据模型进行前台展示
var Category = require('../models/category')
var Content = require('../models/contents')

// 首页
router.get('/', function (req, res, next) {
    var data = {
        page: Number(req.query.page || 1),
        pages: 0,
        limit: 10,
        userInfo: req.userInfo,
        categories: [],
        count: 0

    }
    // 读取分类
    Category
        .find()
        .then(function (categorys) {
            data.categories = categorys

            //返回content的数量
            return Content.count()
        })
        .then(function (count) {
            data.count = count
            data.pages = Math.ceil(data.count / data.limit)

            // 限定page的范围

            data.page = Math.min(data.page, data.pages) //最不能大于最大页数
            data.page = Math.max(data.page, 1) //最小是第一页

            var skip = (data.page - 1) * data.limit

            return Content
                .find()
                .sort({_id: 1})
                .limit(data.limit)
                .skip(skip)
                .populate(['category', 'user'])
        })
        .then(function (contents) {
            data.contents=contents
            res.render('main/index', data)
        })
});

module.exports = router;