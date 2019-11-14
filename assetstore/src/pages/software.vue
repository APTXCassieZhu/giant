<template>
    <div style="background-color: #eff2f5" >
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>  
        <div class="bread-container"> 
            <br>     
            <Breadcrumb>
                <BreadcrumbItem to="/home">首页</BreadcrumbItem>
                <BreadcrumbItem to="/home/software">软件</BreadcrumbItem>
                <BreadcrumbItem>当前内容</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Alert v-show="showPage == 'special'" class="alert" type="warning" closable show-icon>你正在访问的栏目内容可能需要你完成申领后方可正常使用</Alert>

        <div class="middle-card-wrapper">
            <div class="sidemenu-card">
                <Menu active-name="1" style="width: 281px">
                    <MenuItem name="1" @click.native="showPage = 'general'">
                        <Icon size="18" type="ios-apps" />通用软件
                    </MenuItem>
                    <MenuItem name="2" @click.native="showPage = 'special'">
                        <Icon size="18" type="md-key" />专用软件
                    </MenuItem>
                    <MenuItem name="3" @click.native="showPage = 'free'">
                        <Icon size="18" type="md-list-box" />常用免费软件
                    </MenuItem>
                    <MenuItem name="4" @click.native="showPage = 'schedule'">
                        <Icon size="18" type="md-calendar" />预装软件
                    </MenuItem>
                    <MenuItem name="5" @click.native="showPage = 'drive'">
                        <Icon size="18" type="md-car" />驱动软件
                    </MenuItem>
                </Menu>
                <Button @click="showFeedback()" class="sidemenu-btn"><font-awesome-icon :icon="['fas','edit']"/> 找不到想要的？</Button>
                <div v-if="curShowFeedback" class="software-feedback">
                    <div class="fb-close" @click="curShowFeedback=false; fbSuccess=false"><font-awesome-icon :icon="['fas','times']"/></div>
                    <div v-if="!fbSuccess">
                        <div style="font-size: 18px;font-weight: 600;color: black;text-align:left;">告诉我们您需要的软件吧</div>
                        <Form ref="softwareFBForm" :model="softwareFBForm" :rules="softwareFBRule">
                            <FormItem prop="softwareWant">
                                <Input class="fb-title" type="textarea" maxlength="30" v-model="softwareFBForm.softwareWant" @on-change="needMoreSoftware()"
                                show-word-limit placeholder="如 ADOBE CS SUITE 9.0.123" />
                            </FormItem>
                            <FormItem prop="softwareDetail">
                                <Input class="fb-des" type="textarea" v-model="softwareFBForm.softwareDetail" maxlength="150" show-word-limit placeholder="提供下载网址可以帮助我们更快的收集您的需求"/>
                            </FormItem>
                            <FormItem>
                                <Button :class="fbbtn" :disabled="disableOrNot" type="success" @click="softwareFeedback()">提交</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div v-else style="text-align:center;padding:118px 16px">
                        <!-- <font-awesome-icon :icon="['fas','check-circle']" class="fb-success-icon"/> -->
                        <lottie :options="defaultOptions" :height="60" :width="60" v-on:animCreated="handleAnimation" />
                        <div style="font-size:18px;font-weight:600;color:black;margin-bottom:20px;margin-top:10px;">感谢您的反馈</div>
                        <p style="font-size:12px;color:#7f7f7f;text-align:left;">需求已提交，我们会尽快处理。</p>
                        <p style="font-size:12px;color:#7f7f7f;text-align:left;">我们将通过<span style="font-weight:bold"> 消息—站内信 </span>的形式通知您反馈结果</p>
                    </div>
                </div>
            </div>
            <div v-show="showPage == 'general'" class="software-page">
                <span class="card-title">通用软件（{{generalNum}}款已收录）</span>
                <Divider/>
                <div v-for="n in 10" :key="n">
                    <software-download></software-download>
                </div>
                <Button v-show="!ifMoreGeneral" id="more" class="more" @click="addMore('general')">加载更多</Button>
                <div v-if="ifMoreGeneral">
                    <software-download v-for="n in 13" :key="n"></software-download>
                </div>
            </div>
            <div v-show="showPage == 'special'" class="software-page">
                <span class="card-title">专用软件（{{specialNum}}款已收录）</span>
                <Divider/>
                <special-download :btn='btnList[0]'></special-download>
                <special-download :btn='btnList[1]'></special-download>
                <special-download :btn='btnList[2]'></special-download>
                <div v-for="n in 3" :key="n">
                    <special-download></special-download>
                </div>
                <Button v-show="!ifMoreSpecial" id="more" class="more" @click="addMore('special')">加载更多</Button>
                <div v-if="ifMoreSpecial">
                    <special-download v-for="n in 13" :key="n"></special-download>
                </div>
            </div>
            <div v-show="showPage == 'free'" class="software-page">
                <span class="card-title">常用免费软件（{{freeNum}}款已收录）</span>
                <Divider/>
                <div v-for="n in 6" :key="n">
                    <software-download></software-download>
                </div>
                <Button v-show="!ifMoreFree" id="more" class="more" @click="addMore('free')">加载更多</Button>
                <div v-if="ifMoreFree">
                    <software-download v-for="n in 13" :key="n"></software-download>
                </div>
            </div>
            <div v-show="showPage == 'schedule'" class="software-page">
                <span class="card-title">预装软件（{{scheduleNum}}款已收录）</span>
                <Divider/>
                <div v-for="n in 6" :key="n">
                    <software-download></software-download>
                </div>
                <Button v-show="!ifMoreSchedule" id="more" class="more" @click="addMore('schedule')">加载更多</Button>
                <div v-if="ifMoreSchedule">
                    <software-download v-for="n in 13" :key="n"></software-download>
                </div>
            </div>
            <div v-show="showPage == 'drive'" class="software-page">
                <span class="card-title">驱动软件（{{driveNum}}款已收录）</span>
                <Divider/>
                <div v-for="n in 6" :key="n">
                    <software-download></software-download>
                </div>
                <Button v-show="!ifMoreDrive" id="more" class="more" @click="addMore('drive')">加载更多</Button>
                <div v-if="ifMoreDrive">
                    <software-download v-for="n in 13" :key="n"></software-download>
                </div>
            </div>
        </div>
        <corner></corner>
        <Footer style="position:relative; bottom: 0px; margin-top:200px"></Footer>
    </div>
</template>
    
<script>
import TopNavigation from '../components/TopNav.vue'
import Footer from '../components/footer.vue'
import Corner from '../components/corner.vue'
import SoftwareDownload from '../components/softwareDownload.vue'
import SpecialDownload from '../components/specialDownload.vue'
import specialDownloadVue from '../components/specialDownload.vue'
import * as animationData from "../assets/misoon.json";
export default {
    name:"software",
    components:{TopNavigation, Footer, Corner, SoftwareDownload, SpecialDownload},
    data(){
        return{
            generalNum: 20,
            specialNum: 25,
            freeNum: 18,
            scheduleNum: 10,
            driveNum: 8,
            showPage: 'general',
            softwareList: ['微博','微信','知乎','豆瓣','人人', 'QQ', '网易云'],
            btnList:['btn1','btn2','btn3'],
            ifMoreGeneral: false,
            ifMoreSpecial: false,
            ifMoreFree: false,
            ifMoreSchedule: false,
            ifMoreDrive: false,

            curShowFeedback: false,
            disableOrNot: true,
            fbSuccess: false,
            fbbtn: 'fb-btn-disable',
            softwareFBForm:{
                softwareWant: '',
                softwareDetail: '',
            },
            softwareFBRule:{
                softwareWant: [{required: true, message:'*请填写您需要的软件', trigger:'blur'}],
                softwareDetail:[{required: false, trigger:'blur'},
                            {type:'string', max: 150, message:'字太多啦', trigger:'blur'}]
            },

            defaultOptions: { animationData: animationData },
            animationSpeed: 1,
            anim: {}
        }
    },
    mounted(){
        // this.$refs.sp1.class='btn1'
        // this.$refs.sp2.class='btn2'
        // this.$refs.sp3.class='btn3'
    },
    methods:{
        handleAnimation: function(anim) {
            this.anim = anim;
            console.log(anim); //这里可以看到 lottie 对象的全部属性
        },
        addMore(more){
            switch(more){
                case 'general':
                    this.ifMoreGeneral = true
                    break;
                case 'special':
                    this.ifMoreSpecial = true
                    break;
                case 'free':
                    this.ifMoreFree = true
                    break;
                case 'schedule':
                    this.ifMoreSchedule = true
                    break;
                case 'drive':
                    this.ifMoreDrive = true
            }
        },
        showFeedback(){
            this.curShowFeedback = true
        },
        needMoreSoftware(){
            if(this.softwareFBForm.softwareWant == ''){
                this.fbbtn = 'fb-btn-disable'
                this.disableOrNot = true
            }else{
                this.fbbtn = 'fb-btn'
                this.disableOrNot = false
            }
        },
        softwareFeedback(){
            axios.post('/api/feedback',{title:this.softwareFBForm.softwareWant, details:this.softwareFBForm.softwareDetail},
            {emulateJSON:true}).then((res)=>{
                if(res.data.code == 0){
                    this.$store.commit('ADD_COUNT', res.headers.Authorization);
                    this.fbSuccess = true
                }
                else if(res.data.code == 222){
                    this.$notification.config({
                        placement: 'bottomLeft',
                    });
                    this.$notification['error']({
                        message: '上传失败',
                    });
                }else if(res.data.code == 233){
                    this.$notification.config({
                        placement: 'bottomLeft',
                    });
                    this.$notification['error']({
                        message: '请求服务器失败',
                    });
                }
            }, (res)=>{
                // 登录失败
                alert(res)
            })
        }
    },
}
</script>
<style>
.sidemenu-card > .ivu-menu >.ivu-menu-item{
    width: 281px;
    padding: 14px 40px;
}
.fb-des > textarea{
    resize: none;
    height: 208px;
}
.fb-title > textarea{
    resize: none;
    height: 49px;
}
.software-feedback > .ivu-form > .ivu-form-item{
    border-width: 0px;
}
</style>
<style scoped>
.bread-container {
    position: relative;
    left: 4%;
}
.alert{
    position: relative;
    top: 15px;
    left: 4%;
    width: 90%;
    font-size: 16px;
}
.middle-card-wrapper{
    width:100%;
    height: auto;
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    justify-content:center;
}
.sidemenu-card{
    position: sticky; 
    width: 281px;
    height: 800px;
    top: 210px;
    margin-top: 28px;
    margin-right: 30px;
    border-radius: 3px;
}
.sidemenu-btn{
    width: 281px;
    height: 49px;
    font-size: 16px;
    color: #515A6E;
    border-width: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.sidemenu-btn:hover{
    color: #1ebf73;
    background-color: #f0fff5;
}
.software-feedback{
    position: relative;
    animation-name: drive; 
    animation-duration:0.5s;
    width: 281px;
    height: 466px;
    border-radius: 3px;
    box-shadow: 0 1px 6px 5px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
    text-align: center;
    padding: 40px 30px;
}
.fb-close{
    position: absolute;
    top: 15px;
    right: 15px;
    width: 13px;
    height: 16px;
    font-size: 16px;
    color: #787878;
    cursor: pointer;
}
.fb-close:hover{
    color: red;
}
.fb-title{
    width: 222px;
    height: 49px;
    border-radius: 3px;
    border: solid 1px #eaeaea;
    text-align: left;
    margin-top: 20px;
}
.fb-des{
    width: 222px;
    height: 208px;
    border-radius: 3px;
    border: solid 1px #eaeaea;
    /* margin-top: 20px; */
}
.fb-btn-disable, .fb-btn-disable:hover{
    width: 221px;
    height: 37px;
    border-radius: 3px;
    background-color: #d8d8d8;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    margin-top: 10px;
}
.fb-btn{
    width: 221px;
    height: 37px;
    border-radius: 3px;
    border: solid 1px #1ebf73;
    background-color: #1ebf73;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    margin-top: 10px;
}
@keyframes drive { 
    from { 
        transform: translateY(-210px); 
    } 
    to { 
        transform: translateY(0); 
    } 
}
.fb-success-icon{
    width: 42px;
    height: 48px;
    font-size: 48px;
    color: #1ebf73;
    margin-bottom: 20px;
}
.software-page{
    position: relative;
    /* left: 130px; */
    top: 28px;
    width: 1280px;
    min-height: 660px;
    border-radius: 3px;
    padding: 0px 0px 30px 30px;
    background-color: white;
    overflow-y: auto;
}
.card-title{
    font-size:16px;
    position:relative;
    height:50px;
    top: 14px;
}
.more{
    text-align: center;
    width: 193px;
    height: 44px;
    /* background-color: #e8f8f0; */
    color: #1ebf73;
    /* border: solid 1px #1ebf73; */
    font-size: 18px;
    font-weight: 600;
}
/* .more:hover{
    color: white;
    background-color: #1ebf73;
} */
</style>

