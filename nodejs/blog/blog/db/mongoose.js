var mongoose = require('mongoose');
var config = require('../config');
// db.connect(config.database, { useMongoClient: true });

var isConnectedBefore = false;
var connect = function () {

    // 连接数据库
    mongoose.connect(config.database, {
        // useMongoClient: true,
        connectTimeoutMS: 30000,
        keepAlive: 1000,
        reconnectTries: Number.MAX_VALUE,
        autoReconnect: true
    });
    console.log('第一步（mongoose.js）连接数据库')

    //连接成功
    mongoose.connection.on('connected', function () {
        console.log(`mongodb连接成功！${config.database}`)
    })

    //连接异常
    mongoose.connection.on('error', function () {
        console.log(`mongodb连接失败！${err}`)
    })

    //连接断开
    mongoose.connection.on('disconnected', function () {
        console.log(`mongodb连接断开！`)
    })
};
connect();


module.exports = mongoose;