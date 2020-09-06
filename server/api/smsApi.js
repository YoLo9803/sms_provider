var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;
var client = new Client();
const ApiKey = '';//'JF19zSrC9gx6dMW16XJbFUhkpD6EQs';
const smsPvaUrlBase = 'http://smspva.com/priemnik.php?apikey=' + ApiKey;

router.get('/getnumber', (req, res) => {
    var stubData = {
        response : "1",
        number : "123456",
        id : 1234
    }
    var queries = req.query;
    console.log(queries);
    res.send(stubData);
    return;
    var url = smsPvaUrlBase + '&metod=get_number' + '&country=' + queries.country + '&service=' + queries.service;
    client.get(url, function (response){
        res.send(response);
    });
});

module.exports = router;