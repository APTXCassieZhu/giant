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
                "targetType": "software",
                "title": "软件领取通知：您已成功申领 ADOBE CS SUITE 软件，请下载",
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content":   `
                            <div style="font-size: 24px;font-weight: 600;color: #1ebf73;margin-bottom: 30px; display: flex;align-items: center;">
                                <div style="position:relative;">
                                    <div style="position:absolute;height: 58px; width: 58px;border-radius: 50%;border: solid 2px #1ebf73;"></div>
                                    <svg style="height: 58px; width: 58px;margin-right: 20px;transform: scale(0.8)" t="1573715828055" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4982" width="200" height="200"><path d="M913.017 237.02c-25.311-25.312-66.349-25.312-91.66 0l-412.475 412.474-206.237-206.237c-25.312-25.312-66.35-25.312-91.661 0s-25.312 66.35 0 91.66l252.067 252.067c0.729 0.73 1.439 1.402 2.134 2.029 25.434 23.257 64.913 22.585 89.527-2.029l458.303-458.303c25.313-25.312 25.313-66.35 0.001-91.661z" p-id="4983" fill="#1ebf73"></path></svg>  
                                </div>
                                申领成功                              
                            </div>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;">恭喜！ADOBE CS SUITE 申领成功</p>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;margin-bottom: 50px;">请移步下方地址下载，并妥善保存此下载链接</p>
                            <div style="height: 80px;width: 381px;border-radius: 3px;background-color: #f2f2f2;text-align: center; line-height: 80px;">
                                <span style="font-size: 18px;font-weight: bold;letter-spacing: 1.29px;color: #787878;">下载地址：</span>
                                <span style="font-size: 14px;font-weight: bold;letter-spacing: 1px;color: #1ebf73;">https://pt.ztgame.com/</span>
                            </div> 
                        `,          
                "ignore": false,
                "view": false,
            },
            {
                "id": 2,
                "targetType": "software",
                "title": "您已成功提交 ADOBE CS SUITE 软件申请",
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content":  `
                            <div style="font-size: 24px;font-weight: 600;color: #1ebf73;margin-bottom: 30px; display: flex;align-items: center;">
                                <div style="position:relative;">
                                    <div style="position:absolute;height: 58px; width: 58px;border-radius: 50%;border: solid 2px #1ebf73;"></div>
                                    <svg style="height: 58px; width: 58px;margin-right: 20px;transform: scale(0.8)" t="1573713963981" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4007" width="200" height="200"><path d="M1038.4 255.8l-95.2-95.2A112.504 112.504 0 0 0 864 128H410.4c-29.6 0-58.2 11.8-79.2 32.6L236 255.8H0v511.4h128c35.2 0 63.6-28.4 63.8-63.4h18.2l169.2 152.8c61.8 50.2 147.6 51.4 211.2 7.6 25 21.6 52 31.8 82.2 31.8 36.4 0 70.6-14.8 97.6-48 44.2 17.4 96.4 5.2 128-33.6l52.4-64.6c11.2-13.8 18.2-29.6 21.8-46h115.8c0.2 35 28.8 63.4 63.8 63.4h128V255.8H1038.4zM96 703.2c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.8-14.4 32-32 32z m780-13.8l-52.2 64.4c-5.6 6.8-15.6 8-22.6 2.4l-47.8-38.8-60 73c-12 14.6-30 9.6-36 4.8l-73.6-63-31.2 38.4c-27.8 34.2-78.4 39.4-110.6 13.2l-194.6-176H192V351.6h83.8l123.4-123.2c4-1.6 7.4-3 11.4-4.6H524l-77.4 71c-58.8 53.8-62.2 144.6-8.8 202.6 29.6 32.4 122.4 82.4 203 8.8l16.4-15 216.4 175.6c6.8 5.6 7.8 15.8 2.4 22.6z m212-81.6h-138.4c-4.6-5.6-9.8-10.8-15.4-15.4l-205.4-166.8 25-22.8c13-12 14-32.2 2-45.2L734 334.2c-12-13-32.2-13.8-45.2-2l-110.4 101.2c-19 17.4-51.4 18.8-69.2 0-18.6-19.8-17-50.2 2.4-67.8l131.2-120.2c14.8-13.6 34-21 54-21l167.4-0.4c4.2 0 8.2 1.6 11 4.6l123.4 123.2H1088v256z m96 95.4c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.8-14.4 32-32 32z" fill="#1ebf73" p-id="4008"></path></svg>                                
                                </div>
                                已受理
                            </div>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;">你的申领已经受理，我们会尽快处理。</p>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;margin-bottom: 50px;">请牢记下方的回执编号，处理结果请注意通知信息，谢谢！</p>
                            <div style="height: 80px;width: 381px;border-radius: 3px;background-color: #f2f2f2;text-align: center; line-height: 80px;">
                                <span style='font-size: 18px;font-weight: bold;letter-spacing: 1.29px;color: #787878;'>回执编号：</span>
                                <span style='font-size: 24px;font-weight: bold;letter-spacing: 1.71px;color: #1ebf73;'>888899</span>
                            </div> 
                        `,
                "view": false,
                "ignore": false,
            },
            {
                "id": 3,
                "targetType": "software",
                "title": "您已成功提交 office 2012 软件申请", 
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content":  `
                            <div style="font-size: 24px;font-weight: 600;color: #1ebf73;margin-bottom: 30px; display: flex;align-items: center;">
                                <div style="position:relative;">
                                    <div style="position:absolute;height: 58px; width: 58px;border-radius: 50%;border: solid 2px #1ebf73;"></div>
                                    <svg style="height: 58px; width: 58px;margin-right: 20px;transform: scale(0.8)" t="1573713963981" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4007" width="200" height="200"><path d="M1038.4 255.8l-95.2-95.2A112.504 112.504 0 0 0 864 128H410.4c-29.6 0-58.2 11.8-79.2 32.6L236 255.8H0v511.4h128c35.2 0 63.6-28.4 63.8-63.4h18.2l169.2 152.8c61.8 50.2 147.6 51.4 211.2 7.6 25 21.6 52 31.8 82.2 31.8 36.4 0 70.6-14.8 97.6-48 44.2 17.4 96.4 5.2 128-33.6l52.4-64.6c11.2-13.8 18.2-29.6 21.8-46h115.8c0.2 35 28.8 63.4 63.8 63.4h128V255.8H1038.4zM96 703.2c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.8-14.4 32-32 32z m780-13.8l-52.2 64.4c-5.6 6.8-15.6 8-22.6 2.4l-47.8-38.8-60 73c-12 14.6-30 9.6-36 4.8l-73.6-63-31.2 38.4c-27.8 34.2-78.4 39.4-110.6 13.2l-194.6-176H192V351.6h83.8l123.4-123.2c4-1.6 7.4-3 11.4-4.6H524l-77.4 71c-58.8 53.8-62.2 144.6-8.8 202.6 29.6 32.4 122.4 82.4 203 8.8l16.4-15 216.4 175.6c6.8 5.6 7.8 15.8 2.4 22.6z m212-81.6h-138.4c-4.6-5.6-9.8-10.8-15.4-15.4l-205.4-166.8 25-22.8c13-12 14-32.2 2-45.2L734 334.2c-12-13-32.2-13.8-45.2-2l-110.4 101.2c-19 17.4-51.4 18.8-69.2 0-18.6-19.8-17-50.2 2.4-67.8l131.2-120.2c14.8-13.6 34-21 54-21l167.4-0.4c4.2 0 8.2 1.6 11 4.6l123.4 123.2H1088v256z m96 95.4c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.8-14.4 32-32 32z" fill="#1ebf73" p-id="4008"></path></svg>                                
                                </div>
                                已受理
                            </div>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;">你的申领已经受理，我们会尽快处理。</p>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;margin-bottom: 50px;">请牢记下方的回执编号，处理结果请注意通知信息，谢谢！</p>
                            <div style="height: 80px;width: 381px;border-radius: 3px;background-color: #f2f2f2;text-align: center; line-height: 80px;">
                                <span style='font-size: 18px;font-weight: bold;letter-spacing: 1.29px;color: #787878;'>回执编号：</span>
                                <span style='font-size: 24px;font-weight: bold;letter-spacing: 1.71px;color: #1ebf73;'>598155</span>
                            </div> 
                        `
                ,
                "view": false,
                "ignore": false,
            },
            {
                "id": 4,
                "targetType": "software",
                "title": "您已成功提交 weibo 软件申请", 
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content":  `
                            <div style="font-size: 24px;font-weight: 600;color: #1ebf73;margin-bottom: 30px;display:flex;align-items: center;">
                                <div style="position:relative;">
                                    <div style="position:absolute;height: 58px; width: 58px;border-radius: 50%;border: solid 2px #1ebf73;"></div>
                                    <svg style="height: 58px; width: 58px;margin-right: 20px;transform: scale(0.8)" t="1573713963981" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4007" width="200" height="200"><path d="M1038.4 255.8l-95.2-95.2A112.504 112.504 0 0 0 864 128H410.4c-29.6 0-58.2 11.8-79.2 32.6L236 255.8H0v511.4h128c35.2 0 63.6-28.4 63.8-63.4h18.2l169.2 152.8c61.8 50.2 147.6 51.4 211.2 7.6 25 21.6 52 31.8 82.2 31.8 36.4 0 70.6-14.8 97.6-48 44.2 17.4 96.4 5.2 128-33.6l52.4-64.6c11.2-13.8 18.2-29.6 21.8-46h115.8c0.2 35 28.8 63.4 63.8 63.4h128V255.8H1038.4zM96 703.2c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.8-14.4 32-32 32z m780-13.8l-52.2 64.4c-5.6 6.8-15.6 8-22.6 2.4l-47.8-38.8-60 73c-12 14.6-30 9.6-36 4.8l-73.6-63-31.2 38.4c-27.8 34.2-78.4 39.4-110.6 13.2l-194.6-176H192V351.6h83.8l123.4-123.2c4-1.6 7.4-3 11.4-4.6H524l-77.4 71c-58.8 53.8-62.2 144.6-8.8 202.6 29.6 32.4 122.4 82.4 203 8.8l16.4-15 216.4 175.6c6.8 5.6 7.8 15.8 2.4 22.6z m212-81.6h-138.4c-4.6-5.6-9.8-10.8-15.4-15.4l-205.4-166.8 25-22.8c13-12 14-32.2 2-45.2L734 334.2c-12-13-32.2-13.8-45.2-2l-110.4 101.2c-19 17.4-51.4 18.8-69.2 0-18.6-19.8-17-50.2 2.4-67.8l131.2-120.2c14.8-13.6 34-21 54-21l167.4-0.4c4.2 0 8.2 1.6 11 4.6l123.4 123.2H1088v256z m96 95.4c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.8-14.4 32-32 32z" fill="#1ebf73" p-id="4008"></path></svg>                                
                                </div>
                                已受理
                            </div>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;">你的申领已经受理，我们会尽快处理。</p>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;margin-bottom: 50px;">请牢记下方的回执编号，处理结果请注意通知信息，谢谢！</p>
                            <div style="height: 80px;width: 381px;border-radius: 3px;background-color: #f2f2f2;text-align: center; line-height: 80px;">
                                <span style='font-size: 18px;font-weight: bold;letter-spacing: 1.29px;color: #787878;'>回执编号：</span>
                                <span style='font-size: 24px;font-weight: bold;letter-spacing: 1.71px;color: #1ebf73;'>112233</span>
                            </div> 
                        `,
                "view": false,
                "ignore": true,
            },
            {
                "id": 5,
                "targetType": "software",
                "title": "您已成功提交 bilibi 软件申请", 
                "createdAt": "2019-11-13T10:02:44.000Z",
                "updatedAt": "2019-11-13T10:02:47.000Z",
                "content":  `
                            <div style="font-size: 24px;font-weight: 600;color: #1ebf73;margin-bottom: 30px; display: flex;align-items: center;">
                                <div style="position:relative;">
                                    <div style="position:absolute;height: 58px; width: 58px;border-radius: 50%;border: solid 2px #1ebf73;"></div>
                                    <svg style="height: 58px; width: 58px;margin-right: 20px;transform: scale(0.8)" t="1573713963981" class="icon" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4007" width="200" height="200"><path d="M1038.4 255.8l-95.2-95.2A112.504 112.504 0 0 0 864 128H410.4c-29.6 0-58.2 11.8-79.2 32.6L236 255.8H0v511.4h128c35.2 0 63.6-28.4 63.8-63.4h18.2l169.2 152.8c61.8 50.2 147.6 51.4 211.2 7.6 25 21.6 52 31.8 82.2 31.8 36.4 0 70.6-14.8 97.6-48 44.2 17.4 96.4 5.2 128-33.6l52.4-64.6c11.2-13.8 18.2-29.6 21.8-46h115.8c0.2 35 28.8 63.4 63.8 63.4h128V255.8H1038.4zM96 703.2c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.8-14.4 32-32 32z m780-13.8l-52.2 64.4c-5.6 6.8-15.6 8-22.6 2.4l-47.8-38.8-60 73c-12 14.6-30 9.6-36 4.8l-73.6-63-31.2 38.4c-27.8 34.2-78.4 39.4-110.6 13.2l-194.6-176H192V351.6h83.8l123.4-123.2c4-1.6 7.4-3 11.4-4.6H524l-77.4 71c-58.8 53.8-62.2 144.6-8.8 202.6 29.6 32.4 122.4 82.4 203 8.8l16.4-15 216.4 175.6c6.8 5.6 7.8 15.8 2.4 22.6z m212-81.6h-138.4c-4.6-5.6-9.8-10.8-15.4-15.4l-205.4-166.8 25-22.8c13-12 14-32.2 2-45.2L734 334.2c-12-13-32.2-13.8-45.2-2l-110.4 101.2c-19 17.4-51.4 18.8-69.2 0-18.6-19.8-17-50.2 2.4-67.8l131.2-120.2c14.8-13.6 34-21 54-21l167.4-0.4c4.2 0 8.2 1.6 11 4.6l123.4 123.2H1088v256z m96 95.4c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.8-14.4 32-32 32z" fill="#1ebf73" p-id="4008"></path></svg>                                
                                </div>
                                已受理
                            </div>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;">你的申领已经受理，我们会尽快处理。</p>
                            <p style="font-size: 18px;font-weight: 600;color: #8d8d8d;margin-bottom: 50px;">请牢记下方的回执编号，处理结果请注意通知信息，谢谢！</p>
                            <div style="height: 80px;width: 381px;border-radius: 3px;background-color: #f2f2f2;text-align: center; line-height: 80px;">
                                <span style='font-size: 18px;font-weight: bold;letter-spacing: 1.29px;color: #787878;'>回执编号：</span>
                                <span style='font-size: 24px;font-weight: bold;letter-spacing: 1.71px;color: #1ebf73;'>0542782</span>
                            </div> 
                        `,
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