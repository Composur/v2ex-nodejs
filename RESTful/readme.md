## RESTful
> 对于同一个资源，都在同一个路由下进行，通过对HTTP请求类型的不同的判断，来做不同的事情

```
http://127.0.0.1/user/1 GET 请求用户信息 
http://127.0.0.1/user/  POST 新增用户信息 
http://127.0.0.1/user/1 PUT 修改用户信息 
http://127.0.0.1/user/1 DELETE 删除用户信息 
```
+ url风格，路由（HTTP请求函数）风格
+ 根据URL知道这个路由是干嘛的

## NodeJS中的RESTful

> 顶层路由模式：我们的路由不一定有对应的页面 
```
const express =require('express')
const app=express()

app.get('/test',(req,res)=>{
  res.send('test') 
})
app.listen(12345)
```