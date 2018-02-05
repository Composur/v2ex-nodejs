var http = require('http')
var fs = require('fs')
var router=require('./route')
var startServer = function (router,handle) {
    var server = http.createServer((req, res) => {
        // 响应文本 res.writeHead(200,{'Content-Type':'text/html'}), 响应json
        // res.writeHead(200,{'Content-Type':'application/json'}) var obj={ name:'xt',
        //   age:18 } res.write(JSON.stringify(obj)) 响应html

        router(res.url)

        // if (req.url === "/" || req.url === "/home") {
        //     res.writeHead(200, {
        //         'Content-Type': 'text/html'
        //     }, 'utf-8')
        //     fs
        //         .createReadStream(__dirname + '/index.html', 'utf-8')
        //         .pipe(res)
        // } else if (req.url === '/api') {
        //     res.writeHead(200, {'Content-Type': 'text/html'})
        //     fs
        //         .createReadStream(__dirname + '/page/api.html', 'utf-8')
        //         .pipe(res)
        // } else if (req.url === '/view') {
        //     res.writeHead(200, {'Content-Type': 'text/html'})
        //     fs
        //         .createReadStream(__dirname + '/page/view.html', 'utf-8')
        //         .pipe(res)
        // } else if (req.url === 'xt') {
        //     var xt = {
        //         name: 'xt',
        //         age: 18,
        //         address: 'ss'
        //     }
        //     res.writeHead(200, {'Content-Type': 'application/json'})
        //     fs
        //         .createReadStream(__dirname)
        //         .pipe(JSON.stringify(xt))
        // } else {
        //     res.writeHead(200, {'Content-Type': 'text/html'})
        //     fs
        //         .createReadStream(__dirname + '/page/404.html', 'utf-8')
        //         .pipe(res)
        // }
    })
    server.listen(3000, () => {
        console.log("3000")
    })
}
module.exports = startServer
