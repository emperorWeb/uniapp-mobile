const mysql = require("mysql");
var pool = mysql.createConnection({
   host:"127.0.0.1",
   user:"liujiang",
   password:"a1234567890.",
   database:"app_zhxy_face",
   port:3306,
   connectionLimit:50
});

module.exports = pool;
