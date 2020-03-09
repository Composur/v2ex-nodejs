// const eventLoop = {
//   queue: [],
//   init() {
//     this.loop()
//   },
//   loop() {
//     // 循环检测队列
//     while (this.queue.length) { //每一次事件循环都是一次全新的调用栈，从这里开始才是js代码，之前都是c++
//       const callback = this.queue.shift()
//       callback() //这里就是nodejs调用栈的底部
//     }
//     setTimeout(this.loop.bind(this), 50)
//   },
//   // 添加函数
//   add(callback) {
//     this.queue.push(callback)
//   }
// }
// eventLoop.init()

// setTimeout(() => {
//   eventLoop.add(() => {
//     console.log(500)
//   })
// }, 500)

// setTimeout(() => {
//   eventLoop.add(() => {
//     console.log(1000)
//   })
// }, 1000)

function Promise_(construstor) {
  const _this = this;
  const pending = 'pending'
  this.status = pending;
  this.value = undefined;
  this.reason = undefined;

  function resolve(value) {
    if (_this.status === pending) {
      _this.status = "fulfilled";
      _this.value = value;
    }
  }
  function reject(reason) {
    if (_this.status === pending) {
      _this.status = "rejected";
      _this.reason = reason;
    }
  }


  try {
    construstor(resolve, reject);
  } catch (error) {
    reject(error)
  }
}

Promise_.prototype.then = function(onfullfiled,onrejected) {
  const _this = this
  switch (_this.status) {
    case "fulfilled":
      onfullfiled(_this.value);
      break;
    case "rejected":
      onrejected(_this.reason);
      break;
      default:
  }
  return this
};

var p = new Promise_(function(resolve,reject){reject(1)});
console.log(p)

p.then(function(x){console.log(x)},function(err){console.log(err)})


