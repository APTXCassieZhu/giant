var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', jsonParser, function(req,res){
    // console.log("remind page: "+req.query.page)
    // console.log("remind pagesize: "+req.query.pageSize)
    res.status(200).json({'code': 0,
    "data": {
        "count": 5,
        "dropdownCount": 3,
        "webCount": 4,
        "list": [
            {
                "id": 1,
                "targetType": "replyComment",
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "resourceId": 1,
                "commentId": 11,
                "softwareId": null,
                "view": false,
                "ignore": false,
                "sourceUsers": [
                    {
                        "id": 1,
                        "name": "戴浩",
                        "nickName": null,
                        "user_remind_source": {
                            "userId": 1,
                            "remindId": 1
                        }
                    },
                    {
                        "id": 2,
                        "name": "张佳",
                        "nickName": null,
                        "user_remind_source": {
                            "userId": 2,
                            "remindId": 1
                        }
                    }
                ],
                "software": null,
                "resource": {
                    "id": 1,
                    "name": "test"
                },
                "comment": {
                    "id": 11
                }
            },
            {
                "id": 2,
                "view": false,
                "ignore": false,
                "targetType": "starResourceUpgrade",
                "createdAt": "2019-11-12T08:05:43.000Z",
                "updatedAt": "2019-11-12T08:05:45.000Z",
                "resourceId": 1,
                "commentId": null,
                "softwareId": null,
                "sourceUsers": [],
                "software": null,
                "resource": {
                    "id": 1,
                    "name": "干啥子资源包"
                },
                "comment": null
            },
            {
                "id": 3,
                "view": false,
                "ignore": false,
                "targetType": "starSoftwareUpgrade",
                "createdAt": "2019-11-04T15:05:43.000Z",
                "updatedAt": "2019-11-04T15:05:45.000Z",
                "resourceId": 1,
                "commentId": null,
                "softwareId": null,
                "sourceUsers": [],
                "software": {
                    "id": 1,
                    "name": "test"
                },
                "resource": null,
                "comment": null
            },
            {
                "id": 4,
                "view": false,
                "ignore": true,
                "targetType": "resourceCommented",
                "createdAt": "2019-11-01T10:02:44.000Z",
                "updatedAt": "2019-11-01T10:02:47.000Z",
                "resourceId": 1,
                "commentId": 999,
                "softwareId": null,
                "sourceUsers": [
                    {
                        "id": 1,
                        "name": "夏诗",
                        "nickName": "夏小诗",
                        "user_remind_source": {
                            "userId": 3,
                            "remindId": 1
                        }
                    },
                    {
                        "id": 2,
                        "name": "祝词",
                        "nickName": "祝小词",
                        "user_remind_source": {
                            "userId": 4,
                            "remindId": 1
                        }
                    },
                    {
                        "id": 3,
                        "name": "贺凉",
                        "nickName": "贺之凉",
                        "user_remind_source": {
                            "userId": 5,
                            "remindId": 1
                        }
                    },
                    ,
                    {
                        "id": 4,
                        "name": "未来",
                        "nickName": null,
                        "user_remind_source": {
                            "userId": 6,
                            "remindId": 1
                        }
                    },
                ],
                "software": null,
                "resource": {
                    "id": 123,
                    "name": "我的啥啥啥资源"
                },
                "comment": {
                    "id": 999,
                }
            },
            {
                "id": 3,
                "view": true,
                "ignore": true,
                "targetType": "starResourceCommented",
                "createdAt": "2019-10-04T15:05:43.000Z",
                "updatedAt": "2019-10-04T15:05:45.000Z",
                "resourceId": 1,
                "commentId": 233,
                "softwareId": null,
                "sourceUsers": [],
                "software": null,
                "resource": {
                    "id": 1,
                    "name": "lalala"
                },
                "comment": {
                    "id": 233
                }
            },
        ]
    }});
});
router.put('/view', jsonParser, function(req,res){
    console.log('提醒全部已读')
    res.status(200).json({'code': 0})
});
router.put('/:id/view', jsonParser, function(req,res){
    console.log('这个id：'+req.params.id+'的提醒已读')
    res.status(200).json({'code': 0})
});

router.put('/ignore', jsonParser, function(req,res){
    console.log('已忽视全部提醒')
    res.status(200).json({'code': 0})
});

router.put('/:id/ignore', jsonParser, function(req,res){
    console.log('这个id：'+req.params.id+'的提醒已忽视')
    res.status(200).json({'code': 0})
});
//export this router to use in our index.js
module.exports = router;