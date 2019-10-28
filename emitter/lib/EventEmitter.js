const EventEmitter=require('events').EventEmitter
const os=require('os')
class Test extends EventEmitter{
  constructor(){
    super()
    setInterval(() => {
      this.emit('listen',{date:Date(),test:'三秒触发一次'}) //可以抛出一些东西出来
    }, 1000);
  }
}
// console.log(os.cpus())
module.exports=Test
