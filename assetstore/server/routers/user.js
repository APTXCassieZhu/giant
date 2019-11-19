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
				'name':'夏目',
				'nickName': '睿酱', 
				'signature': '啦啦啦，每天都要开心鸭', 
				'account':'xiamu@ztgame.com',

				"id": 123, 
				"profilePic": "//avatars1.githubusercontent.com/u/38572741?s=460&v=4",
				"dept": "前沿技术部",
				"title": "string",
			}
			
		});
    }
    
})
router.get('/star', jsonParser, function(req,res){
	console.log('关注列表')
	res.status(200).json({
		'code': 0,
		'data':{
			"count": 10,
			"list" :[{
				"id": 000,
				"name": "我关注的尊老爱幼",
				"images": [
					"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=ef9c6b2c38fa828bd1239ae5c5242609/54fbb2fb43166d221ce8fabd4d2309f79052d278.jpg",
				],
				"rateAvg": 5,
				"user":{
					"id": 007,
					"name": "社会主义的接班人",
				}
			},{
				"id": 999,
				"name": "我关注的你",
				"images": null,
				"rateAvg": 0,
				"user":{
					"id": 250,
					"name": "憨批",
					"nickName": "小可爱",
				}
			},
			{
				"id": 111,
				"name": "我关注的大宝贝",
				"images": null,
				"rateAvg": 4.5,
				"user":{
					"id": 250,
					"name": "baby",
					"nickName": "热巴",
				}
			},
			{
				"id": 666,
				"name": "我关注的皮卡丘",
				"images": null,
				"rateAvg": 4.8,
				"user":{
					"id": 250,
					"name": "pikaqiu",
				}
			},{
				"id": 4399,
				"name": "我关注的是你",
				"images": null,
				"rateAvg": 3.5,
				"user":{
					"id": 520,
					"name": "丘比特"
				}
			}]
		}
	})
})
router.get('/describe', function(req, res){
	res.status(200).json({
			'msg':'msg-233333',
			'data': {
					'name':'夏目',
					'nickName': '睿酱',
					'signature': '啦啦啦，每天都要开心鸭', 
					'account':'xiamu@ztgame.com',

					"id": 123, 
					"profilePic": "//avatars2.githubusercontent.com/u/18524392?s=460&v=4",
					"name": "string",
					"dept": "未来技术研究部",
					"title": "string",
			}, 
			'code': 0
	})
});
router.get('/:id', jsonParser, function(req,res){
	console.log('ask for user information')
	res.status(200).json({
		'code':0,
		// 'data': {
		// 	'name':'夏目',
		// 	'nickName': '睿酱', 
		// 	'signature': null, 

		// 	"id": 123, 
		// 	"profilePic": "//avatars1.githubusercontent.com/u/38572741?s=460&v=4",
		// 	"dept": "前沿技术部",
		// 	"title": "string",
		// 	"labels": null,
		// 	"fineResources": null,
		// }
		'data': {
			'name':'夏目',
			'nickName': '睿酱', 
			'signature': '给你变个魔术~ 哇~ 我变得超喜欢你了！', 

			"id": 123, 
			"profilePic": "//avatars1.githubusercontent.com/u/38572741?s=460&v=4",
			"dept": "前沿技术部",
			"title": "string",
			"labels": ['小天使','小棉袄','小甜饼','柯南骨灰粉','正义使者','你老爸','暴躁老妹'],
			// "labels": null,
			"fineResources": [
				{
					"id": 0,
					"name": "世界和平",
					"images": [
						"data:image/jpeg;base64,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",
					  	"data:image/jpeg;base64,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",
					],
					"label": "string",
					"commentCount": 0,
					"viewCount": 0,
					"rateAvg": 0
				},
				{
					"id": 11,
					"name": "操控天气",
					"images": [
					  	"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAEgASAMBIgACEQEDEQH/xAAaAAACAwEBAAAAAAAAAAAAAAAABgQFBwID/8QANxAAAQMCBQIDBgQFBQAAAAAAAQIDBAURAAYSITFBURMiYQcUMnGBoSNSYpEzQkPB0RUWJDTw/8QAGQEAAgMBAAAAAAAAAAAAAAAAAAMBAgQF/8QAJBEAAwACAQQABwAAAAAAAAAAAAECAxESBCExQRMjMkKBkbH/2gAMAwEAAhEDEQA/ANxwYMRFKVKWUNqKWEmylDlR7DAB2uUNRQygurHITwPmcchMpwXLrbYPRCb/AHP+MI2c4eYJNQVDjqQ1SEhDgKtLcfw7ELS6om5IIv2IUNticedPz1S6DRo1OQ+7VFRk+F7wlJQ3YHZIKiVKsLC4Bva+Lxju/pWytUp8ls3neiuPhhFSll1TnhgeABc3t2wzlMpvdLzbg7LTp+4xn072hQJsQxpVIWtKlXU349iCgpVyBe4Nj9MSZmdaRmKkyKY9JcpapiC0H3U62yDyNQO1xt5rWvxi76fKvtIWSH7HluUNQQ8ktLPF9wr5HEnCDkagV6lSVRZ09t6jobJQ2khaHQo+XRsNFgLkD83XnDmlSoiwhZKmFGyVE7oPY+nrhJcl4MGDABHmLVpSyg2W4bXHQdThGg1x+XVvfkSVR6bFClrU07dtuOkEeG+0oXS8Vbi29r9iFO6PPNdUTs2kIH13P9sZ77XqqiK1HpTTaf8AlHx5NvKVBOybkeo6/lGGYcbyWpK3XGdinmfNszMUtxx27dMbNmovRfbV3V1v06etxkjJhzAEVWpa48QGzLbav4lu1x5Ug/ufvW0LJE/MMZDsU+6xU/1H9wtR3Om25tsOANsaFPqyaDTadl2lvxnKwpLMZtHIa2ALik9tibHnHRzZFE/Dw+f4Zolt8rJzWScttNpQmlNeU3CipRUD3ve99hhOzjkNqkxH6nRGy6wgan4bqioBI5Unrt68fbDenK10hcivVpco/wBZMwti/ogeW3pY4j0muhmdJy7mCW2qYhfhsPrRoEtCk3Hpq3sR16YyRlyS9zWxtTLWmtGeZQzjJy9MbakOLfpDx3QeWfVIHFuoHPPXdjrsuoUjN8aa2/KqkeoNaWGLizqSSS2gAhNwLG9gbbkkA4W8wZHm5dpy33tM2KkhXiNeXwze3mHNiOoPQYc/ZNWPfaI9DfKQqAuyOdm1bjnsQofK2HdVEXPxcf5K4qcvjQ6Q1q0qZcvrbtzyQeD/AO7YMclaPe2XG1pUlYU2Sk3Fxv8A5wY55oINTUER5KlJZV+OPK8ElJ8otfUpI++Mo9qJR/r7OtxwFNPaCbNgi3m/V3vjXprayZbbalJU42FpKb3uNjb14xmntTpT6kUqoCMpK/CMZ1sHWUW8yASOtirGvomlmQnOtwaZHbTTaChEROoR4v4YH81k7fvityHFYRlqFNSAuVOaTJkvn4nHF7m59CbW6WwvZSz5AjUyLBrj4ZdbaCUPfGlaQLbkXsRYj6Yt10qqUaG+/lea27DIU+3T32dY38xS0sKGkHoDcC+KVjqdzXbb/ZKpPTRAptAiZsYeqVVfkmaJziU+G6U+7JbWQGwOBsASbXJN8XWe/dP9pVIzNNgyosk8+Lbyaf1arWtioadypWXnZsesO0yU9/2mW5hirUrjzoJ5HFx++Irf+zafUmf9KhSqvKbVqSiGpcpLKvzbq0g3684u03W3vt60R20Ofhe8ULwqkkEuRdMgK43T5r/fGXeyApEyqBtxwhUIFV0WsQduCT1OGTNc7NFXp78Ol5flxo7qClbjrjYcWDykJCtha/r02xV+z+lu0Sk1WTVm/c3ZK0xm0SQpN7An52N+fTFpXDBe359EPvkWh3pgCYkVCRYJfIAOx+E3uLnf6+uDEiGlRMVC9WpKC6rUpSrX4+Ik9T1wYxDyVMQqyXmxdbRvbuOows1ikR5cKXCe3gzTrSUkqWFbHxAOmnre+wAvwnDdivlxkhC0LbLkVZutscpPNx3HcYlNp7QNbMCqNKlU6WqmTE/iX1sOJ3Q4D1SeqVAfQj54asoZ4n0RgU+pIRIjtJs2grs62B/LtfgdDbi18O1VpCZzSY0xpMqApH8fWUrSo2Fwobp7np0thKmZCWQh2DUGykbp96/Ddat0JF0mxBG+n4Tvtjpz1OLNPHKZXjqHuS7lZ1yXPQJU+kKecJt+NDbUq/zv/fEGo+0J1pAhZYpkaMNgAsAKSbcBsWFx8zisTkKqFIUFQwrWSE+OmwVYdPvb6cYm0/2ehLLkmp1AFhKgHUwgXHHNVj8RHFlA2AN/XEa6We+9h81+irgzM0Zoqghpq8tCGvNKkBZabaT1JCbDbgDrb5206Ell7w0MvKXDit+F4inCsqHXUbkKvtcEX3uOhxHptODMNliGhqHTmjdViSVW66zuo34P6QePLi6jseKEXSUsI3SlXKz3PYdhjHnzLI9StJDojj5PaGg2U8sWU4b2/KOgwYk4MIGBgwYMAEdcUaytlamlnnTwfmMRHYWoEOw2XAerZ0Enc3t33P74MGADkREhRWI0rWUlJPiA3BCQRz+kY7jw1Mp0x4rbKdvjWVWtxZPG1h+w7YMGACUiKNQW8ourHGrgfIYkYMGAAwYMGAD/2Q==",
						"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAvCAMAAAB3wnyXAAAAaVBMVEUoRYr///8iQYglQ4kAMIEbPYYNNoMALYAYO4UAMoIUOYQeP4fM0eDX2+fCyNpOY5vg5O2Pm7z3+Puzu9E0T5Chq8fq7fRfcaNHXpksSYytts6cpsSCj7VZbKBTZ515iLA9VZNtfaoAHXp80gLkAAADW0lEQVRIiZVX2QKjIAykHEHwRqtUba37/x+5gPWq4HbzYlUcQjKZpOgWtCbpyrHV9QOhR63bse+SJrwa+R+nfQsUZBRjgpwRHEfSPGr79HegbJRCLghHI1gKmLJfgIoBgPkwNjAGMBT/AEqe/BplweLP5AIofdH4BxhnMX2lASA1/g4zQ43KB5SR6H9grEU4OwOV1JumayN0+AZqwbswAkJAXmwBrdoDKe09FoGyUaqptAwjRVrtgLQ35yRe8lJ6/Z2N5RtQ6w+z2Kjywhc+tQtQ798vnrbkZhcuIehnoIIG3u+4qwJrZqOFA8pDNHRRrN6jvVwczfieW6BMBN66k/UUc+sZXLKMJgboFXBIdub7RhD8xzhe2N1iEEJA5HEuft5Qwz83BB03FYULMtb22sYIi7ZKizTrc3pOMm9Q5cgWA5UYOGxLsKNHSlFcqPQpkazX2BcD/eadrNDAbMlMmY2sSoYFivD5u9ZASIgxH247ayZ+PCAbUI4RfmzKokoeEYQj3n0ePDkAcP2t1MnjwCz8QjUhRO2XNKXG752UplWV+brHHWD2ysg4JrX5AWa35N73VaA/BK3LuUkjf92L3OSpJjrtTdewzeZR+dYXyV7pm+rebTsWqX1XSeNRjsmaKyLy0yE6RIG/VyUsOUgpWL+PRklNjl3Wdsyi96M3GkgcEULH+X76hFiK4eOW6mrpstYdRYvAe1erd9MOTHM1ckVdFvu1nAgTrB2HMadOPw2PVmavS0RdJs7zzLiDwLo4YeZcIgfyx4wxvDL7lp9qB0dAWf2WtlBd6VaYyNJck0B92zIIVj+ZdwcbZsmYlZxbGWpYIrN6pK+0xpLslurWhTYkuFg7YUu/o3QA2k0eKtSXeDpr9lWPiHbFGhJusPFzXeR5MYGwjXrntMwrXrcFSL3DSKxdCex3iL3VCnRrrpDqytSNSqdLnKX3qzzclTHI+k2EX9plfuj9xsYQ2dDKKY+Jcfl+m4+q6Jeh72Cx3HRnN7E1E71sg9+GabsTncMMmWjxMxQW+jCOfk21mabsl8mNUf01bJ/m7HSi8A+3TAOcTvrumfxV1VJvY3YgRmLaSp2/CvwXSUrTISBi8ZJ4QmIWgeD5R/R+BbJWZPdyyusZqM6n8p6d/jhs9hd2GSkIfuCOcAAAAABJRU5ErkJggg==",
					],
					"label": "string",
					"commentCount": 0,
					"viewCount": 0,
					"rateAvg": 0
				},
				{
					"id": 222,
					"name": "天赐良缘",
					"images": [
					  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAEgASAMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABwQFAgMGAQj/xAA5EAABAwMCBAIHAw0AAAAAAAABAAIDBAURITEGEhNRQbEjMmFxc5HBFCLwBxUmMzZSU3KBgpKhsv/EABoBAQACAwEAAAAAAAAAAAAAAAADBQIEBgH/xAAsEQADAAIBAgQFAwUAAAAAAAAAAQIDEQQSIQUxUXEzNEFhoSIy8EKRscHR/9oADAMBAAIRAxEAPwB4ZHdAGR3QHuUAIAQAgBACAEB89ch7n5qj62drowLT3PzXvUxpGVPV1lHIJKSqngeDnMUhb5LNW15MwrHFrVJMaH5P+LpbzzW+5EGtiZzNkAA6zfHIGzh/tb+DM7/TXmUHiHCWH9cftf4O2WyVgIAQAgBAIXpaLnNnbGt8ayTBHexSJnhacFPdDxdbHMOMylp9oLSPqtjA9ZEanOSfGvY8hsrU5UEAIAQAgEkY9Fy+ztjRKwDfxWaYIkrVLLBO4RGOKrX8ceRWzg+IjU5vy9+w4Km922kkfFPWRNkj9dgOS33gbK0rJE9mzm442a0nM9me014oqqZsMD5HPdtmF4HzIwk5Jp6R5fHyQt0vyiwWZCCA1VM8dNBJPM7lijaXPdjYDdeNpLbMpl3SmfNiedjC5Q7Up75VWWPhy6faXQG9R1kTaZjnekERa0nA/d1fn2/0V/wJSwL7nM+KU3yX9kjCF5kpIHuOS6NpJ94VbSStpep0OFusct+iLHhL9qrX8ceRWxx/iIg5vy9+w3780fmK440zTSf8lWmX9j9jm+L8ePdf5CSSpjtcLqNkbpSxgzK7DGDGrj7uybalaPFMPK+vy7+XmVUd4fDXU0TbvSV5mmEckUcYBZnxBBOMdiolk00urZtPjpxVPG50tp/z/RMZLcq64V8ENTHT01PK1geI+Z5PI1xGumPvdlmnVU0n2RE5xY8cU1ttevbzaIN0qayo4YuDXyRCWB8kM7umfSNGmgzoSCO/isLdPGybDGOOTGk9PTX2F0ZFz3SdKcPxbZLnWXc1FFG2WKVrRnqBvIQMa5KuOHyMcYumnrRQeI8TNefqidpnRRMMFNDCXAmONrCRscDC0m+qmy8xy5hS/oiy4SP6V2v448ip8HxJNfm/L37DmusL6m11cEQBklhexoJxqQQFa2ty0jmMNKMs0/JNEK6UM1VaqeFkbJHROje+CR2GzBu7SfwNFhcNykTYc0xldPtvff039SJPS3SqfSvbSU9JBTTskEDXhzpMaHUYDcAnTXKxc29dtJEs3ghUup06TW/T/pZWqmlgqbk+UDE9V1IyDu3kY3zaVJEtOvc182SbmEvotflsiVFsqZLfeIGcgfVSufDk6eq0a9tWlYOG5pepLGeFkx0/6V3/ALsQ9PxRHUVMEDKWbmlcGaEEhxOAABuq58Gkm9lxPicOkuk7Sk4ZuVS0Pl6dMzGfSHLvkPrhRxxrfd9jPJ4jhh6nubxwjGf1le938sWPqVIsKX1NZ+J19JJdh4XZS8QUM8VY55il5i0x74B8cqXFCWRaIs/Pq8VS58xnDZWRTAgBACAEAtbHwLYrHX/bqOCV87c9N00hf0s6fdHfHiclazpvsbB0kgaWnn2WDBBI5jhuTnbuojIurJbHQPNTOCHEYY07j2rYw4ul9TIsl77IulskQIAQAgBAa+hD/CZ/iF50r0Pds8NPAd4Yz/aE6V6DbMmQxM9SNjfc3CJJDbZmvTwEAIAQAgBAf//Z",
					],
					"label": "string",
					"commentCount": 0,
					"viewCount": 0,
					"rateAvg": 0
				},
				{
					"id": 3,
					"name": "救死扶伤",
					"images": [
					  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEcAAABFCAMAAAAvpgsmAAAAclBMVEX/////MzP/JSX/ICD/Ly//Ghr/+vr/np7/TEz/tLT/HR3/Ozv/nJz/7+//u7v/9vb/ra3/5OT/UFD/6en/QED/29v/wcH/1NT/j4//ior/RUX/l5f/cXH/goL/qKj/VFT/ysr/YmL/XFz/aWn/e3v/CQnPQQ/aAAADn0lEQVRYhaWY6daqMAxF26QBKSIgkwyCCvf9X/Gi+MnQVlDPH9dq6gbSJk3D2DtFTlVwIdyrnbyd915ZBSRBuBwk0dGxvqP4OUhogyyMouRwdkk22TeY8Ih0DkdqzSXUX2AA4/nz/TPS6VOMF+PNWw7WKO0POS02CoaxAOnyEcZBCHXjJ3Q1eKM8lwK9pZH5B5yajgZLJoX2RfUq5MFkamW5GZNRbPTChWJ/K6eks9lYbFkyPwrDyL+ZP6tfMsrDixMEhyzST7Aup2vM4R6XYohuy5tp+J4UH2FLJPnN1vi8LrA3ohD9LD64JxDuRGLYyyGRaKquu8aSpDgvHHmJCeM8DftnWlGWDoNBTx0FA8dykmcC8Q5XkMKZYkqJmvwSAJ8INLGVtbPYzSWeNFlqncOYDfK1uDaBo5uzhcMOQE9DhqjFbOP0MY2PRGU1aIi9bRx2xubuFEdyQwbfyLH4Y982phyxldOnh4axhLgp8LZyfE5JD+tM9q0c1lHNKpotljWK1XPOfmKccxyqWIHT48VqdqNiMeWIeGJJZ5wMCsZnidKKpyHFZ5oYaJ5YQsGZ4LM8Uiz+rBfOOREXTIjfOff3iWFWkuy+4WRYsKtMf+bc16ucH/5fce7750I760eOJ2TCfHd2kBy/4Njyxu459fYbx4OHiyM+3VXN55wW28dvLd3wB06Jz+OOXbHxv+bs4fU5Hh+rrw85VidprD7DGPkz6o8SXlrG6Wj59+RkOwnTbBo2CPkjzlLnpUM+yz+iO4y2h0OzDmVxme6Avugm4MvyuC8JJlrmQ68FwFzJyRdB6WLo8JbDKig0t45U7pbHzwonfC34jE5KHl/hsE5TvFoACnyNk5GruCejo3KqrnF0taKtqS1XOTkpRXCnOZ1XOQ61y6GbVF5xnXPPywsVqpvXOQnwxYgV6zj/YCLaqxxccrTvk5T7icqLMkHzXY3GP6vS+LkyVlNvdFZjwDaXQUb19ZNyFc8+uA/9KaBGrSxj4yUnNFxsfC419XJNSt546lbpx8+ohmRPjw03xhJxmeCGByNoGxWpfn6AAK4mX9loWuGTFCooQLlvUUmg9yaF8cJbESz2/tDT8I8I82cfCpRvmiY5UpGOvvP+eixWhbRz/o7KqC5I7t42cdJCUnFKk8iLEufMSd6e0wNXkrjme7vsjkAytleaSp4d9zdY4EMPqhnviF7dAA0SrbOhyWFl5e1eKqs9sSity5PtZFrIf7/RNyPJNRsjAAAAAElFTkSuQmCC",
					],
					"label": "string",
					"commentCount": 0,
					"viewCount": 0,
					"rateAvg": 0
				},
				{
					"id": 44,
					"name": "正义之眼",
					"images": [
					  "data:image/png;base64,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",
					],
					"label": "string",
					"commentCount": 0,
					"viewCount": 0,
					"rateAvg": 0
				},
				// {
				// 	"id": 555,
				// 	"name": "尊老爱幼",
				// 	"images": [
				// 	  "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=ef9c6b2c38fa828bd1239ae5c5242609/54fbb2fb43166d221ce8fabd4d2309f79052d278.jpg",
				// 	],
				// 	"label": "string",
				// 	"commentCount": 0,
				// 	"viewCount": 0,
				// 	"rateAvg": 0
				// },
				// {
				// 	"id": 6,
				// 	"name": "天降神子",
				// 	"images": null,
				// 	"label": "string",
				// 	"commentCount": 0,
				// 	"viewCount": 0,
				// 	"rateAvg": 0
				// },
			],
		}
	})
});
router.get('/:id/resource', jsonParser, function(req,res){
	res.status(200).json({
		'code': 0,
		'data':{
			'count': 5,
			"list": [{
				"id": 0,
				"name": "尊老爱幼",
				"images": [
					"https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=ef9c6b2c38fa828bd1239ae5c5242609/54fbb2fb43166d221ce8fabd4d2309f79052d278.jpg",
				],
				"label": "string",
				"downloadCount": 8250,
				"stars": 1024
			},{
				"id": 294,
				"name": "神迹是我和你共同降下的",
				"images": null,
				"label": "string",
				"downloadCount": 270,
				"stars": 570
			},{
				"id": 9647,
				"name": "攘外并先安内！",
				"images": null,
				"label": "string",
				"downloadCount": 332,
				"stars": 56
			}]
		}
	})
});
router.delete('/label/:id', jsonParser, function(req,res){
	res.status(200).json({'code':0})
});
router.put('/', jsonParser, function(req,res){
	res.status(200).json({'code':0})
});
//export this router to use in our index.js
module.exports = router;