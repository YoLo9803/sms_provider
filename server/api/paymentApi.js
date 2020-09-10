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

const onTimeValue = function () {
    var date = new Date();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();

    return [date.getFullYear(), "/" +
        (mm > 9 ? '' : '0') + mm, "/" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
};

router.get('/', (req, res) => {
    let uid = randomValue(10, 99) + "1234567890234567" + randomValue(10, 99);
    console.log(uid);
    
    let base_param = {

        MerchantTradeNo: uid,
        MerchantTradeDate: onTimeValue(),
        TotalAmount: '100',
        TradeDesc: '測試交易描述',
        ItemName: '測試商品等',
        ReturnURL: 'http://192.168.0.1',
        // ChooseSubPayment: '',
        // OrderResultURL: 'http://localhost:8080/#/',
        // NeedExtraPaidInfo: '1',
        // ClientBackURL: 'https://www.google.com',
        // ItemURL: 'http://item.test.tw',
        Remark: '交易備註123432414',
        // StoreID: '',
        // CustomField1: '',
        // CustomField2: '',
        // CustomField3: '',
        // CustomField4: ''
    };

    let create = new ecpay_payment();
    let parameters = {};
    try{
        let htm = create.payment_client.aio_check_out_credit_onetime(parameters = base_param);
        res.send(htm);
    }
    catch(err){
        let error = {
            status: '500',
            stack: ""
        }
        res.render('error', {
            message: err,
            error: error
        })
        console.log('error occured');
        console.log(err);
    }
})

const randomValue = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

module.exports = router;