var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');

// 連線資料庫
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失敗'
        });
    } else {
        res.json(ret);
    }
};

// 增加使用者介面
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var body = req.body;
    console.log(body);
    conn.query(sql, [body.account, body.password], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//登入
router.post('/login', (req, res) => {
    var sql = "SELECT * FROM `user` WHERE `account` = ?";
    var body = req.body;
    console.log(sql);
    if (body.account && body.password){
        conn.query({
            sql: sql,
            values: [body.account]
        },
        function(err, result){
                if(err){
                    console.log(err);
                }
                if (result[0] === undefined){
                    res.send('0'); // do not match to any account
                }
                else if (result[0].password != body.password){
                    res.send('-1');
                }
                else{
                    jsonWrite(res, result[0]);
                }
            }
        );
    }
    else{
        res.send('0');
    }
});


module.exports = router;