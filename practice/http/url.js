const http=require('http')
const url=require('url')
const log=console.log.bind(console)
http.createServer(function(req,res){
    res.writeHead(200,{
        "Content-Type":"text/html;charset=UTF-8"
    })

    if(req.url!=='favicon.ico'){
        const  result=url.parse(req.url,true)
        const arr=[]
        for(let k in result.query){
            arr.push(result.query[k])
        }
        log(arr)
    }
    res.end('end')
}).listen(8080,()=>{
  console.log(8080)
})
// console.log(http)
