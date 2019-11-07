var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
var user = require('./routers/user')
var feedback = require('./routers/feedback')
var software = require('./routers/software')
var search = require('./routers/search')
var upload = require('./routers/upload')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: false}))
app.use('/user', user)
app.use('/search', search)
app.use('/feedback', feedback)
app.use('/software', software)
app.use('/upload', upload)
app.use('/script', express.static(__dirname +'/script'))




// -------------- o(=•ェ•=)m   start ------------------
{
	// 资源
	app.get('/resource/:id', (req, res) => {
		res.status(200)
		res.json({
			"msg": "string",
			"code": 0,
			"data": {
				"id": 0,
				"name": "string",
				"images": [
					"string"
				],
				"label": "string",
				"commentCount": 0,
				"viewCount": 0,
				"scoreAvg": 0
			}
		})
	})
}
// -------------- o(=•ェ•=)m   end ------------------



// -------------- o(=•ェ•=)m   start ------------------
{
	// 评分
	app.post('/rate',(req,res)=>{
		res.status(200).json({
			"msg": "string",
			"code": 0
		})
	})

}
// -------------- o(=•ェ•=)m   end ------------------


// -------------- o(=•ェ•=)m   start -----------------
{
	// 评论

	// 删除评论
	app.delete('/comment/:id',(req,res)=>{
		// {   [body]
		// 	"resourceId": 0,
		// 	"pid": 0,
		// 	"replyUserId": 0
		// }
		res.status(200)
		res.jsonp({
			"msg": "string",
			"code": 0
		})
	})
	
	// 取消点赞评论
	app.post('/comment/:id/star',(req,res)=>{
		// [post]
		// {
		// 	"star": true
		// }
		res.status(200)
		res.jsonp({
			"msg": "string",
			"code": 0
		})
		
	})

	// 回复评论
	app.post('/comment', (req, res) => {
		// {   [body]
		// 	"resourceId": 0,
		// 	"pid": 0,
		// 	"content": "string",
		// 	"replyUserId": 0
		// }

		// res.jsonp({
		// 	msg: '回复的用户不存在',
		// 	code: 42202
		// })

		// res.jsonp({
		// 	msg:'必须先评分后才可评论',
		// 	code:42201
		// })
		res.status(200)
		res.jsonp({
			msg: '请求成功',
			code: 0
		})
	})

	// 获取评论
	app.get('/comment', (req, res) => {
		// [query]
		// resourceId
		// pageSize
		// order

		res.status(200)
		res.jsonp({
			"code": 0,
			"data": {
				"list": [
					{
						"id": 1,
						"content": "1", //评论内容
						"hot":444, // 点赞数
						"createdAt": "2019-11-07T07:46:14.000Z", //几天前
						"userId": 1,
						"replyUserId": '1',
						"pid": 'pid34', //一层评论id
						"rateId": null,
						"items": [
							{
								"id": 2, 
								"content": "2",
								"hot": 4324, // 二层点赞数
								"createdAt": "2019-11-07T07:46:14.000Z",
								"userId": 1,
								"replyUserId": 2,
								"pid": 1, //二层评论id
								"rateId": null,
								"user": {
									"id": 1,
									"name": "胡浩",
									"nickName": null,
									"profilePic": '//avatars2.githubusercontent.com/u/18524392?s=460&v=4'
								},
								"followUser": {
									"id": 2,
									"name": "胡浩2",
									"nickName": null,
									"profilePic": '//avatars2.githubusercontent.com/u/18524392?s=460&v=4'
								},
								"replyUser": null,
								"stars": []
							},
							{
								"id": 3,
								"content": "3",
								"hot": 123,
								"createdAt": "2019-11-07T07:46:14.000Z",
								"userId": 1,
								"replyUserId": 3,
								"pid": 1,
								"rateId": null,
								"user": {
									"id": 1,
									"name": "胡浩",
									"nickName": null,
									"profilePic": '//avatars2.githubusercontent.com/u/18524392?s=460&v=4'
								},
								"followUser": {
									"id": 2,
									"name": "胡浩2",
									"nickName": null,
									"profilePic": '//avatars2.githubusercontent.com/u/18524392?s=460&v=4'
								},
								"replyUser": null,
								"stars": [1,1]
							}
						],
						"user": {
							"id": 123, // 一层用户id
							"name": "胡浩", //用户名
							"nickName": null, //用户昵称
							"profilePic": '//avatars2.githubusercontent.com/u/18524392?s=460&v=4' //头像
						},
						"rate": {value:'2'}, // 一层评分
						"stars": []  //大于零说明点过赞
					}
				
				],
				"count": 2
			}
		})


	})
}
// -------------- o(=•ェ•=)m   end ------------------




app.get('/',function(req, res){
    res.send("success")
})

app.listen(port,'0.0.0.0', () => {
    return console.log(`App listening on port ${port}!`);
})