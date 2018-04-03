// $(function(){
//     $('.sidebar li').click(function(){
//         $(this).addClass("active").siblings().removeClass("active");
//     })
// })
$('.sidebar li').click(function() {
    
        //console.log("Clicked");
        $('.sidebar li').removeClass('active');
        $(this).addClass('active');
    });
