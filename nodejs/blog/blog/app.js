var express=require('express')
var app=express()
var swig=require('swig')
var mongoose=require('./db/mongoose')
// 用来处理post提交过来的数据
var bodyParser=require('body-parser')

// 加载cookie

var Cookie=require('cookies')
var config=require('./config')
// 配置模板引擎第一个参数表示模板的名称（模板文件的后缀），第二个表示用于解析处理模板的内容
app.engine('html',swig.renderFile)

// 设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views','./views')

// 设置模板引擎,第一个参数必须是view engine 第二个是上面设置的模板后缀
app.set('view engine','html')

// 开发环境下设置，生成环境移除
swig.setDefaults({
    cache:false
})

// 设置静态文件托管目录
app.use('/public',express.static(__dirname+'/public'))


// bodyParser设置,会在app对象的req对象上增加一个属性body（post提交的数据）
app.use(bodyParser.urlencoded({extended:true}))

// 通过中间件设置cookie
app.use(function(req,res,next){
    req.cookies=new Cookie(req,res)
    
    req.userInfo={}
    // 解析用户登陆的cookie信息
    if(req.cookies.get('userInfo')){
        try {
            req.userInfo=JSON.parse(req.cookies.get('userInfo'))
            // console.log(req.userInfo)
        } catch (e) {
            console.log(e)
        }
    }
    next()
})
// 路由绑定
// // 首页
// app.get('/',function(req,res,next){

//     // req对象保存客户端请求的一些数据

//     // res对象提供服务端输出的一些方法
//     // 第一个参数表示模板文件、相对于views目录
//     // 第二个参数，传递给模板使用的数据
//     res.render('index.html')
// })

// 根据不同请求划分不同的路由去处理
app.use('/',require('./routers/main'))
app.use('/api',require('./routers/api'))
app.use('/admin',require('./routers/admin'))

// 内容输出
// app.render(__dirname + '/views')
app.listen(config.port,function(){
    console.log(`在${config.port}监听`)
})

