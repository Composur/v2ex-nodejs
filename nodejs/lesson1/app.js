const log = console.log.bind(console)
// var   stuff=require('./count')
// let count = 0 const speed = 2000 const timer = setInterval(() => {     count
// += 2     log(count + 'leesons1')     if (count >= 6) {
// clearInterval(timer)     } }, speed) 全局变量 输出当前文件的路径与
// log(__dirname)
// // 全局变量 输出当前文件的name
// log(__filename)

// // 函数声明 函数表达式

// function sayHi(){
//     log('hi')
// }
// sayHi()


// var sayBye=function(name){
//     log(name+' bye')
// }
// sayBye('tom')
// // 回掉函数 callback
// function callBack(fn,name){
//     fn('lili')
// }
// callBack(sayBye)
// log(counter(['1','2','3']))
// log(stuff.counter(["fewf","fewf","fre"]))
// log(stuff.adder(2,4))


//事件 

// var events=require('events')

// 工具类 核心库
// var util=require('util')


// 创建一个对象
// var Person=function (name) {
//     this.name=name
// }
// // 继承 也可以用es6 extends  让person继承events.EventEmitter
// util.inherits(Person,events.EventEmitter)

// // 新建对象 把对象放到数组中
// var xiaoming=new Person('xiaoming')
// var lucy=new Person('lucy')

// var arry=[xiaoming,lucy]

// // 循环数组每个对象绑定一个事件
// arry.forEach(function(arry){
//     arry.on('speak',function(msg){
//         log(arry.name+ "said:" +msg)
//     })
// }) 

// // 触发

// xiaoming.emit('speak','hi')
// lucy.emit('speak','you')

// var myEmitter=new events.EventEmitter()
// myEmitter.on('someEvent',function(msg){
//     log(msg)
// })

// myEmitter.emit('someEvent','this event has emitted')



// 文件的读写

// var fs=require('fs')

// var readfile=fs.readFile('read.txt','utf-8',(err,data)=>{
//     if(err){
//         log(err)
//     }else{
//         fs.writeFile('wirte.txt',data,()=>{
//             log('readed finisded')
//         })
//     }
// })



// 目录的操作

// fs.mkdir('stuff',(err)=>{
//     if(err){
//         log(err)
//     }else{
//         fs.readFile('read.txt','utf-8',(err,data)=>{
//             fs.writeFile('./stuff/write.txt',data,()=>{
//                 log('copy successful!')
//             })
//         })
//     }
// })

// 流stream的操作

// var readStream=fs.createReadStream(__dirname+"/20171222_160840.mp4")
// var writeStream=fs.createWriteStream(__dirname+'/stuff/test.mp4')

// readStream.on('data',(chunk)=>{
//     log('new chunk received!')
//     log(chunk);
//     writeStream.write(chunk)
// })

//  readStream.pipe(writeStream).on('finish',()=>{
//      log('pipe successful!')
//  })


 var startServer=require('./server')
    var router=require('./route')
    var handler=require('./handle')
    var handle={}
    handle['']=handler.home
    handle['/home']=handler.home
    handle['/view']=handler.view
    handle['/api']=handler.api
    handle['/xt']=handler.xt
 startServer(router,handle);