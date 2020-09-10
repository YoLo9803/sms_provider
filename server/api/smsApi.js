var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
const ApiKey = 'JF19zSrC9gx6dMW16XJbFUhkpD6EQs';
const smsPvaUrlBase = 'http://smspva.com/priemnik.php?apikey=' + ApiKey;

router.get('/getnumber', (req, res) => {
    console.log('getNumber');
    var queries = req.query;
    console.log(queries);
    var url = smsPvaUrlBase + '&metod=get_number' + '&country=' + queries.country + '&service=' + queries.service;
    client.get(url, function (response){
        res.send(response);
    });
});

router.get('/getSms', (req, res) => {
    console.log('getSms');
    var queries = req.query;
    console.log(queries);
    var url = smsPvaUrlBase + '&metod=get_sms' + '&country=' + queries.country + '&service=' + queries.service + '&id=' + queries.id;
    client.get(url, function (response){
        res.send(response);
    });
});

router.get('/ban', (req, res) => {
    console.log('ban');
    var queries = req.query;
    console.log(queries);
    var url = smsPvaUrlBase + '&metod=ban'  + '&service=' + queries.service + '&id=' + queries.id;
    client.get(url, function (response) {
        res.send(response);
    });
})

module.exports = router;