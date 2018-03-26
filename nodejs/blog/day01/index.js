var log=console.log.bind(console)
var fs=require('fs')
// log(fs)


// log('nodejs中的module')
// log('一个文件就是一个module，每个module都有自己的作用域、')
// log(__filename)//当前文件被解析过后的绝对路径
// log(__dirname)
// log('如何去加载一个module')
// log(module)
// 模块作用域
// module.exports.log=log;

log(module.exports===exports)//true

log('process+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
log(process.argv)
// log(process.env)
// setInterval(function(){
    log(process.pid)
    log(process.title)
    log(process.arch)
    log('标准输入输出流+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    log(process.stdin)
    log(process.stdout)
// },1000)
