const express =require('express')
const app=express()

app.get('/test',(req,res)=>{
  res.send('test') 
})
app.listen(12345)
