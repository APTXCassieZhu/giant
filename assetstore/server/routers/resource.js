var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const path = require('path');
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.delete('/:id', jsonParser, function(req,res){
    console.log('delete source : '+req.params.id)
    res.status(200).json({'code': 0})
})
router.put('/:id',jsonParser, function(req,res){
    console.log(req.body.state+' source : '+req.params.id)
    res.status(200).json({'code': 0})
})
router.get('/:id/version', jsonParser, function(req,res){
    res.status(200).json({
        'msg':'msg-233333',
        'data': {
                'list':[
                    {'id': 101,
                    "verNum": "2.01",
                    "updatedAt": "2019-11-08T03:41:55.000Z",
                    "descriptipon": "<p>全新清新简洁的界面设计、还加入自定义小组件字体颜色，自定义事件字体颜色、现在可以自行控制是否显示已经还有这些字样了。</p>"+
                    "<p>1、全新清新简洁的界面设计，让操作更简洁；</p>"+
                    "<p>2、可以自定义小组件的字体颜色；</p>"+
                    "<p>3、可以自定义事件的字体颜色；</p>"+
                    "<p>4、还可以自行控制是否显示已经还有这些字样；</p>",
                    "files": [
                        "string"
                    ]},
                    {'id': 102,
                    "verNum": "1.91",
                    "updatedAt": "2019-10-08T03:41:55.000Z",
                    "descriptipon": "<p>1、联盟战争提醒界面，坐标前增加名城信息。</p>"+
                    "<p>2、城主信息：非本联盟显示更详细的当前所在名城信息。</p>"+
                    "<p>3、被攻击全屏发红效果，优化为在其他界面中也能看到。</p>"+
                    "<p>4、优化邮件字太小。</p>"+
                    "<p>5、收到好友申请时，增加举报按钮。</p>"+
                    "<p>6、城主界面增加玩家的归属区域信息显示。</p>"+
                    "<p>7、搜索功能优化。 </p>",
                    "files": [
                        "string"
                    ]},
                    {'id': 102,
                    "verNum": "1.01",
                    "updatedAt": "2019-09-08T03:41:55.000Z",
                    "descriptipon": "<p>首次发布资源</p>",
                    "files": [
                        "string"
                    ]},
                ]
        }, 
        'code': 0
})
});

//export this router to use in our index.js
module.exports = router;