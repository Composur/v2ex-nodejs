const net = require('net')

const server = net.createServer(socket=>{
  socket.on('data',data=>{
    console.log(data) //<Buffer 74 65 73 74 20 66 6f 72 20 63 6c 69 65 6e 74 21>
  })
})

server.listen(12345,()=>{
  console.log(12345) 
})