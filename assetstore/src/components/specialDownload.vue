<template>
    <!---->
    <div class="source-box">
        <div class="font-image">LOGO</div>
        <div class="font-title">
            <p style="font-size:16px;font-weight:600">{{softwareName}}</p>
            <p style="position:relative;top:8px;font-size:14px;font-weight:600;color:#7f7f7f;">当前版本 {{currentVersion}}</p>
            <p style="position:relative; top: 25px;font-size:14px;color:#7f7f7f;">最后更新 {{latestUpdate}}</p>
        </div>
        <Button v-if="this.class==='btn1'" class='btn1' type="success"><Icon type="md-checkmark" size="22"/> 已获得</Button>
        <Button v-if="this.class==='btn2'" class="btn2" @click="modal = true"><font-awesome-icon icon="handshake"/> 申领使用权</Button>
        <Button v-if="this.class==='btn3'" disable class="btn3">Pending</Button>
        
        <div v-show="modal" class="modal-mask">
            <div class="modal">
                <Icon size="30" type="md-close" class="modal-close" @click="modal = false"/> 
                <span class="modal-title">请输入您的账号</span>
                <p class="modal-step"><Steps :current="current">
                <Step title="确认账号"></Step>
                <Step title="申请理由"></Step>
                <Step title="提交"></Step>
                </Steps></p>
                <div v-if="current==0" class="modal-account-verify">
                    <p class="modal-account">当前登录域账号</p>
                    <Input disable class="modal-account-input"/>
                    <p class="modal-account">请输入域账号密码</p>
                    <Input class="modal-account-input" type="password" password/>
                </div>
                <div class="modal-btn-wrapper">

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
    data() {
        return {
            softwareName: "XXX客户端",
            currentVersion: "3.0.1",
            latestUpdate: "2019.02.29",
            modal: false,
            class: 'btn2',
            current: 0,                 //当前处于步骤几
        }
    },
    methods:{
        next(){
            if (this.current == 3) {
                this.current = 0;
            } else {
                this.current += 1;
            }
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
}

.modal-account-input > .ivu-input-suffix {
    width: 37px;
    height: 37px;
    line-height: 37px;
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
    background-color: #f62b36;
    font-weight:600;
    font-size:16px;
}
.btn2:hover{
    border-color: #fc8b91;
    background-color: #fc8b91;
}
.btn3{
    position:relative;
    top: -70px;
    left: -2px;
    width: 252px;
    height: 37px;
    line-height: 37px;
    text-align: center;
    color: white;
    background-color: #37d89d;
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
    font-size: 12px;
    position: fixed;
    right: 560px;
    top: 220px;
    overflow: hidden;
    cursor: pointer;
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
    top: 100px;
    width: 464px;
    text-align: center;
}
.modal-account{
    position: relative;
    text-align: left;
    font-size: 16px;
    color: #000000;
}
.modal-account-input{
    position: relative;
    width: 464px;
    text-align: center;
}
.modal-btn-wrapper{

}
</style>