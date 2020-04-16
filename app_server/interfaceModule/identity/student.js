const express = require("express");
const router = express.Router();
const pool = require("../../pool");
const fs = require("fs")
const multer = require('multer');
var upload = multer({dest:"../upload/img/"})

// 学生查询自己的通行记录
router.post("/record",(req,res) => {
    var page = req.body.page;
    var firstLine = (page-1)*10;
    var renId = req.body.renId;
    pool.query(`SELECT in_out_time,in_out_direction FROM tbl_c_in_out WHERE fk_studentid='${renId}' ORDER BY in_out_time DESC LIMIT ${firstLine},10`,(err,result) => {
      if(err) throw err;
      for(let i =0;i<result.length;i++){
        if(result[i].in_out_direction == 1){
          result[i].in_out_direction = '进入宿舍';
          result[i].color_text = 'color_purple'
        }else if(result[i].in_out_direction == 2){
          result[i].in_out_direction = '出入宿舍'
          result[i].color_text = 'color_bonus'
        }
      }
      res.send(result)
    })
})

// 学生申请
router.post("/suspension",(req,res) => {
    var studentId = req.body.studentId;
    pool.query(`SELECT a.*,b.fk_buildingid FROM tbl_c_student AS a LEFT JOIN tbl_c_dorm AS b ON a.fk_dormid=b.id LEFT JOIN tbl_c_building AS c ON b.fk_buildingid=c.id WHERE a.student_no='${studentId}'`,(err,result) => {
      if(err) throw err
      if(result.length == 0){
        res.send({code:400});
      }else{
        res.send({code:100});
        var fk_collegeid = result[0].fk_collegeid;
        var fk_dormid = result[0].fk_dormid;
        var fk_buildingid = result[0].fk_buildingid;
        var fk_classid = result[0].fk_classid;
        router.post("/image",upload.single("file"),(req,res) => {
          var username = req.query.username;
          var cardId = req.query.cardId;
          var appli = req.query.appli;
          var why = req.query.why;
          //创建新图片文件
          var src = req.file.originalname;
          //把查询的时间变成毫秒数
          var fTime = new Date().getTime();
          var fRand = Math.floor(Math.random()*9999);
          //如果上传文件取文件后缀
          var i3 = src.lastIndexOf(".");
          var suff = src.substring(i3,src.length);
          var des = "../upload/img/"+fTime+fRand+suff;
          var dre = des.slice(9);
          var dd="http://zhxy.kezhuangyuan.com"+dre;
          //将临时文件移动到./public/img/user目录下
          fs.renameSync(req.file.path,des);
          var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
          pool.query(`INSERT INTO tbl_c_application(id,application_bz,application_pic1,application_pic2,fk_studentid,application_addtime,fk_collegeid,fk_dormid,fk_buildingid,fk_classid,application_deal_status,application_status) VALUES(null,'${why}','${dd}','${des}','${studentId}','${today}','${fk_collegeid}','${fk_dormid}','${fk_buildingid}','${fk_classid}','1','${appli}')`,(err,result) => {
              if(err) throw err
              res.send({code:200,msg:'提交成功'});
          })
        })
      }
    })
})

// 来访登记
router.post("/visitRegistration",upload.single("file"),(req,res) => {
    var renId = req.query.renId;
    var username = req.query.username;
    var phone = req.query.phone;
    var why = req.query.why;
    var src = req.file.originalname;
    var fTime = new Date().getTime();
    var fRand = Math.floor(Math.random()*9999);
    var i3 = src.lastIndexOf(".");
    var suff = src.substring(i3,src.length);
    var des = "../upload/img/"+fTime+fRand+suff;
    var dre = des.slice(9);
    var dd="http://zhxy.kezhuangyuan.com"+dre;
    fs.renameSync(req.file.path,des);
    var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss"); 
    pool.query(`INSERT INTO tbl_c_visit(id,visit_name,visit_tel,visit_bz,visit_pic,fk_studentid,visit_addtime,visit_status,visit_person_type) VALUES(null,'${username}','${phone}','${why}','${dd}','${renId}','${today}','1','1')`,(err,result) => {
      if(err) throw err;
      res.send({code:100,msg:"提交成功"})
    })
})
// 宿舍报修
router.post("/dormitoryService",(req,res) => {
    var renId = req.body.renId;
    pool.query(`SELECT a.*,b.fk_buildingid FROM tbl_c_student AS a LEFT JOIN tbl_c_dorm AS b ON a.fk_dormid=b.id LEFT JOIN tbl_c_building AS c ON b.fk_buildingid=c.id WHERE a.id='${renId}'`,(err,result) => {
      if(err) throw err;
      if(result.length == 0){
        res.send({code:200,msg:'提交失败'})
      }else{
        res.send({code:100,msg:'查询成功'});
        var fk_collegeid = result[0].fk_collegeid;
        var fk_dormid = result[0].fk_dormid;
        var fk_buildingid = result[0].fk_buildingid;
        var fk_classid = result[0].fk_classid;
        router.post("/serviceImage",upload.single("file"),(req,res) =>{
          var username = req.query.username;
          var phone = req.query.phone;
          var why = req.query.why;
          var src = req.file.originalname;
          var fTime = new Date().getTime();
          var fRand = Math.floor(Math.random()*9999);
          var i3 = src.lastIndexOf(".");
          var suff = src.substring(i3,src.length);
          var des = "../upload/img/"+fTime+fRand+suff;
          var dre = des.slice(9);
          var dd="http://zhxy.kezhuangyuan.com/"+dre;
          fs.renameSync(req.file.path,des);
          var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
          pool.query(`INSERT INTO tbl_c_repair(repair_bz,repair_pic1,fk_studentid,repair_addtime,fk_collegeid,fk_dormid,fk_buildingid,fk_classid,repair_status) VALUES('${why}','${dd}','${renId}','${today}','${fk_collegeid}','${fk_dormid}','${fk_buildingid}','${fk_classid}','1')`,(err,result) => {
            if(err) throw err;
            res.send({code:101,msg:'提交成功'})
          })
        })
      }
    })
})

// 申请进度
router.post("/progress",(req,res) => {
    var renId = req.body.renId;
    pool.query(`SELECT * FROM tbl_c_student WHERE id='${renId}'`,(err,result) => {
      if(err) throw err;
      if(result.length == 0){
        res.send({code:200})
      }else{
        var fk_studentid = result[0].student_no;
        pool.query(`SELECT * FROM tbl_c_application WHERE fk_studentid='${fk_studentid}'`,(err,result) => {
          if(err) throw err;
          for(var i = 0;i<result.length;i++){
            var item = result[i]
            if (item.application_deal_status == 1) {
              item.application_deal_status = 50;
            }else if (item.application_deal_status == 2) {
              item.application_deal_status = 100;
            }
            if(item.application_status == 1){
              item.application_status = '休学申请进度';
            }else if(item.application_status == 2){
              item.application_status = '转学申请进度';
            }else if(item.application_status == 3){
              item.application_status = '退学申请进度';
            }else if(item.application_status == 4){
              item.application_status = '复学申请进度';
            }
          }
          res.send(result);
        })
      }
    })
})
module.exports = router;