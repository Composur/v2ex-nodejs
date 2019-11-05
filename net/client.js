const net = require('net')

const socket = new net.Socket({})

socket.connect({
  host:'127.0.0.1',
  port:12345
},()=>{
  console.log('establish on 12345')
})
socket.write('test for client!') //单工模式 只能客户端向浏览器端发送数据