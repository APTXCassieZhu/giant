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
            'count': 25,
            'list': [{
                        "id": 1,
                        "name": "微信",
                        "image": "data:image/png;base64,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",
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
                        "image": "data:image/png;base64,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",
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
                        "image": null,
                        "description": "string",
                        "classify": "general",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    },
                    {
                        "id": 4,
                        "name": "zhihu",
                        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAArCAMAAADCFh8TAAAAYFBMVEX///8PiOsAgOoAguoAfOkAhuumyPXB2Pjw9v35/P4AfurQ4vq00PYAhOo9lu3p8fxQnO6cw/TG3PgvkOyQvPMAeOnk7vxaoe/Y5voljeyuzfaFtvJxq/De6vt5sPFkpe/bTgOiAAADH0lEQVRIibWXjZKrIAyFhUBVNP7Xim3d93/LGxQRXe3avd0z06kKfEoMJxgEs6LgrxQPkP4VO0dUH4NFeRfes2s5nxeIj/8jxnlXpeX9UWgEzgGlLGxLqxgPf8F7dmFaNsOtqKVQHAARJbPCL9utRIbxG9gmqyVXnDQCieiYsyS/2M41Y1mXeKJrfZ2tpZd06q7S0QgsxzO6CVBEuFKCo86KfOr7VNTGPV0pcy4g1xJerqaoJoxAXWdFkUmG96bsw6R75usYNDhOa/7RQwwGPj7MLMbEaiG0SdK1eRRPpI4zfrBOzLRqErG1+a/1BIfS6YEb+FoJwfPdlopPufLkDBJ3leDCiwO8AY+rpesNGcR2bmv4Er1v8Lh/DEvzGq6VeNi2XDBezj1Ow7srQr0PpxC6JB9APFyP0/Dgwtmyqn14Srmn7XF+LeziNLHvTsNNNFX/HW7yWrT2euwIFbwFj2lhzhQPrtlyT08hMNW6sx/hQaWYrLfwL2S7Hmjgyyv/GR7caSnc1/CSuxuutQacgAdkX8UGriTsrod0tWzOwFtho7uEpcNk1aVvJt0kA3vYnIO7unu4/FNhvcn6ppGozsFn7RsXDddoPdWYohWUL+D04r9pLBdSEso+HpAwiMiOJ2kyxfn4FTxAlFu5B/PvmHmzqFcZ+gL+ZArWIrtnsJW6exGi9G9OwekFhmuZIpyGW3klqSU7T0/Ct0qOK5Eb763+9+H7lchqQKnjzDnXZ+GUYLRdcn0+Cic3lzf6sfgP4OT9Iiafw/rzcCr9ZutYUE7dPg43WwCTiFpaj74sOCpW/wWnqjLtLyKg4pUEdscFdBBK2NlxvQM3hjgtz0RMRwbO1DO6KesUv4ZT5ZNgI9wrs1UMSsGB8odsA8fNKVxfwHs4hlPlY24/HdxHx2mrirYD5HJiqEb5VrFRTP3goDkVFBTPH7P5PgWN0cnumFGXobn0aUq7ZCaz/S5miyTRm3T0nAdz3uwOscrFWBVMDVP7nz0XeoNc70asrV8aBr1IhdPbVsNueymQ3X79DRo9gAMX+hDwzqfWzuiuqo7m9w9kOy6bFXkE0gAAAABJRU5ErkJggg==",
                        "description": "string",
                        "classify": "general",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    },
                    {
                        "id": 5,
                        "name": "豆瓣",
                        "image": null,
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
    }else if(req.query.classify == 'free'){
        res.status(200).json({'code': 0, 
        'data':{
            'count': 17,
            'list': [{
                        "id": 1,
                        "name": "free1",
                        "image": null,
                        "description": "string",
                        "classify": "free",
                        "updatedAt": "2019-10-04T15:05:45.000Z",
                        "version": "1.8.9",
                        "file": {
                            "id": 0,
                            "size": 0
                        },
                    },
                    {
                        "id": 2,
                        "name": "free2",
                        "image": null,
                        "description": "string",
                        "classify": "free",
                        "updatedAt": "2019-07-04T15:05:45.000Z",
                        "version": "2.5.6",
                        "file": {
                            "id": 0,
                            "size": 0
                        },
                    },
                    {
                        "id": 3,
                        "name": "free3",
                        "image": null,
                        "description": "string",
                        "classify": "free",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    },{
                        "id": 4,
                        "name": "free4",
                        "image": null,
                        "description": "string",
                        "classify": "free",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    },{
                        "id": 5,
                        "name": "free5",
                        "image": null,
                        "description": "string",
                        "classify": "free",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    },{
                        "id": 6,
                        "name": "free6",
                        "image": null,
                        "description": "string",
                        "classify": "free",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    },{
                        "id": 7,
                        "name": "free7",
                        "image": null,
                        "description": "string",
                        "classify": "free",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    }]
        }});        
    }else if(req.query.classify == 'preload'){
        res.status(200).json({'code': 0, 
        'data':{
            'count': 3,
            'list': [{
                        "id": 1,
                        "name": "preload1",
                        "image": null,
                        "description": "string",
                        "classify": "preload",
                        "updatedAt": "2019-10-04T15:05:45.000Z",
                        "version": "1.8.9",
                        "file": {
                            "id": 0,
                            "size": 0
                        },
                    },
                    {
                        "id": 2,
                        "name": "preload2",
                        "image": null,
                        "description": "string",
                        "classify": "preload",
                        "updatedAt": "2019-07-04T15:05:45.000Z",
                        "version": "2.5.6",
                        "file": {
                            "id": 0,
                            "size": 0
                        },
                    },
                    {
                        "id": 3,
                        "name": "preload3",
                        "image": null,
                        "description": "string",
                        "classify": "preload",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    }]
        }});        
    }else if(req.query.classify == 'drive'){
        res.status(200).json({'code': 0, 
        'data':{
            'count': 10,
            'list': [{
                        "id": 1,
                        "name": "drive1",
                        "image": null,
                        "description": "string",
                        "classify": "drive",
                        "updatedAt": "2019-10-04T15:05:45.000Z",
                        "version": "1.8.9",
                        "file": {
                            "id": 0,
                            "size": 0
                        },
                    },
                    {
                        "id": 2,
                        "name": "drive2",
                        "image": null,
                        "description": "string",
                        "classify": "drive",
                        "updatedAt": "2019-07-04T15:05:45.000Z",
                        "version": "2.5.6",
                        "file": {
                            "id": 0,
                            "size": 0
                        },
                    },
                    {
                        "id": 3,
                        "name": "drive3",
                        "image": null,
                        "description": "string",
                        "classify": "drive",
                        "updatedAt": "2018-10-04T15:05:45.000Z",
                        "version": "1.2.3",
                        "file": {
                            "id": 0,
                            "size": 0
                        }
                    },
                    {
                        "id": 4,
                        "name": "drive4",
                        "image": null,
                        "description": "string",
                        "classify": "drive",
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
router.delete('/:id', jsonParser, function(req,res){
    console.log('delete software : '+req.params.id)
    res.status(200).json({'code': 0})
})//export this router to use in our index.js
module.exports = router;