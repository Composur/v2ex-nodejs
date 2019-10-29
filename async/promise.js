// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve({
//       test: [1, 2, 3]
//     })
//     // reject(new Error('error'))
//   }, 500)
// })

// setTimeout(()=>{
//   promise.then(res => {
//     console.log(res)
//   }).catch(err => {
//     console.log(err)
//   })
// },300)


const promise =(
  function(){
    return new Promise(resolve=>{
      resolve()
    })
}
)()

const asyncFn= (
  async function(){
  
  }
)()
console.log(promise)
console.log(asyncFn)