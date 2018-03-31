var mongoose=require('mongoose')
 module.exports=new mongoose.Schema({
    //  关键字段-内容分类的id
     category:{
        //  类型
         type:mongoose.Schema.Types.ObjectId,
        // 引用
        ref:'category'
     },
     //  关键字段-用户分类的id
     user:{
        //  类型
         type:mongoose.Schema.Types.ObjectId,
        // 引用
        ref:'user'
     },
// 添加时间
     addTime:{
         type:Date,
        default:new Date()
     },
    //  点击量
    views:{
        type:Number,
        default:0
    },
     title:String,
     description:{
         type:String,
         default:''
     }
 })