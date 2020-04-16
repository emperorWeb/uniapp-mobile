// 用户id账号密码操作,

const express = require("express");
const router = express.Router();
const pool = require("../../pool");
// 登录
router.post("/",(req,res) => {
    var username = req.body.uname;
    var password = req.body.passw+'lyk';
    pool.query(`SELECT * FROM tbl_a_admin WHERE username='${username}' AND password=md5(md5('${password}'))`,(err,result) => {
      if(err) throw err;
      if(result == ''){
        res.send({code:0,msg:'用户名或密码不正确'})
      }else{
        res.send(result)
      }
      
    })
})
// 注册
router.post('/registered',function (req,res) {
  var currents = req.body.currents;
  var password = req.body.pwd+'lyk';
  var idCard = req.body.idCard;//身份证
  var phone = req.body.phone;
  if(currents == 1){
    var sql = `SELECT * FROM tbl_c_student WHERE student_sj='${phone}' AND student_sfzh='${idCard}'`
    var add_desc="学生-微信用户绑定入口加入";
    var fk_rentype = 1;
  }else if(currents == 2){
    var sql = `SELECT * FROM tbl_c_worker WHERE worker_sj='${phone}' AND worker_sfzh='${idCard}'`
    var add_desc="教职工（辅导员）-微信用户绑定入口加入";
    var fk_rentype = 2;
  }else if(currents == 3){
    var sql = `SELECT * FROM tbl_c_worker WHERE worker_sj='${phone}' AND worker_sfzh='${idCard}'`
    var add_desc="教职工（宿管）-微信用户绑定入口加入";
    var fk_rentype = 2;
  }else if(currents == 5){
    var sql = `SELECT * FROM tbl_c_student WHERE student_sfzh='${idCard}'`
    var add_desc="学生家长-微信用户绑定入口加入";
    var fk_rentype = 3;
  }else if(currents == 6){
    var sql = `SELECT * FROM tbl_c_worker WHERE worker_sj='${phone}' AND worker_sfzh='${idCard}'`
    var add_desc="教职工（学生处）-微信用户绑定入口加入";
    var fk_rentype = 2;
  }
  pool.query(sql,(err,result) => {
    if(err) throw err;
    if(result == ''){
      res.send({code:0,msg:'您输入的手机号和身份证号与系统预留不一致！'})
    }else{
      var fk_renid = result[0].id;
      pool.query(`SELECT * FROM tbl_a_admin WHERE username='${phone}'`,(err,result) => {
        if(err) throw err;
        if(result == ''){
            pool.query(`INSERT INTO tbl_a_admin(id,username,password,logintimes,logintime,lasttime,add_time,mod_time,loginip,zt,chao,bz,fk_userid,fk_roleid,fk_roletype,fk_rentype,fk_renid,fk_wxopenid) VALUES (null,'${phone}',md5(md5('${password}')),null,null,null,null,null,null,'1','2','${add_desc}',null,'${currents}','${currents}','${fk_rentype}','${fk_renid}',null)`,(err,result) => {
            if(err) throw err;
              res.send({code:true,msg:'注册成功！'});
          })
        }else{
          res.send({code:1,msg:'该手机号已注册！'})
        }
      })
    }
    // 先查询对应的身份表，管理员的，老师的，在查询admin看看手机号时候已经注册，最后写入admin表格
  })
});

// 修改密码
router.post("/changePwd",(req,res) => {
  var nameId = req.body.nameId;
  var original = req.body.original+'lyk';
  var newpwd = req.body.newpwd+'lyk';
  pool.query(`select * from tbl_a_admin where username='${nameId}' and password=md5(md5('${original}'))`,(err,result) => {
    if(err) throw err
    if(result == ''){
      res.send({code:1})
    }else{
      pool.query(`update tbl_a_admin SET password = md5(md5('${newpwd}')) WHERE username = '${nameId}'`,(err,result) => {
        if(err) throw err
        res.send({code:2})
      })
    }
  })
})

// 忘记密码，手机验证部分
router.post("/validationPhone",(req,res) => {
  var phone = req.body.phone;
  pool.query(`SELECT * FROM tbl_a_admin WHERE username='${phone}'`,(err,result) => {
    if(err) throw err;
    if(result.length == 0){
      res.send({code:200,msg:'手机号不存在'})
    }else{
      res.send({code:100,msg:'验证通过'})
    }
  })
})

// 修改新密码
router.post("/modifyPwd",(req,res) => {
  var nameId = req.body.nameId;
  var passwd = req.body.passwd;
  pool.query(`SELECT * FROM tbl_c_student WHERE student_sj='${phone}`,(err,result) => {
    if(err) throw err;
    res.send({code:true,info:'短信即将发送至您手机',dation:4521})
  })
})

// 手机号绑定
router.post("/binding",(req,res) => {
  var phone = req.body.phong;
  var openId = req.body.openId;
  var nameId = req.body.nameId;
  pool.query(`update tbl_b_wechat_person set person_sj='${phone}',person_sj_modify=1 where person_openid='${openId}'`,(err,result) => {
    if(err) throw err;
    res.send({code:100,msg:'绑定成功'})
  })
})
router.post("/validation",(req,res) => {
  var phone = req.body.phone;
  pool.query(`update tbl_b_wechat_person set person_sj='${phone}',person_sj_modify=1 where person_openid='${openId}'`,(err,result) => {
    if(err) throw err;
    res.send({code:100,msg:'绑定成功'})
  })
})

module.exports = router;
