var common = {
    $: function ($) {
        return document.querySelector($)
    },
    $$: function ($) {
        return document.querySelectorAll($)
    }
}
var log = console
    .log
    .bind(console)

var musicList=[]
var currentIndex = 0
var audio=new Audio()
 audio.autoplay=true


// 这样每秒刷新4次
 audio.ontimeupdate=function(){
    //  log(this.currentTime)
     common.$('.progress-now').style.width=(this.currentTime/this.duration)*100+'%'

    //  得到当前时间
    // var min=Math.floor(this.currentTime/60)
    // var sec=Math.floor(this.currentTime)%60+''
    // sec=sec.length===2?sec:'0'+sec
    // common.$('.time').innerText=min+':'+sec
 }



//  这样刷新的会平稳一些

audio.onplay=function(){

    // log(this)
    playTime=setInterval(function(){
        
        var min=Math.floor(audio.currentTime/60)
        var sec=Math.floor(audio.currentTime)%60+''
        sec=sec.length===2?sec:'0'+sec
        common.$('.time').innerText=min+':'+sec
    },1000)
}
// 播放暂停，停止计时器

audio.onpause=function(){
    clearInterval(playTime)
}


// 播放完毕自动下一首，然后循环播放
audio.onended=function(){

    // currentIndex是全局这里也能够得到
    log(currentIndex)
    currentIndex=(++currentIndex)%musicList.length
    loadMusic(musicList[currentIndex])
}


common.$('.stop').onclick=function(){
    // audio.pause()
}
// common.$('.stop').addEventListener('load',function(e){
//     if(audio.paused){
//         // audio.play()
//        e.target.classList.remove('fa-play')
//        e.target.classList.add('fa-pause')
      
//     }else{   
//     //  audio.pause()
//      e.target.classList.remove('fa-pause')
//      e.target.classList.add('fa-play')
//     }
// },false)
common.$('.stop').addEventListener('click',function(e){
    console.log(audio.paused)
   if(audio.paused){
       audio.play()
      e.target.classList.remove('fa-play')
      e.target.classList.add('fa-pause')
     
   }else{   
    audio.pause()
    e.target.classList.remove('fa-pause')
    e.target.classList.add('fa-play')
   }
},false)

common.$('.next').addEventListener('click',function(){
    currentIndex=(++currentIndex)%musicList.length
    log(currentIndex)
    log(musicList.length)
    loadMusic(musicList[currentIndex])
},false)


common.$('.prev').addEventListener('click',function(){
    // 这样写不能实现逆向循环
    // currentIndex=(Math.abs(--currentIndex))%musicList.length

    currentIndex=(musicList.length+(--currentIndex))%musicList.length
    // log(currentIndex)
    loadMusic(musicList[currentIndex])
},false)

// common.$$('.list li').forEach(function(li){
//     log(li)
//         // this.addEventListener('click',function(){
//         //     log(this)
//         // },false)
// })

common.$('.bar').addEventListener('click',function(e){
    log(e.offsetX / parseInt(getComputedStyle(this).width))
//    width有px需要转一下
    audio.currentTime=(e.offsetX/parseInt(getComputedStyle(this).width))*audio.duration
},false)

getMusicList(function (list) {
    musicList=list
    log(musicList)

    loadMusic(musicList[currentIndex])

    // common.$('.list')

    musicList.forEach(function(e){
        // log(e.title)

      var   li=document.createElement('li')
             li.innerText=e.title
             common.$('.list').appendChild(li)
    })
    
 
})

function getMusicList(callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '../data/music.json', true)
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
            callback(JSON.parse(this.responseText))
        } else {
            log('请求数据失败!')
        }
    }
    xhr.onerror = function () {
        log('网络异常！')
    }
    xhr.send()
}

function loadMusic(musicObj){

   
    audio.src=musicObj.src 

    common.$('.music .title').innerText=musicObj.title
    common.$('.music .author').innerText=musicObj.auther
    // 更换背景图
    // common.$('.cover').style.background=`url("${musicObj.img}")`
   
}
