$(function(){
   var login= $('#login')
   var register= $('#register')
var userInfo=$('.userInfo')
var user=$('.user')
//    切换到注册
   login.find('a').on('click',function(){
        register.show()
        login.hide()
   })
// 切换到登录
  register.find('a').on('click',function(){
        register.hide()
        login.show()
    })

    //注册
    register.find('button').on('click',function(e){
        // e.prevetDefault()
        $.ajax({
            type :'post',
            url:'api/user/register',
            data:{
                username:register.find('[name="username"]').val(),
                password:register.find('[name="password"]').val(),
                repassword:register.find('[name="repassword"]').val()
            },
            dataType:'json',
            success:function(result){
                console.log(result)
                register.find('.message').html(result.message)
              
                if(!result.code){
                    setTimeout(function(){
                        register.hide()
                        login.show()
                    },1000)
                }
            }
        })
    })

    //登陆
    login.find('button').on('click',function(e){
        // e.prevetDefault()
        $.ajax({
            type :'post',
            url:'api/user/login',
            data:{
                username:login.find('[name="username"]').val(),
                password:login.find('[name="password"]').val(),
            },
            dataType:'json',
            success:function(result){     
                login.find('.message').html(result.message)
                user.html(result.userInfo.username)
              if(!result.code){
                //   登陆成功刷新页面
                  window.location.reload()
              }
            }
        })
    })
     //登出
    userInfo.find('button').on('click',function(e){
        $.ajax({
            type :'get',
            url:'api/user/exit',
            success:function(result){
               if(!result.code){
                //    登出刷新页面这个时候cookie已经不存在了
                   window.location.reload()
               }
            }
        })
    })
})