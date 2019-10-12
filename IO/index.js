const glob=require('glob')
const path=require('path')
const filePath=path.join(__dirname,'/**/*')

console.time('end')

// 阻塞
// const result=glob.sync(filePath) //耗时13毫秒
// console.timeEnd('end')
// console.log(result)

// 非阻塞
glob(filePath,function(er,res){
  console.log(res)
}) //耗时2毫秒
console.timeEnd('end')
console.log('同步')