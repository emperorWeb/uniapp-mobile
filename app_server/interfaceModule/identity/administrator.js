const express = require("express");
const router = express.Router();
const pool = require("../../pool");

// 辅导员，学生处，宿管看学生通行记录
router.post("/recordsInitial",(req,res) => {
    var identityName = req.body.identityName;
    var nameId = req.body.nameId;
    var page = req.body.page;
    var firstLine = (page-1)*6;
    if(identityName == 14){
      pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='辅导员'`,(err,result) => {
        if(err) throw err;
        var worker_qx_json = result[0].worker_qx_json;
        var worker = eval(worker_qx_json);
        var str = "";
        for (var i = 0; i < worker.length; i++) {
            str += worker[i]+ ",";
        }
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
        pool.query(`SELECT a.*,b.student_name,d.pass_name,c.dorm_name,g.class_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN tbl_c_dorm AS c ON a.fk_dormid=c.id LEFT JOIN(select id,pass_name from tbl_c_pass) as d ON d.id=a.fk_passid LEFT JOIN tbl_c_class AS g ON b.fk_classid=g.id where 1=1 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) and g.id in(${str}) ORDER by a.in_out_time DESC LIMIT ${firstLine},6`,(err,result) => {
          if(err) throw err;
          if(result.length == 0){
            res.send({code:200,msg:'无通行记录'})
          }else{
            for(var i = 0;i<result.length;i++){
              if(result[i].in_out_direction == 1){
                result[i].in_out_direction = '入';
                result[i].color_text = 'records-purple'
              }else if(result[i].in_out_direction == 2){
                result[i].in_out_direction = '出';
                result[i].color_text = 'records-bonus'
              }else if(result[i].in_out_direction == 0){
                result[i].in_out_direction = '未知';
                result[i].color_text = 'records-bonus'
              }
            }
            res.send(result)
          }
        })
      })
    }else if(identityName == 144){
      pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='楼管'`,(err,result) => {
        if(err) throw err;
        var worker_qx_json = result[0].worker_qx_json;
        var worker = eval(worker_qx_json);
        var str = "";
        for (var i = 0; i < worker.length; i++) {
            str += worker[i]+ ",";
        }
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
        pool.query(`SELECT a.*,b.student_name,c.class_name,d.pass_name,e.building_no,e.building_short_name,g.dorm_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN tbl_c_class AS c ON a.fk_classid=c.id LEFT JOIN(select id,pass_name from tbl_c_pass) as d ON d.id=a.fk_passid LEFT JOIN (select id,building_no,building_short_name from tbl_c_building) as e ON e.id=a.fk_buildingid LEFT JOIN tbl_c_dorm AS g ON b.fk_dormid=g.id LEFT JOIN tbl_c_building AS h ON h.id=g.fk_buildingid where 1=1 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) and h.id in(${str}) ORDER by a.in_out_time DESC LIMIT ${firstLine},6`,(err,result) => {
          if(err) throw err;
          if(result.length == 0){
            res.send({code:200,msg:'无通行记录'})
          }else{
            for(var i = 0;i<result.length;i++){
              if(result[i].in_out_direction == 1){
                result[i].in_out_direction = '入';
                result[i].color_text = 'records-purple'
              }else if(result[i].in_out_direction == 2){
                result[i].in_out_direction = '出';
                result[i].color_text = 'records-bonus'
              }else if(result[i].in_out_direction == 0){
                result[i].in_out_direction = '未知';
                result[i].color_text = 'records-bonus'
              }
            }
            res.send(result)
          }
        })
      })
    }else if(identityName == 18){
      pool.query(`SELECT a.*,b.student_name,d.pass_name,c.dorm_name,g.class_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN tbl_c_dorm AS c ON a.fk_dormid=c.id LEFT JOIN(select id,pass_name from tbl_c_pass) as d ON d.id=a.fk_passid LEFT JOIN tbl_c_class AS g ON b.fk_classid=g.id where 1=1 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) ORDER by a.in_out_time DESC LIMIT ${firstLine},6`,(err,result) => {
        if(err) throw err;
          if(result.length == 0){
            res.send({code:200,msg:'无通行记录'})
          }else{
            for(var i = 0;i<result.length;i++){
              if(result[i].in_out_direction == 1){
                result[i].in_out_direction = '入';
                result[i].color_text = 'records-purple'
              }else if(result[i].in_out_direction == 2){
                result[i].in_out_direction = '出';
                result[i].color_text = 'records-bonus'
              }else if(result[i].in_out_direction == 0){
                result[i].in_out_direction = '未知';
                result[i].color_text = 'records-bonus'
              }
            }
            res.send(result)
          }
      })
    }
})

// 家长看孩子的异常记录
router.post("/elders",(req,res) => {
    var studentsId = req.body.studentsId;
    
    pool.query(`SELECT fk_studentid FROM tbl_d_in_out_abnormal where DATE(in_out_entering_time) =DATE(CURDATE()-1) and in_out_abnormal=3 and fk_studentid=${studentsId}`,(err,result) => {
      if(err) throw err;
      var item = new Array();
      for(var i=0;i<result.length;i++){
        item.push({abnormal:result[i].in_out_abnormal,come_time:result[i].in_out_come_time})
      }
      pool.query(`SELECT fk_studentid,in_out_enter_time FROM tbl_d_in_out_abnormal where DATE(in_out_entering_time) =DATE(CURDATE()-1) and in_out_abnormal=2 and fk_studentid=${studentsId}`,(err,result) => {
        if(err) throw err;
        for(var i=0;i<result.length;i++){
          item.push({abnormal:result[i].in_out_abnormal,come_time:result[i].in_out_come_time})
        }
        pool.query(`SELECT fk_studentid,in_out_come_time FROM tbl_d_in_out_abnormal where DATE(in_out_entering_time) =DATE(CURDATE()-1) and in_out_abnormal=1 and fk_studentid=${studentsId}`,(err,result) => {
          if(err) throw err;
          for(var i=0;i<result.length;i++){
            item.push({abnormal:result[i].in_out_abnormal,come_time:result[i].in_out_come_time})
          }
          pool.query(`SELECT fk_studentid FROM tbl_c_in_out WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(in_out_time) AND fk_studentid>0 AND fk_studentid in(${studentsId}) GROUP BY fk_studentid`,(err,result) => {
            if(err) throw err;
            for(var i=0;i<result.length;i++){
              item.push({abnormal:result[i].in_out_abnormal,come_time:result[i].in_out_come_time})
            }
            if(item.adnormall == undefined){
              res.send({code:200})
            }else{
              res.send(item)
            }
          })
        })
      })
    })
})
  
  // 数据统计根据时间
router.post("/accordingTime",(req,res) => {
    var nameId = req.body.nameId;
    var typeData = req.body.typeData;
    var timeData = req.body.timeData;
    pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='辅导员'`,(err,result) => {
      if(err) throw err;
      var worker_qx_json = result[0].worker_qx_json;
      var worker = eval(worker_qx_json);
      var str = "";
      for (var i = 0; i < worker.length; i++) {
          str += worker[i]+ ",";
      }
      if (str.length > 0) {
          str = str.substr(0, str.length - 1);
      }
  
    })
})
  // 数据统计根据类型
router.post("/accordingType",(req,res) => {
    var nameId = req.body.nameId;
    var typeData = req.body.typeData;
    var timeData = req.body.timeData;
    pool.query(`SELECT a.*,b.id FROM tbl_c_worker AS a LEFT JOIN tbl_c_worker_duty_type AS b ON a.fk_dutyid=b.id WHERE a.worker_sj='${nameId}' AND b.worker_duty_name='辅导员'`,(err,result) => {
      if(err) throw err;
      var worker_qx_json = result[0].worker_qx_json;
      var worker = eval(worker_qx_json);
      var str = "";
      for (var i = 0; i < worker.length; i++) {
          str += worker[i]+ ",";
      }
      if (str.length > 0) {
          str = str.substr(0, str.length - 1);
      }
  
    })
})
module.exports = router;