const express = require("express");
const router = express.Router();

// 用户id账号密码操作,
const login = require("./admin/login");
// 智慧校园通知，新闻展示页数据请求接口
const notice = require("./admin/notice");
// 用户信息资料展示页面
const information = require("./admin/information")

router.use("/login",login);
router.use("/notice",notice);
router.use("/information",information);

module.exports = router;