var express = require('express');
var router = express.Router();
var User = require('../models/users')
var Category = require('../models/category')
var Content = require('../models/contents')

// 后台管理页面入口 1.判断登陆者是否是管理员
router.use(function (req, res, next) {
    // 非管理员 console.log(req.userInfo.isAdmin)
    if (!req.userInfo.isAdmin) {
        res.send('你不是管理员!')
        return
    }
    next()
})

// 首页
router.get('/', function (req, res, next) {
    res.render('admin/index', {userInfo: req.userInfo})
});

//用户管理
router.get('/user', function (req, res, next) {

    /**
 * 进行分页处理,借用数据库的limit()限制获取的条数
 * skip(2)忽略掉前两条数据,从第三条数据开始显示
 * 通过http请求得到前端传来的分页数据\
 * 用User.count()得到数据的总数
 */
    var page = Number(req.query.page || 1)
    var pages = 0
    var limit = 2

    User
        .count()
        .then(function (count) {
            // console.log(count) 因为是异步的要放到里面 计算总页数
            pages = Math.ceil(count / limit)

            // 限定page的范围

            page = Math.min(page, pages) //最不能大于最大页数
            page = Math.max(page, 1) //最小是第一页

            var skip = (page - 1) * limit
            User
                .find()
                .limit(limit)
                .skip(skip)
                .then(function (users) {
                    res.render('admin/user', {
                        userInfo: req.userInfo,
                        users: users,
                        page: page,
                        count: count,
                        limit: limit,
                        pages: pages,
                        message: 'active'
                    })
                })

        })

});

// 分类首页
router.get('/category', function (req, res, next) {

    /**
     * 进行分页处理,借用数据库的limit()限制获取的条数
     * skip(2)忽略掉前两条数据,从第三条数据开始显示
     * 通过http请求得到前端传来的分页数据\
     * 用User.count()得到数据的总数
     */
    var page = Number(req.query.page || 1)
    var pages = 0
    var limit = 10

    Category
        .count()
        .then(function (count) {
            // console.log(count) 因为是异步的要放到里面 计算总页数
            pages = Math.ceil(count / limit)

            // 限定page的范围

            page = Math.min(page, pages) //最不能大于最大页数
            page = Math.max(page, 1) //最小是第一页

            var skip = (page - 1) * limit
            // sort()展现数据的排序1升序，-1降序
            Category
                .find()
                .sort({_id: 1})
                .limit(limit)
                .skip(skip)
                .then(function (categorys) {
                    res.render('admin/category', {
                        userInfo: req.userInfo,
                        categorys: categorys,
                        page: page,
                        count: count,
                        limit: limit,
                        pages: pages
                    })
                })

        })
    // res.render('admin/category',{     userInfo:req.userInfo })
})

// 添加分类首页
router.get('/category/add', function (req, res, next) {

    res.render('admin/category_add', {userInfo: req.userInfo})
})

// 得到新增分类的数据
router.post('/category/add', function (req, res, next) {
    var name = req.body.name || '';

    //验证提交的数据
    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            url: '/admin/category/add',
            message: '分类名不能为空!'
        })
        return Promise
            .reject('分类名不能为空')
            .then((reason) => {
                console.log(reason)
            })
    } else {
        Category
            .findOne({name: name})
            .then(function (className) {
                if (className) {
                    res.render('admin/error', {
                        userInfo: req.userInfo,
                        url: '/admin/category/add',
                        message: '分类名已经存在'
                    })
                    return Promise
                        .reject('分类名已经存在')
                        .then(function (reason) {
                            console.log(reason)
                        })
                } else {
                    return new Category({name: name}).save()
                }
            })
            .then(function (newCategory) {

                res.render('admin/category_add_success', {
                    userInfo: req.userInfo,
                    url: 'category/add'
                })
            })
    }
})

/**
 * 分类修改与删除
 */

//  分类的修改
router.get('/category/edit', function (req, res) {
    // 获取数据;点击删除的a连接已经把id发送给了浏览器
    var id = req.query.id || '';
    Category
        .findOne({_id: id})
        .then(function (Id) {
            // 修改的内容不存在
            if (!Id) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '修改的名称不存在'
                })
                return Promise
                    .reject('修改的名称不存在')
                    .then(function (resson) {
                        console.log(reason)
                    })
            } else {
                res.render('admin/category_edit', {
                    userInfo: req.userInfo,
                    category: Id
                })
            }
        })
})

// 修改后的保存
router.post('/category/edit', function (req, res) {
    var id = req.query.id
    var name = req
        .body
        .name
        .replace(/\s+/g, "")

    // 先判断修改的数据是否在数据库存在
    Category
        .findOne({_id: id})
        .then(function (category) {
            if (!category) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '修改的对象不在数据库中'
                })
                // return Promise.reject()
            } else {
                // 存在 判断是否做了修改
                if (name == category.name) {
                    console.log('true')
                    res.render('admin/error', {
                        userInfo: req.userInfo,
                        message: '未对数据进行修改'
                    })
                    return Promise
                        .reject('未对数据进行修改')
                        .then(reason => {
                            console.log(reason)
                        })
                } else {
                    /**
                 * 修改的类名和数据库中存在的一样
                 * 把这个信息返回出去
                 */
                    //    Syntax: {field: {$ne: value} }
                    return Category.findOne({
                        _id: {
                            $ne: id
                        },
                        name: name
                    })
                }
                return Promise.reject()
            }
        })
        .then(function (same) {
            // 得到输入相同类型的信息,进行判断
            if (same) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '该类名已被占用'
                })
            } else {
                return Category.update({
                    _id: id
                }, {name: name})
            }

        })
        .then(function () {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '修改成功!',
                url: '/admin/category/'
            })
        })
})

// 分类的删除
router.get('/category/del', function (req, res, next) {
    var id = req.query.id
    Category
        .remove({_id: id})
        .then(function () {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '删除成功!',
                url: '/admin/category/'
            })
        })
})

/**
 * 内容的保存
 * 1、展示内容页
 * 2、添加内容
 * 3、保存内容
 */

//内容首页
router.get('/content', function (req, res) {

    /**
     * 进行分页处理,借用数据库的limit()限制获取的条数
     * skip(2)忽略掉前两条数据,从第三条数据开始显示
     * 通过http请求得到前端传来的分页数据\
     * 用User.count()得到数据的总数
     */
    var page = Number(req.query.page || 1)
    var pages = 0
    var limit = 10

    Content
        .count()
        .then(function (count) {
            // console.log(count) 因为是异步的要放到里面 计算总页数
            pages = Math.ceil(count / limit)

            // 限定page的范围

            page = Math.min(page, pages) //最不能大于最大页数
            page = Math.max(page, 1) //最小是第一页

            var skip = (page - 1) * limit
            // sort()展现数据的排序1升序，-1降序;populate(category)这里的category就是contentSchema定义的关联字段
            Content
                .find()
                .sort({_id: 1})
                .limit(limit)
                .skip(skip)
                .populate(['category','user'])
                .then(function (contents) {
                    res.render('admin/contents', {
                        userInfo: req.userInfo,
                        contents: contents,
                        page: page,
                        count: count,
                        limit: limit,
                        pages: pages
                        
                    })
                })

        })
})

// 内容添加页

router.get('/content/add', function (req, res) {
    Category
        .find()
        .then(function (category) {
            res.render('admin/contents_add', {
                userInfo: req.userInfo,
                categorys: category
            })
        })

})

router.post('/content/add', function (req, res) {

    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类名不能为空'
        })
        return;
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '标题名不能为空！'
        })
        return;
    }

    if (req.body.content == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容不能为空！'
        })
        return;
    }

    new Content({category: req.body.category, user:req.userInfo._id,title: req.body.title, introduction: req.body.introduction, content: req.body.content})
        .save()
        .then(function () {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '保存成功！',
                url: '/admin/content'
            })
        })

})
// 内容的修改
router.get('/content/edit', function (req, res) {
    var id = req.query.id || '';
    // 分类的读取,由于传入的categoryData获取不到,给定义到外面
    var category = [];
    Category
        .find()
        .then(function (categoryData) {
            category = categoryData
            // 获取数据;点击删除的a连接已经把id发送给了浏览器
            return Content
                .findOne({
                _id: id
                // 读取category中的category
            })
                .populate(['category'])
        })
        .then(function (Id) {
            if (!Id) {
                res.render('admin/error', {
                    userInfo: req.userInfo,
                    message: '修改的对象不存在'
                })
                return Promise.reject()
            } else {
                res.render('admin/content_edit', {
                    userInfo: req.userInfo,
                    categorys: category,
                    content: Id
                })
            }
        })
})

//  内容修改后的保存
router.post('/content/edit', function (req, res) {
    var id = req.query.id
    var name = req
        .body
        .name
        .replace(/\s+/g, "")

    if (req.body.category == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '分类名不能为空'
        })
        return;
    }
    if (req.body.title == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '标题名不能为空！'
        })
        return;
    }

    if (req.body.content == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '内容不能为空！'
        })
        return;
    }

    // 传入两个条件一个是参数,一个是保存的内容
    Content.update({
        _id: id
    }, {
            category: req.body.category,
            title: req.body.title,
            introduction: req.body.introduction,
            content: req.body.content
        })
        .then(function (data) {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '修改成功!',
                url:'/admin/content?id='+id
            })
        })

})
// 内容的删除
router.get('/content/del', function (req, res) {
    var id = req.query.id
    Content
        .remove({_id: id})
        .then(function () {
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '删除成功!',
                url: '/admin/content/'
            })
        })
})
module.exports = router;