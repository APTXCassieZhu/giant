var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/software/:id/verify', jsonParser, function(req,res){
    console.log("verify account: "+req.body.account)
    console.log("verify password: "+req.body.pwd)
    res.status(200).json({'code': 0});
});
router.post('/software/:id/apply', jsonParser, function(req,res){
    console.log("apply reason: "+req.body.reason)
    res.status(200).json({'code': 0, 'data':{'num': 89797}});
});

//export this router to use in our index.js
module.exports = router;