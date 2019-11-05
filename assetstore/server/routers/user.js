var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/login', jsonParser, function(req,res){
    console.log("back-end account: "+req.body.account)
    console.log("pwd: " +req.body.pwd)
    res.cookie('session', { current_user: req.body.account });
    // TO DO check if the user exists
    if(req.body.account == '超级无敌美少女' && req.body.pwd == '1234'){
        res.status(200).json({'code': 40101})
    }else{
        res.status(200).json({'code': 0});
    }
    
})
router.get('/describe', function(req, res){
    res.status(200).json({'data': {'nickName': '睿酱', 'signature': '啦啦啦，每天都要开心鸭'}, 'code': 0})
});

router.post('/search', jsonParser,function(req,res){
    console.log("search "+req.body.searchcontent);
    res.json({'status':"OK"});
})
//export this router to use in our index.js
module.exports = router;