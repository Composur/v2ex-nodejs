const result=require('./lib/common')

// 获取nodejs（第一个）输入的变量
const userAction = process.argv[process.argv.length - 1]

// 让程序不中断，一直执行
process.stdin.on('data',e=>{
  const userInputValue=e.toString().trim()
  result(userInputValue)
})