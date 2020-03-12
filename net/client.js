const net = require('net')

const socket = new net.Socket({})

socket.connect({
  host:'127.0.0.1',
  port:12345
},()=>{
  console.log('establish on 12345')
})
//单工模式 只能客户端向浏览器端发送数据
socket.write('01') 

// 接收服务端的数据

socket.on('data',buffer=>{
  console.log(buffer,buffer.toString())
})