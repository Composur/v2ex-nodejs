var mongoose=require('mongoose')
var contentsSchema=require('../schemas/contents')

module.exports=mongoose.model('contents',contentsSchema)