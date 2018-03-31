
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
                pages:pages,
                message:'active'
            })
        })
    
    })
    
});

// 分类首页
router.get('/category',function(req,res,next){
    

    /**
     * 进行分页处理,借用数据库的limit()限制获取的条数
     * skip(2)忽略掉前两条数据,从第三条数据开始显示
     * 通过http请求得到前端传来的分页数据\
     * 用User.count()得到数据的总数
     */
    var page=Number(req.query.page||1)
    var pages=0
    var limit=10


        Category.count().then(function(count){
        // console.log(count)
        // 因为是异步的要放到里面


        // 计算总页数
        pages=Math.ceil(count/limit)

        // 限定page的范围

        page=Math.min(page,pages)//最不能大于最大页数
        page=Math.max(page,1)//最小是第一页

        var skip=(page-1)*limit
        Category.find().limit(limit).skip(skip).then(function(categorys){
            res.render('admin/category',{
                userInfo:req.userInfo,
                categorys:categorys,
                page:page,
                count:count,
                limit:limit,
                pages:pages
            })
        })

    })
    // res.render('admin/category',{
    //     userInfo:req.userInfo
    // })
})



// 添加分类首页
router.get('/category/add',function(req,res,next){
    

    res.render('admin/category_add',{
        userInfo:req.userInfo
    })
})

// 得到新增分类的数据
router.post('/category/add',function(req,res,next){
        var name=req.body.name||'';

        //验证提交的数据
        if(name==''){
            res.render('admin/error',{
                userInfo:req.userInfo,
                url:'/admin/category/add',
                message:'分类名不能为空!'
            })
            return Promise.reject('分类名不能为空').then((reason)=>{
                console.log(reason)
            })
        }else{
            Category.findOne({name:name}).then(function(className){
                if(className){
                    res.render('admin/error',{
                        userInfo:req.userInfo,
                        url:'/admin/category/add',
                        message:'分类名已经存在'
                    })
                    return Promise.reject('分类名已经存在').then(function(reason){
                        console.log(reason)
                    })
                }else{
                    return   new Category({name:name}).save()
                }
            }).then(function(newCategory){
              
                res.render('admin/category_add_success',{
                    userInfo:req.userInfo,
                    url:'category/add'
                })
            })
        }     
})

/**
 * 分类修改与删除
 */

//  分类的修改
router.get('/category/edit',function(req,res){
    // 获取数据;点击删除的a连接已经把id发送给了浏览器
    var id=req.query.id||''
    // console.log(id)
    Category.findOne({_id:id}).then(function(Id){
        // console.log(Id)
        if(!Id){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'修改的对象不存在'
            })
            // return Promise.reject()
        }else{
            res.render('admin/category_edit',{
                userInfo:req.userInfo,
                category:Id
            })
        }
    }) 
})

// 修改后的保存
router.post('/category/edit',function(req,res){
    var id=req.query.id
    var name=req.body.name.replace(/\s+/g,"")

    // 先判断修改的数据是否在数据库存在
    Category.findOne({_id:id}).then(function(category){
        if(!category){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'修改的对象不在数据库中'
            })
            // return Promise.reject()
        }else{
            // 存在 判断是否做了修改
            if(name==category.name){
                console.log('true')
                res.render('admin/error',{
                    userInfo:req.userInfo,
                    message:'未对数据进行修改'
                })
                return Promise.reject('未对数据进行修改').then(reason=>{
                    console.log(reason)
                })
            }else{
                /**
                 * 修改的类名和数据库中存在的一样
                 * 把这个信息返回出去
                 */
            //    Syntax: {field: {$ne: value} }
                return Category.findOne({
                    _id:{$ne:id},
                    name:name
                })
            }
            return Promise.reject()
        }
    }).then(function(same){
        // 得到输入相同类型的信息,进行判断
        if(same){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'该类名已被占用'
            })
        }else{
          return  Category.update({_id:id},{name:name})
        }

    }).then(function(){
        res.render('admin/error',{
            userInfo:req.userInfo,
            message:'修改成功!',
            url:'/admin/category/'
        })
    })
})


// 分类的删除
router.get('/category/del',function(req,res,next){
    var id=req.query.id
    console.log(id)
        Category.remove({_id:id}).then(function(){
            res.render('admin/error',{
                userInfo:req.userInfo,
                message:'删除成功!',
                url:'/admin/category/'
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
router.get('/content',function(req,res){
    res.render('admin/contents',{
        userInfo:req.userInfo,
    })
 })



// 内容添加页

router.get('/content/add',function(req,res){


    Category.findOne()
    res.render('admin/contents_add',{
        userInfo:req.userInfo
    })
})

router.post('/content/add',function(req,res){

})


module.exports = router;