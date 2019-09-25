var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/search', jsonParser,function(req,res){
    console.log("search")
    res.json({'status':"OK"});
})
//export this router to use in our index.js
module.exports = router;