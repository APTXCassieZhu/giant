<template>
    <!---->
    <div class="source-box">
        <div class="font-image">LOGO</div>
        <div class="font-title">
            <p style="font-size:16px;font-weight:600">{{softwareName}}</p>
            <p style="position:relative;top:8px;font-size:14px;font-weight:600;color:#7f7f7f;">当前版本 {{currentVersion}}</p>
            <p style="position:relative; top: 25px;font-size:14px;color:#7f7f7f;">最后更新 {{latestUpdate}}</p>
        </div>
        <Button v-if="this.curbtn==='btn1'" class='btn1' @mouseover.native="mouseover" ><Icon type="md-checkmark" size="22"/> 已获得</Button>
        <Button v-if="this.curbtn==='btn2'" class="btn2" @click="modal = true"><font-awesome-icon icon="handshake"/> 申领使用权</Button>
        <Button v-if="this.curbtn==='btn3'" disable class="btn3">Pending</Button>
        <Button v-if="this.curbtn==='btn4'" @click="tip" @mouseout.native="mouseout" class="btn1" style="background-color: #1ebf73;color:white;">找回软件</Button>
        
        <div v-show="modal" class="modal-mask">
            <div class="modal">
                <font-awesome-icon class="modal-close" :icon="['fas','times']" @click="modal = false"/>
                <span v-if="current==0" class="modal-title">请输入您的账号</span>
                <span v-if="current==1" class="modal-title">请填写您的申请理由</span>
                <span v-if="current==2" class="modal-title">确认提交吗？</span>
                <p v-if="current<3" class="modal-step"><Steps :current="current">
                <Step title="确认账号"></Step>
                <Step title="申请理由"></Step>
                <Step title="提交"></Step>
                </Steps></p>
                <div v-if="current==0" class="modal-account-verify">
                    <div class="modal-account">当前登录域账号</div>
                    <Input v-model="account" readonly class="modal-account-input"/>
                    <div class="modal-account">请输入域账号密码</div>
                    <Input v-model="pwd" class="modal-account-input1" type="password" password @on-change="fillPWD()"/>
                    <div class="modal-btn-wrapper">
                        <Button class="modal-prev-btn" @click="prevStep">返回</Button>
                        <Button :class="verifyBtn" @click="verifyAccount()" :disabled="disableOrNot">确认，下一步</Button>
                    </div>
                </div>
                
                 <div v-if="current==1" class="modal-account-verify">
                    <Input v-model="reason" maxlength="100" show-word-limit type="textarea" placeholder="请描述需求以便快速审核"/>
                    <div class="modal-btn-wrapper">
                        <Button class="modal-prev-btn" @click="prevStep">上一步</Button>
                        <Button class="modal-next-btn" @click="nextStep">确认，下一步</Button>
                    </div>
                </div>
                <div v-if="current==2" class="modal-account-verify">
                    <div class="modal-last-step-title">申请人ID</div>
                    <div class="modal-last-step-content">{{account}}</div>
                    <div class="modal-last-step-title">申请理由</div>
                    <div class="modal-last-step-content">{{reason}}</div>
                    <div class="modal-btn-wrapper">
                        <Button class="modal-prev-btn" @click="prevStep">上一步</Button>
                        <Button class="modal-next-btn" @click="submitApplication()">提交</Button>
                    </div>
                </div>
                <div v-if="current==3" class="modal-account-verify" style="top:0;height:405px;">
                    <font-awesome-icon :icon="['far','handshake']" class="modal-finish-icon"/>
                    <span class="modal-finish-title">已受理</span>
                    <div class="modal-finish-content">
                        你的申领已经受理，我们会尽快处理。请牢记下方的回执编号，处理结果请注意通知信息，谢谢！
                    </div>
                    <div class="modal-finish-codearea">
                        <span class="modal-finish-codetext">回执编号：</span>
                        <span class="modal-finish-code">{{num}}</span>
                    </div>
                    <Button class="modal-next-btn" @click="nextStep" style="position:absolute;bottom:0px;left:80px;">确认</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHandshake } from '@fortawesome/free-solid-svg-icons'
library.add(faHandshake)
export default {
    name: "SepcialDownload",
    props:{
        btn:{
            type: String,
            default: 'btn2',
        },
        id:{
            type: Number,
        }
    },
    data() {
        return {
            curbtn: this.btn,
            account: 'xiamuZhu@ztgame.com',
            softwareName: "XXX客户端",
            currentVersion: "3.0.1",
            latestUpdate: "2019.02.29",
            modal: false,      
            current: 0,                 //当前处于步骤几
            num: 0,                    // 回执编号
            pwd:'',
            reason: '',

            disableOrNot: true,
            verifyBtn: 'modal-next-btn-disable'
        }
    },
    methods:{
        prevStep(){
            if (this.current == 0) {
                this.modal = false;
            } else {
                this.current -= 1;
            }
        },
        nextStep(){
            if (this.current == 3) {
                this.modal = false;
                this.curbtn ='btn3';
                this.current = 0;
            } else {
                this.current += 1;
            }
        },
        fillPWD(){
            if(this.pwd != ''){
                this.verifyBtn = 'modal-next-btn'
                this.disableOrNot = false
            }else{
                this.verifyBtn = 'modal-next-btn-disable'
                this.disableOrNot = true
            }
        },
        verifyAccount(){
            axios.post(`/api/software/${this.id}/verify`,{account:this.account, pwd:this.pwd},{emulateJSON:true}).then((res)=>{
                // 登录成功
                if(res.data.code == 0){
                    this.$store.commit('ADD_COUNT', res.headers.Authorization);
                    this.$options.methods.nextStep.bind(this)()
                }
                else if(res.data.code == 40101){
                    this.$Modal.error({
                        title: '抱歉，账号或密码错误，请确认之后重试',
                    });
                }else if(res.data.code == 40103){
                    this.$Modal.error({
                        title: '抱歉，连接域账号服务器失败，请稍后再试',
                    });
                }
            }, (res)=>{
                // 登录失败
                alert(res)
            })
        },
        submitApplication(){
            axios.post(`/api/software/${this.id}/apply`,{reason:this.reason},{emulateJSON:true}).then((res)=>{
                // 登录成功
                if(res.data.code == 0){
                    this.$store.commit('ADD_COUNT', res.headers.Authorization);
                    this.$options.methods.nextStep.bind(this)()
                    this.num = res.data.data.num
                }
            }, (res)=>{
                // 登录失败
                alert(res)
            })
        },
        tip(){
            const content = '<p>请拨打 8000 致IT服务台,</p><p>提供域账号再次申领该软件</p>'
            this.$Modal.info({
                title: '提示',
                content: content
            });
        },
        mouseover(){
            this.curbtn='btn4'
        },
        mouseout(){
            this.curbtn='btn1'
        }
    }
}
</script>
<style>
.modal-step > .ivu-steps > .ivu-steps-item > .ivu-steps-main > .ivu-steps-title{
    font-size: 18px;
    font-weight: 600;
    margin-top: 4px;
}
.modal-step > .ivu-steps > .ivu-steps-item > .ivu-steps-tail{
    top: 15.5px;
}
.modal-step > .ivu-steps > .ivu-steps-item > .ivu-steps-head > .ivu-steps-head-inner{
    border-width: 2px;
    width: 38px;
    height: 38px;
    line-height: 36px;
}
.modal-step > .ivu-steps > .ivu-steps-item > .ivu-steps-head > .ivu-steps-head-inner > span{
    font-size: 20px;
    font-weight: bold;
}
.modal-account-input > .ivu-input{
    height: 37px;
    background-color: #f2f2f2;
}
.modal-account-input1 > .ivu-input{
    height: 37px;
}
.modal-account-input > .ivu-input-suffix {
    width: 37px;
    height: 37px;
    line-height: 37px;
}
.modal-account-input1 > .ivu-input-suffix {
    width: 37px;
    height: 37px;
    line-height: 37px;
}
.modal-account-verify > .ivu-input-wrapper > textarea{
    height: 135px;
}
</style>
<style scoped>
.source-box{
    float: left;
    height: 150px; 
    width: 252px;
    margin-right: 60px;
    margin-bottom: 60px;
}

.font-image{
    color: #1ebf73;
    background-color: #e8f8f0;
    height: 88px;
    width: 88px;
    border-radius: 3px;
    line-height: 88px;
    text-align: center;
}
.font-title{
    display: inline-block;
    position: relative;
    top: -85px;
    left: 100px;
    margin-bottom: 30px;
    line-height: 21px;
}
.btn1{
    position:relative;
    top: -70px;
    left: -2px;
    width: 252px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    font-weight:600;
    font-size:16px;
    border: solid 1px #1ebf73;
    background-color: #ffffff;
    color: #1ebf73;
}
.btn2{
    position:relative;
    top: -70px;
    left: -2px;
    width: 252px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    color: white;
    background-color: #3199ff;
    font-weight:600;
    font-size:16px;
}
.btn2:hover{
    border-color: #6cb4fc;
    background-color: #6cb4fc;
}
.btn3{
    position:relative;
    top: -70px;
    left: -2px;
    width: 252px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    color: #1ebf73;
    background-color: #9bf1c6;
    border-width: 0px;
    font-weight:600;
    font-size:16px;
    cursor:auto;
}
.modal-mask{
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55, 55, 55, 0.6);
    height: 100%;
    z-index: 1000;
}
.modal{
    width: 814px;
    height: 550px;
    z-index: 100;
    background-color: white;
    padding: 65px 104px 80px 104px;
    opacity: 1;
	animation-name: fadeInOpacity;
	animation-iteration-count: 1;
	animation-timing-function: ease-in-out;
    animation-duration: .2s;
}
@keyframes fadeInOpacity {
	0% {
        opacity: 0;
        transform: scale(0.1);
	}
	100% {
        opacity: 1;
        transform: scale(1);
	}
}
.modal-close{
    z-index: 1001;
    font-size: 20px;
    position: fixed;
    right: 565px;
    top: 215px;
    overflow: hidden;
    cursor: pointer;
    color: #787878;
}  
.modal-close:hover{
    color: red;
}
.modal-title{
    position: relative;
    margin-bottom: 30px;
    font-size:18px;
    color:#000000;
}
.modal-step{
    position: relative;
    top: 30px;
    bottom: 60px;
}

.modal-account-verify{
    position: relative;
    top: 80px;
    width: 464px;
    height: 260px;
    text-align: center;
    left:60px;
}
.modal-account{
    position: relative;
    text-align: left;
    font-size: 16px;
    color: #000000;
    margin-bottom: 10px;
}
.modal-account-input, .modal-account-input1{
    position: relative;
    width: 464px;
    text-align: center;
    margin-bottom: 30px;
}
.modal-btn-wrapper{
    position: absolute;
    width: 464px;
    bottom: 0px;
}
.modal-prev-btn{
    width: 148px;
    height: 45px;
    background-color: #f2f2f2;
    font-size: 18px;
    font-weight: bold;
    color: #787878;
    margin-right: 25px;
    border-width: 0px;
}

.modal-next-btn{
    width: 285px;
    height: 45px;
    border: solid 1px #1ebf73;
    background-color: #1ebf73;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
}
.modal-next-btn-disable, .modal-next-btn-disable:hover{
    width: 285px;
    height: 45px;
    background-color: #d8d8d8;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
}
.modal-last-step-title{
    font-size: 18px;
    font-weight: 600;
    color: #1ebf73;
    text-align: left;
    margin-bottom: 10px;
}
.modal-last-step-content{
    font-size: 14px;
    color: #7f7f7f;
    text-align: left;
    margin-bottom: 30px;
}
.modal-finish-icon{
    width: 58px;
    height: 58px;
    font-size: 50px;
    color: #1ebf73;
    border-radius: 50%;
}
.modal-finish-title{
    font-size: 24px;
    font-weight: 600;
    color: #1ebf73;
    position: relative;
    bottom: 15px;
    left: 10px;
}
.modal-finish-content{
    font-size: 18px;
    font-weight: 600;
    color: #7f7f7f;
    text-align: left;
    margin-bottom: 50px;
    margin-top: 30px;
}
.modal-finish-codearea{
    width: 453px;
    height: 80px;
    border-radius: 3px;
    background-color: #f2f2f2;
}
.modal-finish-codetext{
    font-size: 18px;
    font-weight: bold;
    color: #787878;
    line-height: 80px;
    text-align: center;
}
.modal-finish-code{
    font-size: 24px;
    font-weight: bold;
    color: #1ebf73;
    line-height: 80px;
    text-align: center;
}
</style>