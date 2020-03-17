const cp = require('child_process')

// 开启一个子进程
const child_process = cp.fork(__dirname+'/child.js')

// 给子进程发送消息
child_process.send('我是父进程')

child_process.on('message',str=>{
  console.log('master.js 收到',str)
})
