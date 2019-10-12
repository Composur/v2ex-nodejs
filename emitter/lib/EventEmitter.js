const EventEmitter=require('events').EventEmitter
const os=require('os')
class Test extends EventEmitter{
  constructor(){
    super()
    setInterval(() => {
      this.emit('listen',{date:Date.now()}) //可以抛出一些东西出来
    }, 3000);
  }
}
console.log(os.cpus())
module.exports=Test
