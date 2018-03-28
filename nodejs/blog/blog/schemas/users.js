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
    password:String,
    // 是否是管理员,默认是false.手动去数据库中增加一个admin,在入口文件中进行判断
    isAdmin:{
        type:Boolean,
        default:false
    }
})