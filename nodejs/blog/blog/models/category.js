var mongoose=require('mongoose')
var userSchema=require('../schemas/category')

module.exports=mongoose.model('category',userSchema)