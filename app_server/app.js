
const express = require("express");

const pool = require("./pool");
const fs = require("fs")
const app = new express();
var bodyParser = require('body-parser');/*post方法*/
app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({extended: false}));
const multer = require('multer');

//创建目录，将图片保存在此目录
var upload = multer({dest:"../upload/img/"})
app.listen('3000','122.114.120.6');
//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next()
});
const cors = require("cors");
//2:配置cors
app.use(cors({
  origin:["http://122.114.120.6:3001"],//允许列表
  credentials:true   //是否验证
}));
const session = require("express-session");
// // 4.对模块配置
app.use(session({
  secret:"128位随机字符串",//安全令牌
  resave:false,          //请求保存
  saveUninitialized:true,//初始化
  cookie:{         //sessionid保存时间1天 cookie
    maxAge:1000*60*60*24
  }
}))

// 当前时间获取
Date.prototype.Format = function(fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

pool.connect( (err) =>{
  if(err) throw err;
  console.log('链接成功')
})
const admin  = require("./interfaceModule/admin");
//加载模块，用户id从左及页面校园数据展示
app.use("/admin",admin);
const identity  = require("./interfaceModule/identity");
//加载模块，用户身份区域数据功能
app.use("/identity",identity);

// 首页轮播图
// app.post("/shuffling",(req,res) => {
//   let sql = "SELECT * FROM tbl_b_ad";
//   pool.query(sql,(err,result) => {
//     if(err){
//       console.log(err)
//     }else{
//       // console.log(result)
//       res.send(result)
//     }
//   })
// })

// 首页院系介绍部分
// app.post("/indexIntroduce",(req,res) => {
//   var sid = req.query.attributeId
//   pool.query("SELECT * FROM tbl_c_college WHERE  fk_areaid=? LIMIT 0,4",[sid],(err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// 登录页面

// app.post("/login",(req,res) => {
//   var username = req.query.uname;
//   var password = req.query.passw+'lyk';
//   pool.query(`SELECT * FROM tbl_a_admin WHERE username='${username}' AND password=md5(md5('${password}'))`,(err,result) => {
//     if(err) throw err;
//     if(result == ''){
//       res.send({code:0,msg:'用户名或密码不正确'})
//     }else{
//       res.send(result)
//     }
    
//   })
// })

// // 个人资料页
// app.post("/personal",(req,res) => {
//   var Identity = req.query.Identity;
//   var renId = req.query.renId;
//   if(Identity == 1){
//     pool.query(`SELECT * FROM tbl_c_student WHERE id='${renId}'`,(err,result) => {
//         if(err) throw err;
//         res.send(result);
//       })
//   }else if(Identity == 2){
//     pool.query(`SELECT * FROM tbl_c_worker WHERE id='${renId}'`,(err,result) => {
//         if(err) throw err;
//         res.send(result);
//       })
//   }
// })

// // 个人信息微信图
// app.post('/wechat',(req,res) => {
//   var openId = req.query.openId;
//   pool.query(`SELECT * FROM tbl_b_wechat WHERE wechat_openid='${openId}'`,(err,result) => {
//     if(err) throw err;
//     res.send(result);
//   })
// })

// // 注册
// app.post('/registered',(req,res) => {
//   var currents = req.query.currents;
//   var password = req.query.pwd+'lyk';
//   var idCard = req.query.idCard;//身份证
//   var phone = req.query.phone;
//   if(currents == 1){
//     var sql = `SELECT * FROM tbl_c_student WHERE student_sj='${phone}' AND student_sfzh='${idCard}'`
//     var add_desc="学生-微信用户绑定入口加入";
//     var fk_rentype = 1;
//   }else if(currents == 2){
//     var sql = `SELECT * FROM tbl_c_worker WHERE worker_sj='${phone}' AND worker_sfzh='${idCard}'`
//     var add_desc="教职工（辅导员）-微信用户绑定入口加入";
//     var fk_rentype = 2;
//   }else if(currents == 3){
//     var sql = `SELECT * FROM tbl_c_worker WHERE worker_sj='${phone}' AND worker_sfzh='${idCard}'`
//     var add_desc="教职工（宿管）-微信用户绑定入口加入";
//     var fk_rentype = 2;
//   }else if(currents == 5){
//     var sql = `SELECT * FROM tbl_c_student WHERE student_sfzh='${idCard}'`
//     var add_desc="学生家长-微信用户绑定入口加入";
//     var fk_rentype = 3;
//   }else if(currents == 6){
//     var sql = `SELECT * FROM tbl_c_worker WHERE worker_sj='${phone}' AND worker_sfzh='${idCard}'`
//     var add_desc="教职工（学生处）-微信用户绑定入口加入";
//     var fk_rentype = 2;
//   }
//   pool.query(sql,(err,result) => {
//     if(err) throw err;
//     if(result == ''){
//       res.send({code:0,msg:'您输入的手机号和身份证号与系统预留不一致！'})
//     }else{
//       var fk_renid = result[0].id;
//       pool.query(`SELECT * FROM tbl_a_admin WHERE username='${phone}'`,(err,result) => {
//         if(err) throw err;
//         if(result == ''){
//             pool.query(`INSERT INTO tbl_a_admin(id,username,password,logintimes,logintime,lasttime,add_time,mod_time,loginip,zt,chao,bz,fk_userid,fk_roleid,fk_roletype,fk_rentype,fk_renid,fk_wxopenid) VALUES (null,'${phone}',md5(md5('${password}')),null,null,null,null,null,null,'1','2','${add_desc}',null,'${currents}','${currents}','${fk_rentype}','${fk_renid}',null)`,(err,result) => {
//             if(err) throw err;
//               res.send({code:true,msg:'注册成功！'});
//           })
//         }else{
//           res.send({code:1,msg:'该手机号已注册！'})
//         }
//       })
//     }
//     // 先查询对应的身份表，管理员的，老师的，在查询admin看看手机号时候已经注册，最后写入admin表格
//   })
// });

// 首页院系介绍跳转的详情页面
// app.post("/indexDetail",(req,res) => {
//   var id =req.query.parameter;
//   pool.query(`SELECT * FROM tbl_c_college WHERE  id='${id}'`,(err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// });

// // 院系介绍
// app.post("/departmentsIntroduce",(req,res) => {
//   var page = req.query.page;
//   var firstLine = (page-1)*8;
//   pool.query(`SELECT * FROM tbl_c_college LIMIT ${firstLine},8`,(err,result) => {
//     if(err) throw err;
//       res.send(result);
//   })
// })

// // 校园动态
// app.post("/campusDynamic",(req,res) => {
//   var page = req.query.page;
//   var firstLine = (page-1)*6;
//   pool.query(`select * from tbl_b_dt_content order by id desc LIMIT ${firstLine},6`,(err,result) => {
//     if(err) throw err;
//       res.send(result);
//   })
// });

// // 校园动态详情
// app.post("/dynamicDeta",(req,res) => {
//   var id =req.query.parameter;
//   pool.query(`SELECT * FROM tbl_b_dt_content WHERE  id='${id}'`,(err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// });

// // 通知公告

// app.post("/announcementsList",(req,res) => {
//   var page = req.query.page;
//   var firstLine = (page-1)*5;
//   pool.query(`select * from tbl_b_tongzhi_content order by id desc LIMIT ${firstLine},5`,(err,result) => {
//     if(err) throw err;
//       for(let i =0;i<result.length;i++){
//         result[i].isFload = true;
//       }
//       res.send(result);
//     // }
//   })
// });

// // 学生查询自己的通行记录
// app.post("/record",(req,res) => {
//   var page = req.query.page;
//   var firstLine = (page-1)*10;
//   var renId = req.query.renId;
//   pool.query(`SELECT in_out_time,in_out_direction FROM tbl_c_in_out WHERE fk_studentid='${renId}' ORDER BY in_out_time DESC LIMIT ${firstLine},10`,(err,result) => {
//     if(err) throw err;
//     for(let i =0;i<result.length;i++){
//       if(result[i].in_out_direction == 1){
//         result[i].in_out_direction = '进入宿舍';
//         result[i].color_text = 'color_purple'
//       }else if(result[i].in_out_direction == 2){
//         result[i].in_out_direction = '出入宿舍'
//         result[i].color_text = 'color_bonus'
//       }
//     }
//     res.send(result)
//   })
// })

// 修改密码
// app.post("/changePwd",(req,res) => {
//   var nameId = req.query.nameId;
//   var original = req.query.original+'lyk';
//   var newpwd = req.query.newpwd+'lyk';
//   pool.query(`select * from tbl_a_admin where username='${nameId}' and password=md5(md5('${original}'))`,(err,result) => {
//     if(err) throw err
//     if(result == ''){
//       res.send({code:1})
//     }else{
//       pool.query(`update tbl_a_admin SET password = md5(md5('${newpwd}')) WHERE username = '${nameId}'`,(err,result) => {
//         if(err) throw err
//         res.send({code:2})
//       })
//     }
//   })
// })

// // 学生申请
// app.post("/suspension",(req,res) => {
//   var studentId = req.query.studentId;
//   pool.query(`SELECT a.*,b.fk_buildingid FROM tbl_c_student AS a LEFT JOIN tbl_c_dorm AS b ON a.fk_dormid=b.id LEFT JOIN tbl_c_building AS c ON b.fk_buildingid=c.id WHERE a.student_no='${studentId}'`,(err,result) => {
//     if(err) throw err
//     if(result.length == 0){
//       res.send({code:400});
//     }else{
//       res.send({code:100});
//       var fk_collegeid = result[0].fk_collegeid;
//       var fk_dormid = result[0].fk_dormid;
//       var fk_buildingid = result[0].fk_buildingid;
//       var fk_classid = result[0].fk_classid;
//       app.post("/image",upload.single("file"),(req,res) => {
//         var username = req.query.username;
//         var cardId = req.query.cardId;
//         var appli = req.query.appli;
//         var why = req.query.why;
//         //创建新图片文件
//         var src = req.file.originalname;
//         //把查询的时间变成毫秒数
//         var fTime = new Date().getTime();
//         var fRand = Math.floor(Math.random()*9999);
//         //如果上传文件取文件后缀
//         var i3 = src.lastIndexOf(".");
//         var suff = src.substring(i3,src.length);
//         var des = "../upload/img/"+fTime+fRand+suff;
//         var dre = des.slice(9);
//         var dd="http://zhxy.kezhuangyuan.com/"+dre;
//         //将临时文件移动到./public/img/user目录下
//         fs.renameSync(req.file.path,des);
//         var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
//         console.log(username+'-'+studentId+'-'+cardId+'-'+appli) 
//         pool.query(`INSERT INTO tbl_c_application(id,application_bz,application_pic1,application_pic2,fk_studentid,application_addtime,fk_collegeid,fk_dormid,fk_buildingid,fk_classid,application_deal_status,application_status) VALUES(null,'${why}','${dd}','${des}','${studentId}','${today}','${fk_collegeid}','${fk_dormid}','${fk_buildingid}','${fk_classid}','1','${appli}')`,(err,result) => {
//             if(err) throw err
//             res.send({code:200,msg:'提交成功'});
//         })
//       })
//     }
//   })
// })

// // 来访登记
// app.post("/visitRegistration",upload.single("file"),(req,res) => {
//   var renId = req.query.renId;
//   var username = req.query.username;
//   var phone = req.query.phone;
//   var why = req.query.why;
//   var src = req.file.originalname;
//   var fTime = new Date().getTime();
//   var fRand = Math.floor(Math.random()*9999);
//   var i3 = src.lastIndexOf(".");
//   var suff = src.substring(i3,src.length);
//   var des = "../upload/img/"+fTime+fRand+suff;
//   var dre = des.slice(9);
//   var dd="http://zhxy.kezhuangyuan.com/"+dre;
//   fs.renameSync(req.file.path,des);
//   var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss"); 
//   pool.query(`INSERT INTO tbl_c_visit(id,visit_name,visit_tel,visit_bz,visit_pic,fk_studentid,visit_addtime,visit_status,visit_person_type) VALUES(null,'${username}','${phone}','${why}','${dd}','${renId}','${today}','1','1')`,(err,result) => {
//     if(err) throw err;
//     res.send({code:100,msg:"提交成功"})
//   })
// })

// 宿舍报修
// app.post("/dormitoryService",(req,res) => {
//   var renId = req.query.renId;
//   pool.query(`SELECT a.*,b.fk_buildingid FROM tbl_c_student AS a LEFT JOIN tbl_c_dorm AS b ON a.fk_dormid=b.id LEFT JOIN tbl_c_building AS c ON b.fk_buildingid=c.id WHERE a.id='${renId}'`,(err,result) => {
//     if(err) throw err;
//     if(result.length == 0){
//       res.send({code:200,msg:'提交失败'})
//     }else{
//       res.send({code:100,msg:'查询成功'});
//       var fk_collegeid = result[0].fk_collegeid;
//       var fk_dormid = result[0].fk_dormid;
//       var fk_buildingid = result[0].fk_buildingid;
//       var fk_classid = result[0].fk_classid;
//       app.post("/serviceImage",upload.single("file"),(req,res) =>{
//         var username = req.query.username;
//         var phone = req.query.phone;
//         var why = req.query.why;
//         var src = req.file.originalname;
//         var fTime = new Date().getTime();
//         var fRand = Math.floor(Math.random()*9999);
//         var i3 = src.lastIndexOf(".");
//         var suff = src.substring(i3,src.length);
//         var des = "../upload/img/"+fTime+fRand+suff;
//         var dre = des.slice(9);
//         var dd="http://zhxy.kezhuangyuan.com/"+dre;
//         fs.renameSync(req.file.path,des);
//         var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
//         pool.query(`INSERT INTO tbl_c_repair(repair_bz,repair_pic1,fk_studentid,repair_addtime,fk_collegeid,fk_dormid,fk_buildingid,fk_classid,repair_status) VALUES('${why}','${dd}','${renId}','${today}','${fk_collegeid}','${fk_dormid}','${fk_buildingid}','${fk_classid}','1')`,(err,result) => {
//           if(err) throw err;
//           res.send({code:101,msg:'提交成功'})
//         })
//       })
//     }
//   })
// })

// // 申请进度
// app.post("/progress",(req,res) => {
//   var renId = req.query.renId;
//   pool.query(`SELECT * FROM tbl_c_student WHERE id='${renId}'`,(err,result) => {
//     if(err) throw err;
//     if(result.length == 0){
//       res.send({code:200})
//     }else{
//       var fk_studentid = result[0].student_no;
//       pool.query(`SELECT * FROM tbl_c_application WHERE fk_studentid='${fk_studentid}'`,(err,result) => {
//         if(err) throw err;
//         for(var i = 0;i<result.length;i++){
//           var item = result[i]
//           if (item.application_deal_status == 1) {
//             item.application_deal_status = 50;
//           }else if (item.application_deal_status == 2) {
//             item.application_deal_status = 100;
//           }
//           if(item.application_status == 1){
//             item.application_status = '休学申请进度';
//           }else if(item.application_status == 2){
//             item.application_status = '转学申请进度';
//           }else if(item.application_status == 3){
//             item.application_status = '退学申请进度';
//           }else if(item.application_status == 4){
//             item.application_status = '复学申请进度';
//           }
//         }
//         res.send(result);
//       })
//     }
//   })
// })

// // 辅导员，学生处，宿管看学生通行记录
// app.post("/recordsInitial",(req,res) => {
//   var identityName = req.query.identityName;
//   var nameId = req.query.nameId;
//   var page = req.query.page;
//   var firstLine = (page-1)*6;
//   if(identityName == 14){
//     pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='辅导员'`,(err,result) => {
//       if(err) throw err;
//       var worker_qx_json = result[0].worker_qx_json;
//       var worker = eval(worker_qx_json);
//       var str = "";
//       for (var i = 0; i < worker.length; i++) {
//           str += worker[i]+ ",";
//       }
//       if (str.length > 0) {
//           str = str.substr(0, str.length - 1);
//       }
//       pool.query(`SELECT a.*,b.student_name,d.pass_name,c.dorm_name,g.class_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN tbl_c_dorm AS c ON a.fk_dormid=c.id LEFT JOIN(select id,pass_name from tbl_c_pass) as d ON d.id=a.fk_passid LEFT JOIN tbl_c_class AS g ON b.fk_classid=g.id where 1=1 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) and g.id in(${str}) ORDER by a.in_out_time DESC LIMIT ${firstLine},6`,(err,result) => {
//         if(err) throw err;
//         if(result.length == 0){
//           res.send({code:200,msg:'无通行记录'})
//         }else{
//           for(var i = 0;i<result.length;i++){
//             if(result[i].in_out_direction == 1){
//               result[i].in_out_direction = '入';
//               result[i].color_text = 'records-purple'
//             }else if(result[i].in_out_direction == 2){
//               result[i].in_out_direction = '出';
//               result[i].color_text = 'records-bonus'
//             }else if(result[i].in_out_direction == 0){
//               result[i].in_out_direction = '未知';
//               result[i].color_text = 'records-bonus'
//             }
//           }
//           res.send(result)
//         }
//       })
//     })
//   }else if(identityName == 144){
//     pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='楼管'`,(err,result) => {
//       if(err) throw err;
//       var worker_qx_json = result[0].worker_qx_json;
//       var worker = eval(worker_qx_json);
//       var str = "";
//       for (var i = 0; i < worker.length; i++) {
//           str += worker[i]+ ",";
//       }
//       if (str.length > 0) {
//           str = str.substr(0, str.length - 1);
//       }
//       pool.query(`SELECT a.*,b.student_name,c.class_name,d.pass_name,e.building_no,e.building_short_name,g.dorm_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN tbl_c_class AS c ON a.fk_classid=c.id LEFT JOIN(select id,pass_name from tbl_c_pass) as d ON d.id=a.fk_passid LEFT JOIN (select id,building_no,building_short_name from tbl_c_building) as e ON e.id=a.fk_buildingid LEFT JOIN tbl_c_dorm AS g ON b.fk_dormid=g.id LEFT JOIN tbl_c_building AS h ON h.id=g.fk_buildingid where 1=1 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) and h.id in(${str}) ORDER by a.in_out_time DESC LIMIT ${firstLine},6`,(err,result) => {
//         if(err) throw err;
//         if(result.length == 0){
//           res.send({code:200,msg:'无通行记录'})
//         }else{
//           for(var i = 0;i<result.length;i++){
//             if(result[i].in_out_direction == 1){
//               result[i].in_out_direction = '入';
//               result[i].color_text = 'records-purple'
//             }else if(result[i].in_out_direction == 2){
//               result[i].in_out_direction = '出';
//               result[i].color_text = 'records-bonus'
//             }else if(result[i].in_out_direction == 0){
//               result[i].in_out_direction = '未知';
//               result[i].color_text = 'records-bonus'
//             }
//           }
//           res.send(result)
//         }
//       })
//     })
//   }else if(identityName == 18){
//     pool.query(`SELECT a.*,b.student_name,d.pass_name,c.dorm_name,g.class_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN tbl_c_dorm AS c ON a.fk_dormid=c.id LEFT JOIN(select id,pass_name from tbl_c_pass) as d ON d.id=a.fk_passid LEFT JOIN tbl_c_class AS g ON b.fk_classid=g.id where 1=1 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) ORDER by a.in_out_time DESC LIMIT ${firstLine},6`,(err,result) => {
//       if(err) throw err;
//         if(result.length == 0){
//           res.send({code:200,msg:'无通行记录'})
//         }else{
//           for(var i = 0;i<result.length;i++){
//             if(result[i].in_out_direction == 1){
//               result[i].in_out_direction = '入';
//               result[i].color_text = 'records-purple'
//             }else if(result[i].in_out_direction == 2){
//               result[i].in_out_direction = '出';
//               result[i].color_text = 'records-bonus'
//             }else if(result[i].in_out_direction == 0){
//               result[i].in_out_direction = '未知';
//               result[i].color_text = 'records-bonus'
//             }
//           }
//           res.send(result)
//         }
//     })
//   }
// })

// // 不在请情况统计
// app.post("/bedroom",(req,res) => {
//   var nameId = req.query.nameId;
//   pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='辅导员'`,(err,result) => {
//     if(err) throw err;
//     var worker_qx_json = result[0].worker_qx_json;
//     var worker = eval(worker_qx_json);
//     var str = "";
//     for (var i = 0; i < worker.length; i++) {
//         str += worker[i]+ ",";
//     }
//     if (str.length > 0) {
//         str = str.substr(0, str.length - 1);
//     }
//     pool.query(`SELECT * FROM tbl_c_class WHERE id IN(${str})`,(err,result) => {
//       if(err) throw err;
//       var id = result[0].id;
//       var class_short_name = result[0].class_short_name;
//       for(var i=0;i<result.length;i++){
//         var item = result[i].class_short_name;
//         var id = result[i].id;
//         var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
//         pool.query(`SELECT * FROM tbl_c_student WHERE fk_classid='${id}'`,(err,result) => {
//           if(err) throw err;
//           var totai = result.length;
//           pool.query(`SELECT a.*,c.student_name FROM tbl_d_in_out AS a LEFT JOIN tbl_c_class AS b ON a.fk_classid=b.id LEFT JOIN tbl_c_student AS c ON a.fk_studentid=c.id WHERE in_out_direction=2 AND b.id in(${str}) AND a.in_out_time LIKE '${today}'`,(err,result) => {
//             if(err) throw err;
//             var notIn = result.length;
//             res.send([{code:totai,msg:item,notIn:notIn,num:result}])
//           })
//         })
//       }
//     })
//   })
// })

// // 辅导员看班级学生异常通行记录
// app.post("/nightBack",(req,res) => {
//   var nameId = req.query.nameId;
//   var abnormal = req.query.abnormal;
//   pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='辅导员'`,(err,result) => {
//     if(err) throw err;
//     var worker_qx_json = result[0].worker_qx_json;
//     var worker = eval(worker_qx_json);
//     var str = "";
//     for (var i = 0; i < worker.length; i++) {
//         str += worker[i]+ ",";
//     }
//     if (str.length > 0) {
//         str = str.substr(0, str.length - 1);
//     }
//     if(abnormal == 1){//彻夜未归
//       pool.query(`SELECT a.*,b.* FROM tbl_c_in_out AS a LEFT JOIN tbl_c_class AS b ON a.fk_classid=b.id where UNIX_TIMESTAMP(a.in_out_time) BETWEEN UNIX_TIMESTAMP(CURDATE())-3600*2 AND UNIX_TIMESTAMP(CURDATE())+3600*6 and a.fk_studentid>0 and a.in_out_direction=1 and a.fk_classid in(${str}) ORDER BY a.in_out_time DESC`,(err,result) => {
//         if(err) throw err;
//         var student_id = "";
//         for(var i=0;i<result.length;i++){
//           student_id += result[i].fk_studentid+ ",";
//         }
//         pool.query(`SELECT a.fk_studentid FROM tbl_d_in_out AS a LEFT JOIN tbl_c_class AS b ON a.fk_classid=b.id where UNIX_TIMESTAMP(a.in_out_time) BETWEEN UNIX_TIMESTAMP(CURDATE())-3600*18 AND UNIX_TIMESTAMP(CURDATE())-3600*2 AND b.id in(${str}) and a.in_out_direction=1 group by a.fk_studentid`,(err,result) => {
//           if(err) throw err;
//           var fkstudent_id = "";
//           for(var i=0;i<result.length;i++){
//             if (fkstudent_id == "")
//             {
//               fkstudent_id = result[i].fk_studentid
//             }else{
//               fkstudent_id = fkstudent_id + ',' + result[i].fk_studentid
//             }
//           }
//           if(student_id == 0 && fkstudent_id == 0){
//             var sid = ''
//           }else if(student_id != 0 && fkstudent_id != 0){
//             var sid = student_id + ',' + fkstudent_id;
//           }else if(student_id != 0){
//             var sid = student_id
//           }else{
//             var sid = fkstudent_id
//           }
//           pool.query(`SELECT a.*,b.class_short_name,b.class_name,d.dorm_no,d.dorm_name from (tbl_c_student as a LEFT JOIN tbl_c_class as b ON a.fk_classid=b.id) LEFT JOIN (select id,dorm_no,dorm_name from tbl_c_dorm) as d ON d.id=a.fk_dormid where 1=1 ${sid} AND b.id IN(${str}) ORDER by id DESC`,(err,result) => {
//             if(err) throw err;
//             res.send(result);
//           })
//         })
//       })
//     }else if(abnormal == 2){//晚归
//      pool.query(`SELECT a.*,b.student_name,b.student_sj,b.student_sex,c.dorm_no,c.dorm_name,o.class_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN (select id,dorm_no,dorm_name from tbl_c_dorm) as c ON c.id=a.fk_dormid LEFT JOIN(select id,class_name from tbl_c_class) as o on o.id=a.fk_classid where 1=1 and UNIX_TIMESTAMP(in_out_time) BETWEEN UNIX_TIMESTAMP(CURDATE())-3600*2 AND UNIX_TIMESTAMP(CURDATE())+3600*5 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) and a.in_out_direction=1 and a.fk_studentid>0 and o.id in(${str}) ORDER by a.in_out_time`,(err,result) => {
//       if(err) throw err;
//       res.send(result);
//       }) 
//     }else if(abnormal == 3){//早出
//       pool.query(`SELECT a.*,b.student_name,b.student_sj,b.student_sex,c.dorm_no,c.dorm_name,o.class_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN (select id,dorm_no,dorm_name from tbl_c_dorm) as c ON c.id=a.fk_dormid LEFT JOIN(select id,class_name from tbl_c_class) as o on o.id=a.fk_classid where 1=1 and UNIX_TIMESTAMP(in_out_time) BETWEEN UNIX_TIMESTAMP(CURDATE())-3600*2 AND UNIX_TIMESTAMP(CURDATE())+3600*5 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) and a.in_out_direction=2 and a.fk_studentid>0 and o.id in(${str}) ORDER by a.in_out_time`,(err,result) => {
//         if(err) throw err;
//         res.send(result);
//       })
//     }else if(abnormal == 4  ){//一周无通行记录
//       pool.query(`SELECT a.fk_studentid FROM tbl_c_in_out AS a LEFT JOIN tbl_c_class AS b ON a.fk_classid=b.id WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(in_out_time) AND fk_studentid>0 AND a.fk_classid IN(${str}) GROUP BY fk_studentid`,(err,result) => {
//         if(err) throw err;
//         var studentid = "";
//         for(var i=0;i<result.length;i++){
//           if (studentid == "")
//           {
//             studentid = result[i].fk_studentid
//           }else{
//             studentid = studentid + ',' + result[i].fk_studentid
//           }
//         }
//         pool.query(`SELECT a.*,b.class_short_name,b.class_name,c.college_short_name,d.dorm_name,d.dorm_no,e.specialty_short_name,f.opendoor_qx_name,g.bed_no,o.fk_studentid,o.student_face_pic1 from (tbl_c_student as a LEFT JOIN tbl_c_class as b ON a.fk_classid=b.id) LEFT JOIN (select id,college_short_name from tbl_c_college) as c ON c.id=a.fk_collegeid LEFT JOIN (select id,dorm_no,dorm_name from tbl_c_dorm) as d ON d.id=a.fk_dormid LEFT JOIN(select id,specialty_short_name from tbl_c_specialty) as e ON e.id=a.fk_specialtyid  LEFT JOIN(select id,opendoor_qx_name from tbl_c_opendoor) as f ON f.id=a.fk_opendoorqxid LEFT JOIN(select id,bed_no from tbl_c_bed) as g on g.id=a.fk_bedid LEFT JOIN tbl_c_student_face as o ON o.fk_studentid=a.id where 1=1 and b.id in(${str}) and a.id not in('${studentid}') ORDER by id DESC`,(err,result) => {
//           if(err) throw err;
//           res.send(result)
//         })
//       })
//     }
//   })
// })

// 忘记密码，手机验证部分
// app.post("/validationPhone",(req,res) => {
//   var phone = req.query.phone;
//   pool.query(`SELECT * FROM tbl_a_admin WHERE username='${phone}'`,(err,result) => {
//     if(err) throw err;
//     if(result.length == 0){
//       res.send({code:200,msg:'手机号不存在'})
//     }else{
//       res.send({code:100,msg:'验证通过'})
//     }
//   })
// })

// 修改新密码
// app.post("/modifyPwd",(req,res) => {
//   var nameId = req.query.nameId;
//   var passwd = req.query.passwd;
//   pool.query(`update tbl_a_admin SET password = md5(md5('${passwd}')) WHERE username = '${nameId}'`,(err,result) => {
//     if(err) throw err;
//     if(result.length == 0){
//       res.send({code:200,msg:'修改失败'})
//     }else{
//       res.send({code:100,msg:'修改成功'})
//     }
//   })
// })

 // 手机号绑定
// app.post("/binding",(req,res) => {
//   var phone = req.query.phong;
//   var openId = req.query.openId;
//   var nameId = req.query.nameId;
//   pool.query(`update tbl_b_wechat_person set person_sj='${phone}',person_sj_modify=1 where person_openid='${openId}'`,(err,result) => {
//     if(err) throw err;
//     res.send({code:100,msg:'绑定成功'})
//   })
// })

// // 宿管看报修
// app.post("/apprivalTu",(req,res) => {
//   pool.query(`SELECT a.*,b.student_name,c.dorm_name FROM tbl_c_repair AS a LEFT JOIN tbl_c_student AS b ON a.fk_studentid=b.id LEFT JOIN tbl_c_dorm AS c ON a.fk_dormid=c.id WHERE a.repair_status=1`,(err,result) => {
//     if(err) throw err;
//     res.send(result)
//   })
// })

// // 学生处审批申请
// app.post("/schoolBatch",(req,res) => {
//   pool.query(`SELECT a.*,b.student_name FROM tbl_c_application AS a LEFT JOIN tbl_c_student AS b ON a.fk_studentid=b.id  WHERE a.application_deal_status=1 ORDER BY application_addtime DESC`,(err,result) => {
//     if(err) throw err;
//     for(var i=0;i<result.length;i++){
//       var item = result[i];
//       if(item.application_status == 1){
//         item.application_status = '申请休学';
//       }else if(item.application_status == 2){
//         item.application_status = '申请转学';
//       }else if(item.application_status == 3){
//         item.application_status = '申请退学';
//       }else if(item.application_status == 4){
//         item.application_status = '申请复学';
//       }
//     }
//     res.send(result);
//   })
// })

// // 学生申请审批提交
// app.post("/schoolAudit",(req,res) => {
//   var studentId = req.query.studentId;
//   var note = req.query.note;
//   var keyTime = req.query.keyTime;
//   var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
//   pool.query(`UPDATE tbl_c_application SET application_deal_bz='${note}',application_finishtime='${today}', application_opendoor_dealy=${keyTime}, application_deal_status=2 WHERE id=${studentId}`,(err,result) => {
//     if(err) throw err;
//     if(result.length == 0){
//       res.send({code:200,msg:'处理失败'})
//     }else{
//       res.send({code:100,msg:'处理成功'})
//     }
//   })
// })
// // 宿舍报修处理
// app.post("/dealWith",(req,res) => {
//   var dealId = req.query.dealId;
//   pool.query(`UPDATE tbl_c_repair SET repair_status=3 WHERE id=${dealId}`,(err,result) => {
//     if(err) throw err;
//     if(result.length == 0){
//       res.send({code:200,msg:'处理失败'})
//     }else{
//       res.send({code:100,msg:'处理成功'})
//     }
//   })
// })
                                // 下部未完善
// 家长看孩子的异常记录
// app.post("/elders",(req,res) => {
//   var renId = req.query.renId;
//   pool.query(`SELECT fk_studentid FROM tbl_d_in_out_abnormal where DATE(in_out_entering_time) =DATE(CURDATE()-1) and in_out_abnormal=3 and fk_studentid=${renId}`,(err,result) => {
//     if(err) throw err;
//     var night = result;
//     pool.query(`SELECT fk_studentid,in_out_enter_time FROM tbl_d_in_out_abnormal where DATE(in_out_entering_time) =DATE(CURDATE()-1) and in_out_abnormal=2 and fk_studentid=${renId}`,(err,result) => {
//       if(err) throw err;
//       var late = result;
//       pool.query(`SELECT fk_studentid,in_out_come_time FROM tbl_d_in_out_abnormal where DATE(in_out_entering_time) =DATE(CURDATE()-1) and in_out_abnormal=1 and fk_studentid=${renId}`,(err,result) => {
//         if(err) throw err;
//         var early = result;
//         pool.query(`SELECT fk_studentid FROM tbl_c_in_out WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(in_out_time) AND fk_studentid>0 AND fk_studentid in(${renId}) GROUP BY fk_studentid`,(err,result) => {
//           if(err) throw err;
//           var record = result;
//           res.send({night},{late},{early},{record})
//         })
//       })
//     })
//   })
// })

// // 数据统计根据时间
// app.post("/accordingTime",(req,res) => {
//   var nameId = req.query.nameId;
//   var typeData = req.query.typeData;
//   var timeData = req.query.timeData;
//   pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='辅导员'`,(err,result) => {
//     if(err) throw err;
//     var worker_qx_json = result[0].worker_qx_json;
//     var worker = eval(worker_qx_json);
//     var str = "";
//     for (var i = 0; i < worker.length; i++) {
//         str += worker[i]+ ",";
//     }
//     if (str.length > 0) {
//         str = str.substr(0, str.length - 1);
//     }

//   })
// })
// // 数据统计根据类型
// app.post("/accordingType",(req,res) => {
//   var nameId = req.query.nameId;
//   var typeData = req.query.typeData;
//   var timeData = req.query.timeData;
//   pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='辅导员'`,(err,result) => {
//     if(err) throw err;
//     var worker_qx_json = result[0].worker_qx_json;
//     var worker = eval(worker_qx_json);
//     var str = "";
//     for (var i = 0; i < worker.length; i++) {
//         str += worker[i]+ ",";
//     }
//     if (str.length > 0) {
//         str = str.substr(0, str.length - 1);
//     }

//   })
// })