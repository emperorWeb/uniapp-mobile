const express = require("express");
const router = express.Router();
const pool = require("../../pool");

// 不在请情况统计
router.post("/bedroom",(req,res) => {
    var nameId = req.body.nameId;
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
      pool.query(`SELECT * FROM tbl_c_class WHERE id IN(${str})`,(err,result) => {
        if(err) throw err;
        global.item=new Array();
        for(var i=0;i<result.length;i++){
            item.push({id:result[i].id,class_name:result[i].class_name});
            // var id=result[i].id;
            // var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
            // pool.query(`SELECT * FROM tbl_c_student WHERE fk_classid='${id}'`,(err,result) => {
            // if(err) throw err;
            // var totai = result.length;
            //     pool.query(`SELECT a.*,c.student_name FROM tbl_d_in_out AS a LEFT JOIN tbl_c_class AS b ON a.fk_classid=b.id LEFT JOIN tbl_c_student AS c ON a.fk_studentid=c.id WHERE in_out_direction=2 AND b.id in(${str}) AND a.in_out_time LIKE '${today}'`,(err,result) => {
            //         if(err) throw err;
            //         var notIn = result.length;
            //         res.send([{code:totai,msg:item,notIn:notIn,num:result}])
            //     })
            // })
        }
        res.send(item)
      })
    })
})
router.post("/number",(req,res) => {
    var id = req.body.id;
    pool.query(`SELECT * FROM tbl_c_student WHERE fk_classid='${id}'`,(err,result) => {
        if(err) throw err;
        var totai = result.length;
        res.send({totai:totai})
    })
})
router.post("/personnel",(req,res) => {
  var id = req.body.id;
  var nameId = req.body.nameId;
  var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
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
      pool.query(`SELECT a.*,c.student_name FROM tbl_d_in_out AS a LEFT JOIN tbl_c_class AS b ON a.fk_classid=b.id LEFT JOIN tbl_c_student AS c ON a.fk_studentid=c.id WHERE in_out_direction=2 AND b.id in(${str}) AND a.in_out_time LIKE '${today}'`,(err,result) => {
        if(err) throw err;
        res.send(result)
    })
  })
  
})

// 辅导员看班级学生异常通行记录
router.post("/nightBack",(req,res) => {
    var nameId = req.body.nameId;
    var abnormal = req.body.abnormal;
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
      if(abnormal == 1){//彻夜未归
        pool.query(`SELECT a.*,b.* FROM tbl_c_in_out AS a LEFT JOIN tbl_c_class AS b ON a.fk_classid=b.id where UNIX_TIMESTAMP(a.in_out_time) BETWEEN UNIX_TIMESTAMP(CURDATE())-3600*2 AND UNIX_TIMESTAMP(CURDATE())+3600*6 and a.fk_studentid>0 and a.in_out_direction=1 and a.fk_classid in(${str}) ORDER BY a.in_out_time DESC`,(err,result) => {
          if(err) throw err;
          var student_id = "";
          for(var i=0;i<result.length;i++){
            student_id += result[i].fk_studentid+ ",";
          }
          pool.query(`SELECT a.fk_studentid FROM tbl_d_in_out AS a LEFT JOIN tbl_c_class AS b ON a.fk_classid=b.id where UNIX_TIMESTAMP(a.in_out_time) BETWEEN UNIX_TIMESTAMP(CURDATE())-3600*18 AND UNIX_TIMESTAMP(CURDATE())-3600*2 AND b.id in(${str}) and a.in_out_direction=1 group by a.fk_studentid`,(err,result) => {
            if(err) throw err;
            var fkstudent_id = "";
            for(var i=0;i<result.length;i++){
              if (fkstudent_id == "")
              {
                fkstudent_id = result[i].fk_studentid
              }else{
                fkstudent_id = fkstudent_id + ',' + result[i].fk_studentid
              }
            }
            if(student_id == 0 && fkstudent_id == 0){
              var sid = ''
            }else if(student_id != 0 && fkstudent_id != 0){
              var sid = student_id + ',' + fkstudent_id;
            }else if(student_id != 0){
              var sid = student_id
            }else{
              var sid = fkstudent_id
            }
            pool.query(`SELECT a.*,b.class_short_name,b.class_name,d.dorm_no,d.dorm_name from (tbl_c_student as a LEFT JOIN tbl_c_class as b ON a.fk_classid=b.id) LEFT JOIN (select id,dorm_no,dorm_name from tbl_c_dorm) as d ON d.id=a.fk_dormid where 1=1 ${sid} AND b.id IN(${str}) ORDER by id DESC`,(err,result) => {
              if(err) throw err;
              res.send(result);
            })
          })
        })
      }else if(abnormal == 2){//晚归
       pool.query(`SELECT a.*,b.student_name,b.student_sj,b.student_sex,c.dorm_no,c.dorm_name,o.class_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN (select id,dorm_no,dorm_name from tbl_c_dorm) as c ON c.id=a.fk_dormid LEFT JOIN(select id,class_name from tbl_c_class) as o on o.id=a.fk_classid where 1=1 and UNIX_TIMESTAMP(in_out_time) BETWEEN UNIX_TIMESTAMP(CURDATE())-3600*2 AND UNIX_TIMESTAMP(CURDATE())+3600*5 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) and a.in_out_direction=1 and a.fk_studentid>0 and o.id in(${str}) ORDER by a.in_out_time`,(err,result) => {
        if(err) throw err;
        res.send(result);
        }) 
      }else if(abnormal == 3){//早出
        pool.query(`SELECT a.*,b.student_name,b.student_sj,b.student_sex,c.dorm_no,c.dorm_name,o.class_name from (tbl_c_in_out as a LEFT JOIN tbl_c_student as b ON a.fk_studentid=b.id) LEFT JOIN (select id,dorm_no,dorm_name from tbl_c_dorm) as c ON c.id=a.fk_dormid LEFT JOIN(select id,class_name from tbl_c_class) as o on o.id=a.fk_classid where 1=1 and UNIX_TIMESTAMP(in_out_time) BETWEEN UNIX_TIMESTAMP(CURDATE())-3600*2 AND UNIX_TIMESTAMP(CURDATE())+3600*5 and a.in_black_vip=0 and (a.in_out_person_type=1 or a.in_out_person_type=2) and a.in_out_direction=2 and a.fk_studentid>0 and o.id in(${str}) ORDER by a.in_out_time`,(err,result) => {
          if(err) throw err;
          res.send(result);
        })
      }else if(abnormal == 4  ){//一周无通行记录
        pool.query(`SELECT a.fk_studentid FROM tbl_c_in_out AS a LEFT JOIN tbl_c_class AS b ON a.fk_classid=b.id WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(in_out_time) AND fk_studentid>0 AND a.fk_classid IN(${str}) GROUP BY fk_studentid`,(err,result) => {
          if(err) throw err;
          var studentid = "";
          for(var i=0;i<result.length;i++){
            if (studentid == "")
            {
              studentid = result[i].fk_studentid
            }else{
              studentid = studentid + ',' + result[i].fk_studentid
            }
          }
          pool.query(`SELECT a.*,b.class_short_name,b.class_name,c.college_short_name,d.dorm_name,d.dorm_no,e.specialty_short_name,f.opendoor_qx_name,g.bed_no,o.fk_studentid,o.student_face_pic1 from (tbl_c_student as a LEFT JOIN tbl_c_class as b ON a.fk_classid=b.id) LEFT JOIN (select id,college_short_name from tbl_c_college) as c ON c.id=a.fk_collegeid LEFT JOIN (select id,dorm_no,dorm_name from tbl_c_dorm) as d ON d.id=a.fk_dormid LEFT JOIN(select id,specialty_short_name from tbl_c_specialty) as e ON e.id=a.fk_specialtyid  LEFT JOIN(select id,opendoor_qx_name from tbl_c_opendoor) as f ON f.id=a.fk_opendoorqxid LEFT JOIN(select id,bed_no from tbl_c_bed) as g on g.id=a.fk_bedid LEFT JOIN tbl_c_student_face as o ON o.fk_studentid=a.id where 1=1 and b.id in(${str}) and a.id not in('${studentid}') ORDER by id DESC`,(err,result) => {
            if(err) throw err;
            res.send(result)
          })
        })
      }
    })
})

module.exports = router;