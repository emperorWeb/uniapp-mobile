const express = require("express");
const router = express.Router();

const student = require("./identity/student")
const teacher = require("./identity/teacher")
const logistics = require("./identity/logistics")
const administrator = require("./identity/administrator")
// 学生
router.use("/student",student);
// 辅导员
router.use("/teacher",teacher);
// 宿管和学生处
router.use("/logistics",logistics);
// 管理人员共用与页面交互接口
router.use("/administrator",administrator);

module.exports = router;