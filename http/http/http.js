const server = require("http");

server
  .createServer(function(req, res) {
    res.writeHead(200);
    res.end("success");
  })
  .listen(3000);
