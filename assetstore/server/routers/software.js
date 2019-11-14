var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/:id/verify', jsonParser, function(req,res){
    console.log("verify account: "+req.body.account)
    console.log("verify password: "+req.body.pwd)
    res.status(200).json({'code': 0});
});
router.post('/:id/apply', jsonParser, function(req,res){
    console.log("apply reason: "+req.body.reason)
    res.status(200).json({'code': 0, 'data':{'num': 89797}});
});
router.get('/', jsonParser, function(req,res){
    console.log("want which type of software: "+req.query.classify)
    if(req.query.classify == 'general'){
        res.status(200).json({'code': 0, 
        'data':{
            'count': 3,
            'list': [{
                        "id": 1,
                        "name": "微信",
                        "image": "string",
                        "description": "string",
                        "classify": "general",
                        "updatedAt": "2019-10-04T15:05:45.000Z",
                        "version": "1.8.9",
                        "file": {
                            "id": 0,
                            "size": 0
                        },
                    },
                    {
                        "id": 2,
                        "name": "微博",
                        "image": "string",
                        "description": "string",
                        "classify": "general",
                        "updatedAt": "2019-07-04T15:05:45.000Z",
                        "version": "2.5.6",
                        "file": {
                            "id": 0,
                            "size": 0
                        },
                    },
                    {
                        "id": 3,
                        "name": "QQ",
                        "image": "string",
                        "description": "string",
                        "classify": "general",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    }]
        }});        
    }
});

//export this router to use in our index.js
module.exports = router;