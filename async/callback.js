function interview(callback) {
  const random = Math.random();
  console.log(random);
  setTimeout(function() {
    if (random > 0.5) {
      callback(null,random);
    } else {
      callback('error')
    }
  }, 500);
}

interview(function(err,result) {
 if(err){
   console.log('error')
 }else{
   console.log('success',result)
 }
});



// 0.4136338806877633
// error
// 0.7680882379533018
// success 0.7680882379533018