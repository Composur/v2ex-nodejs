const Test = require('./lib/emmit') //把底层的东西放到一个模块里
const test01=new Test 
test01.addListener('listen',(res)=>{
  // 这里可以进行逻辑处理
  console.log(res)
})
