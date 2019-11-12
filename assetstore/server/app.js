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
var resource = require('./routers/resource')
var remind = require('./routers/remind')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: false}))
app.use('/user', user)
app.use('/search', search)
app.use('/feedback', feedback)
app.use('/software', software)
app.use('/upload', upload)
app.use('/resource', resource)
app.use('/remind', remind)
app.use('/script', express.static(__dirname +'/script'))
app.use('/fonts', express.static(__dirname +'/fonts'))

// -------------- o(=•ェ•=)m   start 资源 ------------------
{

	app.post('/resource/:id/star',(req,res)=>{
		res.status(200)
		res.json({
			code:0
		})
	})

	app.get('/resource/:id', (req, res) => {
		res.status(200)
		
		res.json({
			"msg": "string",
			"code": 0,
			"data": {
				"id": 0,
				"name": "资源名23333", // 资源名
				"images": [ // 轮询图
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572500092263&di=fb3951d60188836031fc753b9fc0b1e1&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F16b0b51f76966da6e2ea9d5239a5098594f4e99a.jpg",
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572951722265&di=6ae8c5212af12bbcd4bd5c30aed0fe9a&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F472309f790529822ccae72b0d5ca7bcb0a46d420.jpg",
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572951374068&di=32d7b2f0241ab23ea61488baf6ddfaff&imgtype=0&src=http%3A%2F%2Fww1.sinaimg.cn%2Flarge%2F46070b07gw1eqdiqw4hylj20xc0gogo5.jpg",
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572500092263&di=fb3951d60188836031fc753b9fc0b1e1&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F16b0b51f76966da6e2ea9d5239a5098594f4e99a.jpg",
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572500092263&di=fb3951d60188836031fc753b9fc0b1e1&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F16b0b51f76966da6e2ea9d5239a5098594f4e99a.jpg",
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572500092263&di=fb3951d60188836031fc753b9fc0b1e1&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F16b0b51f76966da6e2ea9d5239a5098594f4e99a.jpg",
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572500092263&di=fb3951d60188836031fc753b9fc0b1e1&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F16b0b51f76966da6e2ea9d5239a5098594f4e99a.jpg",
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572500092263&di=fb3951d60188836031fc753b9fc0b1e1&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F16b0b51f76966da6e2ea9d5239a5098594f4e99a.jpg",
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572500092263&di=fb3951d60188836031fc753b9fc0b1e1&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F16b0b51f76966da6e2ea9d5239a5098594f4e99a.jpg",
					"//timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572951768114&di=a4822fbaa2718bd407e26080c3106b7f&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F4%2F542a57eb5c816.jpg"
				],
				"label": [ // 自定义标签
					"最喜欢大哥哥了",'小姐姐','小哥哥','小姐姐','小哥哥','小姐姐','小哥哥','小姐姐','小哥哥'
				],
				"createdAt": "2019-11-08T03:41:55.000Z", // 创建时间 
				"description": // 资源描述
				`
					主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx主要特性xxxxxxxxx<br/>
					包含的内容<br/>
					xxxxxx包含的内容<br/>
					包含的内容<br/>
					xxxxxx包含的内容<br/>
					包含的内容<br/>
					xxxxxx包含的内容<br/>
					包含的内容<br/>
					xxxxxx包含的内容<br/>
					xxxxxx包含的内容<br/>
					包含的内容<br/>
					xxxxxx包含的内容<br/>
					包含的内容<br/>
					xxxxxx包含的内容<br/>
					xxxxxx包含的内容<br/>
					包含的内容<br/>
					xxxxxx包含的内容<br/>
				`, 
				"updatedAt": "2019-11-08T03:41:55.000Z", // 更新时间
				"commentCount": 1343,
				"rateAvg": 3, // 评价评分
				"rateCount": 132,
				"state": true,
				"isStar": false, //是否关注过

				"isRate": false,  //是否评分过
				"ver": [ // 版本 resource.ver[0].file.fileName
					{
						"id": 0,
						"verNum": "1.3.5",
						"descriptipon": "string",
						"file":{
							"fileName": "环境贴图aaa", // 资源包file名称
							"size": 133244, // file大小 b
							"id": 0 // file id
						}
					},
					{
						"id": 3,
						"verNum": "1.6.6",
						"descriptipon": "string",
						"file":{
							"fileName": "环境贴图bbb", // 资源包file名称
							"size": 333311, // file大小 b
							"id": 3 // file id
						}
					}
				],
				"tags": [ // 引擎版本
					{
						"id": 0,
						"name": "Unity 4.2 - 4.8",
						"pid": 0
					}
				]
			}
		})

		
	})
}
// -------------- o(=•ェ•=)m   end ------------------



// -------------- o(=•ェ•=)m   start 评分 ------------------
{
	// 评分
	app.post(`/rate/:id`,(req,res)=>{

		res.status(200).json({
			"msg": "string",
			"code": 0
		})
	})

}
// -------------- o(=•ェ•=)m   end ------------------


// -------------- o(=•ェ•=)m   start 评论 -----------------
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
									"id": 123,
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
					},
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
									"id": 123,
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