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
    res.set('Authorization','token23333333333333333333333333')
    // TO DO check if the user exists
    if(req.body.account == '超级无敌美少女' && req.body.pwd == '1234'){
        res.status(200).json({'code': 40101})
    }else{
        res.status(200).json({
			'code': 0, 
			'data': {
				name:'夏目',
				'nickName': '睿酱', 
				'signature': '啦啦啦，每天都要开心鸭', 
				'account':'xiamu@ztgame.com',

				"id": 123, 
				"profilePic": "//avatars2.githubusercontent.com/u/18524392?s=460&v=4",
				"name": "string",
				"dept": "前沿技术部",
				"title": "string",
				"account": "string"
			}
		});
    }
    
})
router.get('/describe', function(req, res){
	// {
	//     "msg": "string",
	//     "code": 0,
	//     "data": {
	//       "id": 0,
	//       "profilePic": "string",
	//       "name": "string",
	//       "nickName": "string",
	//       "dept": "string",
	//       "title": "string",
	//       "signature": "string",
	//       "account": "string"
	//     }
	//   }
	res.status(200).json({
			'msg':'msg-233333',
			'data': {
					name:'夏目',
					'nickName': '睿酱',
					'signature': '啦啦啦，每天都要开心鸭', 
					'account':'xiamu@ztgame.com',

					"id": 123, 
					"profilePic": "//avatars2.githubusercontent.com/u/18524392?s=460&v=4",
					"name": "string",
					"dept": "前沿技术部",
					"title": "string",
					"account": "string"
			}, 
			'code': 0
	})
});

//export this router to use in our index.js
module.exports = router;