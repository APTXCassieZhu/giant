var express = require('express');
// var bodyParser = require('body-parser');
var router = express.Router();
// var jsonParser = bodyParser.json()
// var cookieParser = require('cookie-parser');
// var session = require("express-session");

const multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ dest: 'uploads/', storage: storage })
// create unique id
var uniqid = require("uniqid");

router.post('/',upload.single('avatar'),function(req,res){
    req.body['id'] = uniqid();
    if(req.file != undefined){
        res.json({'status':'OK','id':req.body['id']});
    }
})
module.exports = router;