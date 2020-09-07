// node 後端伺服器

const userApi = require('./api/userApi');
const smsApi = require('./api/smsApi');
const paymentApi = require('./api/paymentApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var ejs = require('ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// 後端api路由
app.use('/api/user', userApi);
app.use('/api/smspva', smsApi);
app.use('/api/payment', paymentApi);

// 監聽埠
const port = 3000;
app.engine('html', ejs.__express);
app.set('view engine', 'html');
app.listen(port);
console.log('success listen at port:' + port);