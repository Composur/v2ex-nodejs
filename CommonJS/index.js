const playAction=require('./lib/common')

// 获取nodejs（第一个）输入的变量
const userAction = process.argv[process.argv.length - 1]

// 让程序不中断，一直执行
let result=0;
process.stdin.on('data',e=>{
  const userInputValue=e.toString().trim()
  result= playAction(userInputValue)
  if(result==-1){
    result++
    console.log(result)
  }
  if(result===3){
    console.log('你太厉害了！！')
    process.exit()
  }
})


