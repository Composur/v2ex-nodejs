const Koa = require("koa");
const mount = require("koa-mount");
const fs = require("fs");
const path = require("path");
const static = require('koa-static')
const config = require("./config");
const app = new Koa();

// 静态资源
app.use(static(__dirname+'/source/'))

const str = fs.readFileSync(path.resolve(__dirname, "./source/index.htm"));

// 下载页面
app.use(
  mount(async (ctx, next) => {
    ctx.status = 200
    // 不设置 type type 就是 buffer 浏览器回去执行下载的操作
    ctx.type = 'html'
    ctx.body  =   str
  })
);

app.listen(config.port, () => {
  console.log("Listen on port: " + config.port);
  console.log("http://localhost:" + config.port);
});
