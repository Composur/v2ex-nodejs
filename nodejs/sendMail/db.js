var nodemailer = require('nodemailer');  
var db    = {};  

//发送邮件,带附件
db.sendMail = function (xlsxname, callback) {

  var transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
      user: '541157208@qq.com',
      pass: 'yfdorjoipayybfjh'   
    }
  });

  var mailOptions = {
    from: '541157208@qq.com', //你的邮箱
    to: `2453555631@qq.com`, //你老板的邮箱
    subject: '今天的客户数据，格式自己处理下!', 
    html: `<h2>里面的具体的信息</h2>` ,
    attachments:[{
    	filename : xlsxname,
    	path : `./${xlsxname}`
    }]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      callback(error,null);
    }else{
      callback(null,info);
    }
  });
}

//格式化当前时间
db.nowDate = function(){
	var date = new Date();
	var fmtTwo = function (number) {
    return (number < 10 ? '0' : '') + number;
  }
 	var yyyy = date.getFullYear();
  var MM = fmtTwo(date.getMonth() + 1);
  var dd = fmtTwo(date.getDate());

  var HH = fmtTwo(date.getHours());
  var mm = fmtTwo(date.getMinutes());
  var ss = fmtTwo(date.getSeconds());

  return '' + yyyy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss;

}  
module.exports = db; 