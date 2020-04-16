
const express = require("express");
const router = express.Router();
const pool = require("../../pool");

// 个人资料页
router.post("/personal",(req,res) => {
    var Identity = req.body.Identity;
    var renId = req.body.renId;
    if(Identity == 1){
      pool.query(`SELECT * FROM tbl_c_student WHERE id='${renId}'`,(err,result) => {
          if(err) throw err;
          res.send(result);
        })
    }else if(Identity == 2){
      pool.query(`SELECT * FROM tbl_c_worker WHERE id='${renId}'`,(err,result) => {
          if(err) throw err;
          res.send(result);
        })
    }
})
  
// 个人信息微信图
router.post('/wechat',(req,res) => {
    var openId = req.body.openId;
    pool.query(`SELECT * FROM tbl_b_wechat WHERE wechat_openid='${openId}'`,(err,result) => {
        if(err) throw err;
        res.send(result);
    })
})

module.exports = router;