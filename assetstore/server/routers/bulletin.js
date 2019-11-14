var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', jsonParser, function(req,res){
    console.log("remind page: "+req.query.page)
    console.log("remind pagesize: "+req.query.pageSize)
    res.status(200).json({'code': 0,
    "data": {
        "count": 5,
        "dropdownCount": 3,
        "webCount": 4,
        "list": [
            {
                "id": 1,
                "targetType": "software",
                "title": "软件领取通知：您已成功申领 ADOBE CS SUITE 软件，请下载",
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content": null,
                "view": false,
                "ignore": false,
            },
            {
                "id": 1,
                "targetType": "software",
                "title": "您已成功提交 ADOBE CS SUITE 软件申请",
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content": null,
                "view": false,
                "ignore": false,
            },
            {
                "id": 1,
                "targetType": "software",
                "title": "您已成功提交 office 2012 软件申请", 
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content": null,
                "view": false,
                "ignore": false,
            },
            {
                "id": 1,
                "targetType": "software",
                "title": "您已成功提交 weibo 软件申请", 
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content": null,
                "view": false,
                "ignore": true,
            },
            {
                "id": 1,
                "targetType": "software",
                "title": "您已成功提交 bilibi 软件申请", 
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content": null,
                "view": true,
                "ignore": true,
            },
        ]
    }});
});
router.put('/view', jsonParser, function(req,res){
    console.log('通知全部已读')
    res.status(200).json({'code': 0})
});
router.put('/:id/view', jsonParser, function(req,res){
    console.log('这个id：'+req.params.id+'的通知已读')
    res.status(200).json({'code': 0})
});

router.put('/ignore', jsonParser, function(req,res){
    console.log('已忽视全部通知')
    res.status(200).json({'code': 0})
});

router.put('/:id/ignore', jsonParser, function(req,res){
    console.log('这个id：'+req.params.id+'的通知已忽视')
    res.status(200).json({'code': 0})
});
//export this router to use in our index.js
module.exports = router;