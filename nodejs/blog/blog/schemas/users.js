// var mongoose=require('mongoose')
// const Schema = mongoose.Schema,
// ObjectId = Schema.ObjectId;

// const BlogPost = new Schema({
//     author: ObjectId,
//     title: String,
//     body: String,
//     date: Date
// });

var mongoose=require('mongoose')

module.exports=new mongoose.Schema({
    username:String,
    password:String
})