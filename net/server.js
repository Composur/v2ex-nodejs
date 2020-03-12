const net = require('net')
const buffer = Buffer.alloc(4)
const server = net.createServer(socket=>{
  socket.on('data',data=>{
    // get client send data 
    console.log(data,data.toString())
    buffer.write('send client')
  })
})

server.listen(12345,()=>{
  console.log(12345) 
})