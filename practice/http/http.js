const http=require('http')

http.createServer(function(req,res){
    res.writeHead(200,{
        "Content-Type":"text/html;charset=UTF-8"
    })
    res.write('response0')
    res.write('response1')
    res.end('response2')
}).listen(8080,()=>{
  console.log(8080)
})
// console.log(http)
