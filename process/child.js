process.on('message',str=>{
  console.log('child.js 收到',str)
  process.send('我是子进程')
})

