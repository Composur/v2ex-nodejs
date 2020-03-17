const cluster = require("cluster");
const os = require("os");
const cpus = os.cpus();
if (cluster.isMaster) {
  for (let i = 0; i < cpus.length; i++) {
    cluster.fork();
  }
} else {
  require("./app");
}
