const eventLoop = {
  queue: [],
  init() {
    this.loop()
  },
  loop() {
    // 循环检测队列
    while (this.queue.length) { //每一次事件循环都是一次全新的调用栈，从这里开始才是js代码，之前都是c++
      const callback = this.queue.shift()
      callback() //这里就是nodejs调用栈的底部
    }
    setTimeout(this.loop.bind(this), 50)
  },
  // 添加函数
  add(callback) {
    this.queue.push(callback)
  }
}
eventLoop.init()

setTimeout(() => {
  eventLoop.add(() => {
    console.log(500)
  })
}, 500)

setTimeout(() => {
  eventLoop.add(() => {
    console.log(1000)
  })
}, 1000)