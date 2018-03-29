// $(function(){
//     $('.sidebar li').click(function(){
//         $(this).addClass("active").siblings().removeClass("active");
//     })
// })
// $('.sidebar li').click(function() {
    
//         //console.log("Clicked");
//         $('.sidebar li').removeClass('active');
//         $(this).addClass('active');
//     });
window.onload = function() {
    var index = 0;

    var oList = document.getElementById('sidebar');
    var aA = oList.getElementsByTagName('li');
    var url = window.location.href;

    // 初始化页面
    init();
    

    // 先写一个功能函数，从链接地址中获取 index 的值
    function getIndex(url, key) {

        if (!url) { return; }
        
        var arr = url.slice(url.indexOf('?') + 1).split('&');

        return function() {
            for(var item in arr) {
                var otherArr = arr[item].split('=');
                if (otherArr[0] == key) {
                    return otherArr[1];
                };
            }
        }();
    }

    // 再写一个初始化函数,这个例子中比较简单，只需知道哪一个按钮是当前状态
    function init() {
        index = getIndex(url, 'index') ? getIndex(url, 'index') : 0;

        var i = 0, len = aA.length;
        for(; i<len; i++) {
            aA[i].className = '';

            // 根据不同情况处理一下url,然后给href设置上值，你也可以直接在a标签中添加链接，记得要加上index参数
            if (url.indexOf('?') > -1) {
                if (url.indexOf('index=') > -1) {
                    url = url.replace(/index=\d*/g, 'index='+i);
                } else {
                    url += '&index='+i;
                }
            } else {
                url += '?index='+i;
            }

            aA[i].setAttribute('href', url);

        }

        aA[index].className = 'active';
    }

}