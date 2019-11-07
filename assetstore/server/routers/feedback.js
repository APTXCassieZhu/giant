var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/feedback', jsonParser, function(req,res){
    console.log("feedback title: "+req.body.title)
    console.log("feedback details: "+req.body.details)
    res.status(200).json({'code': 0});
});
//export this router to use in our index.js
module.exports = router;