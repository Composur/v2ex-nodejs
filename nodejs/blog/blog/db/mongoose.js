var mongoose = require('mongoose');
var config = require('../config');
// db.connect(config.database, { useMongoClient: true });

var isConnectedBefore = false;

var connect = function () {
    mongoose.connect(config.database, {
        // useMongoClient: true,
        connectTimeoutMS: 30000,
        keepAlive: 1000,
        reconnectTries: Number.MAX_VALUE,
        autoReconnect: true
    });
    console.log('第一步（mongoose.js）连接数据库')
};

 // 连接数据库
connect();

mongoose.connection.on('error', function() {
    console.log('Could not connect to MongoDB');
});

mongoose.connection.on('disconnected', function(){
    console.log('Lost MongoDB connection...');
    if (!isConnectedBefore)
        connect();
});
mongoose.connection.on('connected', function() {
    isConnectedBefore = true;
    console.log('Connection established to MongoDB');
});

mongoose.connection.on('reconnected', function() {
    console.log('Reconnected to MongoDB');
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Force to close the MongoDB conection');
        process.exit(0);
    });
});

module.exports = mongoose;