var mongoose = require('mongoose')
module.exports = new mongoose.Schema({
    //  关联字段（和其它的表存在一个关联的关系）-内容分类的id， 下拉菜单的category
    category: {
        //  类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'category'
    },
    //  关键字段-用户分类的id
    user: {
        //  类型
        type: mongoose.Schema.Types.ObjectId,
        // 引用
        ref: 'user'
    },
    // 添加时间
    addTime: {
        type: Date,
        default: new Date()
    },
    //  点击量
    views: {
        type: Number,
        default: 0
    },
    // 标题
    title: String,
    //  简介
    introduction: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    }
})