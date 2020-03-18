const cluster = require("cluster");
const os = require("os");
const cpus = os.cpus();
let missdPing = 0;
if (cluster.isMaster) {
  for (let i = 0; i < cpus.length / 2; i++) {
    const work = cluster.fork();
    const timer = setInterval(() => {
      console.log("ping");
      work.send("ping");
      missdPing++;
      // 心跳检测主要为了子进程时候有死循环等
      // 心跳超过 3 次未检测到，退出进程
      if (missdPing >= 3) {
        clearInterval(timer);
        console.log("杀死僵死进程");
        process.kill(work.process.pid);
      }
    }, 1000);
    work.on("message", msg => {
      if (msg === "pong") {
        console.log("pong");
        missdPing--;
      }
    });
  }

  // 监听主进程是否挂掉，挂掉 10 秒后重启
  cluster.on("exit", err => {
    setTimeout(() => {
      cluster.fork();
    }, 10000);
  });
} else {
  require("./app");

  // 监听心跳事件，发送消息给主进程 进行呼应
  process.on("message", ping => {
    if (ping === "ping") {
      process.send("pong");
      console.log(missdPing);
    }
  });
  // 当进程出现会崩溃的错误
  process.on("uncaughtException", function(err) {
    // 这里可以做写日志的操作
    console.log(err);
    // 退出进程
    process.exit(1);
  });
  setInterval(() => {
    if (process.memoryUsage().rss > 734003200) {
        process.exit(1);
    }
  }, 5000);
}
