var $=function($){
    return document.querySelector($)
}
var login=$('.login')
var loginBtn=$('.login .btn')
var username=$('.username')
var password=$('.password')
var table=$('.table-responsive')
loginBtn.onclick=function(){
    if(username.value=="user"&&password.value=='pwd'){
        table.style.display='block'
        username.value=null
        password.value=null
        login.style.display='none'
    }    
}