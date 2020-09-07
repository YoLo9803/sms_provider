var models = require('../db/db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../db/sqlMap');
const { user } = require('../db/sqlMap');
const ecpay_payment = require('@yukaii/ecpay_payment_nodejs');

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
    if (body.account != undefined && body.password != undefined){
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

router.get('/:id/fund', (req, res) => {
    var sql = "SELECT `fund` FROM `user` WHERE `id` = ?";
    if (req.params.id != undefined){
        var userId = req.params.id;
        conn.query({
            sql: sql,
            values: [userId]
        },
            function(err, result){
                if(err){
                    console.error(err);
                }
                else{
                    res.send(result[0]);
                }
            }
        );
    }
    else{
        res.send(-1);
    }
})

router.post('/setAmountOfFund', (req, res) => {
    var sql = "UPDATE `user` SET `fund` = ? WHERE user.id = ?";
    var body = req.body;
    if (body.userId != undefined && body.amount != undefined){
        console.log(body);
        conn.query({
            sql: sql,
            values: [body.amount, body.userId]
        },
            function(err, result){
                if(err){
                    console.error(err);
                }
                else if (result.affectedRows == 1){
                    console.log(result);
                    res.send(result)
                }
                else{
                    // TODO: 錯誤狀態碼
                    res.sendStatus(403);
                }
            });
    }
})

const randomValue = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}


module.exports = router;