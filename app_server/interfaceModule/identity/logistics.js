const express = require("express");
const router = express.Router();
const pool = require("../../pool");

// 宿管看报修
router.post("/apprivalTu",(req,res) => {
    pool.query(`SELECT a.*,b.student_name,c.dorm_name FROM tbl_c_repair AS a LEFT JOIN tbl_c_student AS b ON a.fk_studentid=b.id LEFT JOIN tbl_c_dorm AS c ON a.fk_dormid=c.id WHERE a.repair_status=1`,(err,result) => {
      if(err) throw err;
      res.send(result)
    })
})
  
  // 学生处审批申请
router.post("/schoolBatch",(req,res) => {
    pool.query(`SELECT a.*,b.student_name FROM tbl_c_application AS a LEFT JOIN tbl_c_student AS b ON a.fk_studentid=b.id  WHERE a.application_deal_status=1 ORDER BY application_addtime DESC`,(err,result) => {
      if(err) throw err;
      for(var i=0;i<result.length;i++){
        var item = result[i];
        if(item.application_status == 1){
          item.application_status = '申请休学';
        }else if(item.application_status == 2){
          item.application_status = '申请转学';
        }else if(item.application_status == 3){
          item.application_status = '申请退学';
        }else if(item.application_status == 4){
          item.application_status = '申请复学';
        }
      }
      res.send(result);
    })
})
  
  // 学生申请审批提交
router.post("/schoolAudit",(req,res) => {
    var studentId = req.body.studentId;
    var note = req.body.note;
    var keyTime = req.body.keyTime;
    var today = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
    pool.query(`UPDATE tbl_c_application SET application_deal_bz='${note}',application_finishtime='${today}', application_opendoor_dealy=${keyTime}, application_deal_status=2 WHERE id=${studentId}`,(err,result) => {
      if(err) throw err;
      if(result.length == 0){
        res.send({code:200,msg:'处理失败'})
      }else{
        res.send({code:100,msg:'处理成功'})
      }
    })
})
  // 宿舍报修处理
router.post("/dealWith",(req,res) => {
    var dealId = req.body.dealId;
    pool.query(`UPDATE tbl_c_repair SET repair_status=3 WHERE id=${dealId}`,(err,result) => {
      if(err) throw err;
      if(result.length == 0){
        res.send({code:200,msg:'处理失败'})
      }else{
        res.send({code:100,msg:'处理成功'})
      }
    })
})
module.exports = router;