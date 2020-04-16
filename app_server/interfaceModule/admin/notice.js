// 智慧校园通知，新闻展示页数据请求接口

// 校园发布动态的新闻内容
const express = require("express");
const router = express.Router();
const pool = require("../../pool");

// 首页轮播图
router.post("/shuffling",(req,res) => {
  let sql = "SELECT * FROM tbl_b_ad";
  pool.query(sql,(err,result) => {
    if(err){
      console.log(err)
    }else{
      // console.log(result)
      res.send(result)
    }
  })
})

// 首页院系介绍部分
router.post("/indexIntroduce",(req,res) => {
  var sid = req.body.attributeId
  pool.query("SELECT * FROM tbl_c_college WHERE  fk_areaid=? LIMIT 0,4",[sid],(err,result) => {
    if(err) throw err;
    res.send(result)
  })
})

// 首页院系介绍跳转的详情页面
router.post("/indexDetail",(req,res) => {
  var id =req.body.parameter;
  pool.query(`SELECT * FROM tbl_c_college WHERE  id='${id}'`,(err,result) => {
    if(err) throw err;
    res.send(result)
  })
});

// 院系介绍
router.post("/departmentsIntroduce",(req,res) => {
  var page = req.body.page;
  var firstLine = (page-1)*8;
  pool.query(`SELECT * FROM tbl_c_college LIMIT ${firstLine},8`,(err,result) => {
    if(err) throw err;
      res.send(result);
  })
})

// 校园动态
router.post("/campusDynamic",(req,res) => {
  var page = req.body.page;
  var firstLine = (page-1)*6;
  pool.query(`select * from tbl_b_dt_content order by id desc LIMIT ${firstLine},6`,(err,result) => {
    if(err) throw err;
      res.send(result);
  })
});
// 校园动态详情
router.post("/dynamicDeta",(req,res) => {
  var id =req.body.parameter;
  pool.query(`SELECT * FROM tbl_b_dt_content WHERE  id='${id}'`,(err,result) => {
    if(err) throw err;
    res.send(result)
  })
});

// 通知公告
router.post("/announcementsList",(req,res) => {
  var page = req.body.page;
  var firstLine = (page-1)*5;
  pool.query(`select * from tbl_b_tongzhi_content order by id desc LIMIT ${firstLine},5`,(err,result) => {
    if(err) throw err;
      for(let i =0;i<result.length;i++){
        result[i].isFload = true;
      }
      res.send(result);
    // }
  })
});
module.exports = router;

