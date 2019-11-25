<template>
	
		<div class="feedback">
			<div v-if="status=='pick'" class="feedback-pick">

				<div class="feedback-close" @click="handleClosePick">
					<svg t="1574001512032" class="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="951" width="200" height="200"><path d="M664.377948 511.42322l326.997958 326.997959a108.146166 108.146166 0 0 1-152.954727 152.954727l-326.997959-326.997958-326.997958 326.997958a108.146166 108.146166 0 0 1-152.954728-152.954727l326.997959-326.997959L31.470534 184.425262A108.146166 108.146166 0 0 1 184.425262 31.470534l326.997958 326.997959L838.421179 31.470534a108.146166 108.146166 0 0 1 152.954727 152.954728z" p-id="952" fill="#787878"></path></svg>
				</div>
				<div class="feedback-pick-inner">
					<div style="font-size: 21px;font-weight: 600;margin-bottom: 39px;">
						您对我们的网站满意吗？
					</div>
					<div class="feedback-pick-smiles">
						<div @click="handleGreat">
							
							<svg t="1574002065349" class="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="5069" width="200" height="200"><path d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m161.877333 394.517334c-60.416 168.192-279.445333 168.192-322.922666 2.688l-61.909334 16.256c59.989333 228.266667 364.032 228.266667 445.077334 2.688l-60.245334-21.632zM426.666667 362.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v64a42.666667 42.666667 0 1 0 85.333333 0v-64a42.666667 42.666667 0 0 0-42.666666-42.666666z m170.666666 0a42.666667 42.666667 0 0 0-42.666666 42.666666v64a42.666667 42.666667 0 1 0 85.333333 0v-64a42.666667 42.666667 0 0 0-42.666667-42.666666z" p-id="5070" fill="#1ebf73"></path></svg>
							<span>满意</span>
						</div>
						<div @click="handleFrom">
							<svg t="1574002119619" class="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="5232" width="200" height="200"><path d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m-167.552 489.706667l36.437333 52.629333c95.701333-66.261333 166.528-66.261333 262.229334 0l36.437333-52.629333c-117.632-81.408-217.472-81.408-335.104 0zM426.666667 362.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v64a42.666667 42.666667 0 1 0 85.333333 0v-64a42.666667 42.666667 0 0 0-42.666666-42.666666z m170.666666 0a42.666667 42.666667 0 0 0-42.666666 42.666666v64a42.666667 42.666667 0 1 0 85.333333 0v-64a42.666667 42.666667 0 0 0-42.666667-42.666666z" p-id="5233" fill="#1ebf73"></path></svg>
							<span>不满意</span>
						</div>
					</div>

				</div>
			</div>
			<div v-if="status=='great'" class="feedback-great">
				<div class="feedback-close" @click="handleClosePick">
					<svg t="1574001512032" class="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="951" width="200" height="200"><path d="M664.377948 511.42322l326.997958 326.997959a108.146166 108.146166 0 0 1-152.954727 152.954727l-326.997959-326.997958-326.997958 326.997958a108.146166 108.146166 0 0 1-152.954728-152.954727l326.997959-326.997959L31.470534 184.425262A108.146166 108.146166 0 0 1 184.425262 31.470534l326.997958 326.997959L838.421179 31.470534a108.146166 108.146166 0 0 1 152.954727 152.954728z" p-id="952" fill="#787878"></path></svg>
				</div>
				<div class="feedback-great-inner">
					<div  style="font-size: 21px;font-weight: 600;">谢谢！我们会再接再厉的！</div>
					<div>
						<!-- <svg  t="1574002065349" class="icon feedback-great-smile"  viewBox="0 0 1024 1024" version="1.1"  p-id="5069" width="200" height="200"><path d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m161.877333 394.517334c-60.416 168.192-279.445333 168.192-322.922666 2.688l-61.909334 16.256c59.989333 228.266667 364.032 228.266667 445.077334 2.688l-60.245334-21.632zM426.666667 362.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v64a42.666667 42.666667 0 1 0 85.333333 0v-64a42.666667 42.666667 0 0 0-42.666666-42.666666z m170.666666 0a42.666667 42.666667 0 0 0-42.666666 42.666666v64a42.666667 42.666667 0 1 0 85.333333 0v-64a42.666667 42.666667 0 0 0-42.666667-42.666666z" p-id="5070" fill="#1ebf73"></path></svg> -->
						<lottie :options="defaultOptionsFace" :height="105" :width="104"  />
						<div style="text-align:center; font-size: 21px;font-weight: 600; color: #1ebf73;">Thanks!</div>
					</div>
					<div>
						<p style="color: #7f7f7f;font-size:14px;text-align:center;">有更多想法？ 欢迎和我们站长进行商业互吹</p>
						<p style="color:#1ebf73;font-size:12px;text-align:center;">fujia@ztgame.com</p>
					</div>

				</div>
			</div>

			<div v-if="status=='form'" class="feedback-form">
				<div class="feedback-close" @click="handleClosePick">
					<svg t="1574001512032" class="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="951" width="200" height="200"><path d="M664.377948 511.42322l326.997958 326.997959a108.146166 108.146166 0 0 1-152.954727 152.954727l-326.997959-326.997958-326.997958 326.997958a108.146166 108.146166 0 0 1-152.954728-152.954727l326.997959-326.997959L31.470534 184.425262A108.146166 108.146166 0 0 1 184.425262 31.470534l326.997958 326.997959L838.421179 31.470534a108.146166 108.146166 0 0 1 152.954727 152.954728z" p-id="952" fill="#787878"></path></svg>
				</div>
				<div style="font-size: 21px;font-weight: 600;">
					请帮助我们做的更好吧
				</div>
				<div>
					<a-radio-group @change="onChange" v-model="value">
						<a-radio :style="radioStyle" :value="0">没有找到想要的内容？内容质量不高？</a-radio>
						<a-radio :style="radioStyle" :value="1">功能不好用？</a-radio>
						<a-radio :style="radioStyle" :value="2">卡Bug、页面不流畅</a-radio>
						<a-radio :style="radioStyle" :value="3">其他</a-radio>
					</a-radio-group>
					<div class="feedback-form-area-wrap" style="">
						<textarea ref="feedback-textarea" name="" id="" cols="30" rows="10"></textarea>
						<div>
								<a-upload
								action="/api/file/upload"
								:headers="{token:this.$store.state.token}"
									listType="picture-card"
									:fileList="fileList"
									:data="{target:'feedbackImage'}"
									@preview="handlePreview"
									@change="handleChange"
								>
									<div v-if="fileList.length < 4">
										<a-icon type="plus" />
										<div class="ant-upload-text">Upload</div>
									</div>
								</a-upload>
								<a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
									<img alt="example" style="width: 100%" :src="previewImage" />
								</a-modal>
						</div>
							<div style="clear:both;color: #cccccc;font-size:12px;">
								*单张图片不超过5M，最多可上传4张

						</div>
					</div>
				
				</div>

				<div class="feedback-form-btn" @click="handleSumbit">
					提交
				</div>
				
			</div>
			<div v-if="status=='submitted'" class="feedback-form-submitted">
				<div class="feedback-close" @click="handleClosePick">
					<svg t="1574001512032" class="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="951" width="200" height="200"><path d="M664.377948 511.42322l326.997958 326.997959a108.146166 108.146166 0 0 1-152.954727 152.954727l-326.997959-326.997958-326.997958 326.997958a108.146166 108.146166 0 0 1-152.954728-152.954727l326.997959-326.997959L31.470534 184.425262A108.146166 108.146166 0 0 1 184.425262 31.470534l326.997958 326.997959L838.421179 31.470534a108.146166 108.146166 0 0 1 152.954727 152.954728z" p-id="952" fill="#787878"></path></svg>
				</div>

				<div style="padding-top:55%;">
					<div>
						<lottie :options="defaultOptions" :height="72" :width="62"  />
					</div>
					<div style="font-size: 21px;font-weight: 600;text-align:center;">感谢您的反馈</div>
					<div style="font-size:14px;color:#7f7f7f;text-align:center;">
						<p>您的反馈已提交，我们会尽快处理。</p>
						<p>我们将通过 消息—站内信 的形式通知您反馈结果</p>
					</div>
				</div>
				<div style="color: #7f7f7f;font-size:14px;text-align:center;padding-top:54%;">
					<p>有更多想法？ 欢迎和霸道站长进行友好交流</p>
					<p style="color: #1ebf73;text-decoration:underline;text-align:center;">fujia@ztgame.com</p>
				</div>
			</div>
		
		</div>
	
</template>

<style lang="less">
.feedback{
	&-form{
		box-sizing: border-box;
		padding:40px 30px;
	
		&-area-wrap{
			border:1px solid #eaeaea;
			margin-top:10px;
			box-sizing: border-box;
			padding:5px;

		}
		textarea{
			border: none;
			outline: none;
			margin-top: 0px;
			margin-bottom: 0px;
			height: 156px;
			width: 100%;
			box-sizing: border-box;
			color: rgba(0, 0, 0, 0.5);
			padding:10px;
			resize:none;
		}
		&-btn{
			background: #1ebf73;
			display: flex;
			justify-content: center;
			align-items: center;
			width:100%;
			height:45px;
			font-size: 18px;
			color:white;
			cursor: pointer;

		}
	}
	
	/* you can make up upload button and sample style by using stylesheets */
		.ant-upload-select-picture-card i {
			font-size: 26px;
			color: #999;
			// color: red;
		}
		.ant-upload-text{
			font-size:10px;
		}
		.ant-upload-list-picture-card .ant-upload-list-item {
			float: left;
			width: 72px;
			height: 72px;
			margin: 0 8px 8px 0;   
	}
	.ant-upload.ant-upload-select-picture-card {
			display: table;
			width: 72px;
			height: 72px;
			margin-right: 8px;
			margin-bottom: 8px;
			text-align: center;
			vertical-align: top;
			background-color: #fafafa;
			border: 1px dashed #d9d9d9;
			border-radius: 4px;
			cursor: pointer;
			-webkit-transition: border-color 0.3s ease;
			transition: border-color 0.3s ease;
	}
		.ant-upload-select-picture-card .ant-upload-text {
			margin-top: 8px;
			color: #666;
		}
	
}
</style>
<style lang="less" scoped>

	
.feedback{
	position: absolute;
	right:0;
	bottom:0;
	margin-bottom: -82px;
	margin-right: -27px;
		
	>div{
		position: relative;
	}
	&-form{
		display: flex;
    flex-direction: column;
    justify-content: space-between;
	}
	&-close{
		width:15px;
		height:15px;
		position: absolute;
		top: 11px;
    right: 11px;
		cursor: pointer;
		svg{
			width:100%;
			height:100%;
		}
	}
	&-great-inner{
		display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
		justify-content: center;
		
	}
	&-great-inner>div{
		margin:4px 0;
	}
	.feedback-pick-smiles{
		display: flex;
	}
	.feedback-pick-smiles>div{
		margin:0 15px;
		width:116px;
		height:135px;
		border-radius: 25px;
		

		display: flex;
    flex-direction: column;
    justify-content: center;
		align-items: center;
		cursor: pointer;
		
	}
	.feedback-pick-smiles>div:hover{
		background-color: #f2f2f2;
	}
	.feedback-pick-smiles span{
		text-align: center;
		display:block;
		color: #7f7f7f;
		font-size:18px;
	}
	.feedback-pick-inner{
		display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
		justify-content: center;
		
	}
	
	.sty2{
		width:379px;
		height:620px;
		position: absolute;
		bottom:0;
		right:0;
		background:white;
		box-shadow: 1px 1px 6px rgba(0,0,0,.2);
		border-radius: 3px;
	}
	.sty1{
		width:381px;
		height:385px;
		position: absolute;
		bottom:0;
		right:0;
		background:white;
		box-shadow: 1px 1px 6px rgba(0,0,0,.2);
		border-radius: 3px;
	}
	&-pick-smiles{
		
	}
	&-pick-smiles svg{
		width:73px;
		height:73px;
	}
	&-pick{
		.sty1;
		

	}
	&-great{
		.sty1;
		
	}
	&-form{
		.sty2;
	}
	&-form-submitted{
		.sty2;
	}
	// feedback-great-smile
	&-great-smile{
		width:95px;
		height:95px;
	}

}
</style>
<script>

import axios from "axios"

import * as animationData from "../assets/misoon.json"
import * as animationDataFace from "../assets/smiling-face.json"

export default {
 	name: "Feedback",
	props:['showFeedback'],
	data(){
		return{
			status:'pick',
			c_svg:`<svg t="1574001512032" class="icon" viewBox="0 0 1024 1024" version="1.1"  p-id="951" width="200" height="200"><path d="M664.377948 511.42322l326.997958 326.997959a108.146166 108.146166 0 0 1-152.954727 152.954727l-326.997959-326.997958-326.997958 326.997958a108.146166 108.146166 0 0 1-152.954728-152.954727l326.997959-326.997959L31.470534 184.425262A108.146166 108.146166 0 0 1 184.425262 31.470534l326.997958 326.997959L838.421179 31.470534a108.146166 108.146166 0 0 1 152.954727 152.954728z" p-id="952" fill="#787878"></path></svg>`,
			value: 0,
			radioStyle: {
				display: 'block',
				height: '30px',
				lineHeight: '30px',
			},
			previewVisible: false,
			previewImage: '',
			radioValue:0,
			fileList: [

			],
			defaultOptions: { animationData: animationData },
			defaultOptionsFace:{animationData: animationDataFace },
			animationSpeed: 1,
			anim: {}
		}
	},
	mounted(){

	},
	methods:{
		handleSumbit(){


			// this.status = 'submitted'
		
			var titles = [
				'没有找到想要的内容？内容质量不高？',
				'功能不好用？',
				'卡Bug、页面不流畅',
				'其他'
			]

			// console.log(titles[this.radioValue])
			// return

			var images = this.fileList.map(o=>o.response.data.fileId)

			axios.post(`/api/feedback`,{
				type:'system',
				title:titles[this.radioValue],
				content:this.$refs['feedback-textarea'].value,
				images
			}	).then(response=>{
				var res = response.data
				if(res.code!=0)  return this.$message.warning(res.msg)
				
				//this.$message.success('发布成功')
				this.status = 'submitted'
			})
		},
		onChange(e){
			this.radioValue = e.target.value
			console.log('radio:', this.radioValue)
		},
		handleCancel() {
			this.previewVisible = false;
		},
		handlePreview(file) {
			this.previewImage = file.url || file.thumbUrl
			this.previewVisible = true
		},
		handleChange({ fileList }) {
			this.fileList = fileList

			//console.log(this.fileList,'fileList')
		},
		handleGreat(){
			this.status = 'great'
		},
		handleFrom(){
			this.status = 'form'
		},
		handleClosePick(){
			this.$emit("hideDialog")
		},
		handleClick(){

		},
		cancel(){
			this.$emit("hideDialog")
			//this.showFeedback = false
		}

	}
	
	
}

</script>