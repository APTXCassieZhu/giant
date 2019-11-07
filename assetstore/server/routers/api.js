var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/user/login', jsonParser, function(req,res){
    console.log("back-end account: "+req.body.account)
    console.log("pwd: " +req.body.pwd)
    res.cookie('session', { current_user: req.body.account });
    res.set('Authorization','token23333333333333333333333333')
    // TO DO check if the user exists
    if(req.body.account == '超级无敌美少女' && req.body.pwd == '1234'){
        res.status(200).json({'code': 40101})
    }else{
        res.status(200).json({'code': 0, 'data': {name:'夏目','nickName': '睿酱', 'signature': '啦啦啦，每天都要开心鸭', 
        'account':'xiamu@ztgame.com'}});
    }
    
})
router.get('/user/describe', function(res){
    res.status(200).json({'data': {name:'夏目','nickName': '睿酱', 'signature': '啦啦啦，每天都要开心鸭', 
    'account':'xiamu@ztgame.com'}, 'code': 0})
});

router.post('/feedback', jsonParser, function(req,res){
    console.log("feedback title: "+req.body.title)
    console.log("feedback details: "+req.body.details)
    res.status(200).json({'code': 0});
});
router.post('/software/:id/verify', jsonParser, function(req,res){
    console.log("verify account: "+req.body.account)
    console.log("verify password: "+req.body.pwd)
    res.status(200).json({'code': 0});
});
router.post('/software/:id/apply', jsonParser, function(req,res){
    console.log("apply reason: "+req.body.reason)
    res.status(200).json({'code': 0, 'data':{'num': 89797}});
});

router.post('/search', jsonParser,function(req,res){
    console.log("search "+req.body.searchcontent);
    res.json({'status':"OK"});
})
//export this router to use in our index.js
module.exports = router;