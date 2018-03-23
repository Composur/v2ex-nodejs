var express = require('express');
var async = require('async');
var xlsx = require('node-xlsx');
var schedule = require("node-schedule");
var mongo = require('./mongo');
var mysql=require('./db')
var fs = require('fs');
var app=express()
var port=8088
app.listen(port,function(){
    console.log(`在${port}监听`)
})
var auto = function(){
	//查询数据,并转化成生成xlsx所需的格式
	var task1 = function(callback){


       mongo.find({}, (err, result, res) => {
            if (err) 
                return console.log(err)
                // console.log(result[0].meta)
                var datas = [];
                result.forEach(function(result){
                var newRow = [];
                    for(var key in result){
                        newRow.push(result[key]);
                    }
                    datas.push(newRow);
                })
                callback(null, datas);
        })



		// mysql.query('select * from Users',function(err, rows, fields){
		// 	if (err) {
		// 		callback(err,null);
		// 		return;
		// 	}
		// 	var datas = [];
		// 	rows.forEach(function(row){
		// 	var newRow = [];
		// 		for(var key in row){
		// 			newRow.push(row[key]);
		// 		}
		// 		datas.push(newRow);
		// 	})
		// 	callback(null, datas);
		// })
	}

	//生成xlsx文件
	var task2 = function(datas, callback){
		var buffer = xlsx.build([{name: "客户信息", data: datas}]);
		var xlsxname = `${mysql.nowDate().split(' ')[0]}.xlsx`;
		fs.writeFile(xlsxname, buffer, 'binary',function(err){
			if (err) {
				callback(err,null);
				return;
			}
			callback(null, xlsxname);
		})
	}

	//发送邮件,返回信息
	var task3 = function(xlsxname, callback){
		mysql.sendMail(xlsxname, function(err, info){
			if (err) {
				callback(err, null);
				return;
			}
			callback(null, info);
		})
	}

	async.waterfall([task1, task2 ,task3], function(err, result){
		if (err) {
			console.log(err);
			return;
		}
		console.log(result);
	})
}

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 18;
rule.minute = 48;

 schedule.scheduleJob(rule, function(){
    auto()
  console.log('Today is recognized by Rebecca Black!');
});


// var rule      = new schedule.RecurrenceRule();
// var times     = [1,6,11,16,21,26,31,36,41,46,51,56];
// rule.second   = times;
// schedule.scheduleJob(rule, function(){
//   auto();
// });