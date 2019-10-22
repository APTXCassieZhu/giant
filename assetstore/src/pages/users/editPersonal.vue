<template>
    <div>
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <Menu active-name="1" class="leftside-menu">
            <!--TODO 未完成，仅有样式-->
            <MenuItem name="1">
                <Icon size="18" type="ios-apps" />个性化设置
            </MenuItem>
            <MenuItem name="2">
                <Icon size="18" type="md-notifications" />消息通知设置
            </MenuItem>
        </Menu>
        <div class="setting-card">
            <div class="camera"><Icon size="28" type="md-camera" /></div>
            <!--TODO 没找到和设计稿一样的upload icon-->
            <Button class="camera-btn"><Icon size="20" type="md-cloud-upload" /> 上传</Button>
            <div class="notice-content">
                <p>* 支持上传 JPG\PNG 格式的图像文件</p>
                <p>图片大小不能超过 1MB</p>
                <p>最小图片尺寸不能低于 100像素 X 100像素</p>
            </div>
            <div class="personal-input">绑定的域账号
                <span style="margin-left: 120px;" class="span">
                    <Input v-model="account" disable icon="md-lock" placeholder="xiamuZhu@ztgame.com" 
                    style="width: 430px; height: 44px;" />
                </span>
            </div>
            <div class="personal-input">显示名
                <span style="margin-left: 166px;" class="span">
                    <Input v-model="nickname" placeholder="工作环境，显示名称请谨慎对待" 
                    style="width: 430px; height: 44px;" />
                </span>
            </div>
            <div class="personal-input">
                <span style="position:relative; top: -86px;">签名栏</span>
                <span style="margin-left: 166px;" class="span">
                    <Input v-model="nickname" placeholder="团队简介以及个人签名" 
                    style="width: 430px; height: 198px;" />
                </span>
            </div>
            <Button class="confirm-btn">确认</Button>
        </div>
        <corner></corner>
        <Footer style="position:relative; bottom: 0px; margin-top:200px"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import Footer from '../../components/footer.vue'
import Corner from '../../components/corner.vue'

export default {
    name:"EditPersonal",
    components:{TopNavigation, Footer, Corner, },
    computed:{
        getUser(){
            return this.$store.state.token;
        },
    },
    mounted() {
        this.personalActive = this.$store.state.personalActive       
    },
    data () {
        return {
            account: 'xiamuZhu@ztgame.com',
            nickname: '',
        }
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
    },
}
</script>

<style>
.leftside-menu{
    position: fixed;
    display:inline-block;
    font-family: MicrosoftYaHei;
    width: 360px;
    height: 160px;
    left: 50px;
    top: 170px;
    padding: 30px 20px 30px 30px;
    border: 1px solid lightgrey;
    /*box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2);*/
    background-color: #ffffff;
}
.setting-card{
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    width: 1360px;
    height: 900px;
    left: 350px;
    top: 30px;
    padding: 30px 28px 30px 28px;
    border: 1px solid lightgrey;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2);
    background-color: #ffffff;
    overflow: auto;
}
.camera{
    display: inline-block;
    color: #7d7d7d;
    background-color: #e5e5e5;
    height: 116px;
    width: 116px;
    border-radius: 50%;
    text-align: center;
    line-height: 116px;
}
.camera:hover, .camera-btn:hover{
    cursor: pointer;
    color: #1ebf73;
    background-color: #e8f8f0;
}
.camera-btn{
    display: inline-block;
    color: #7d7d7d;
    background-color: #e5e5e5;
    height: 44px;
    width: 430px;
    font-size: 16px;
    margin-left: 100px;
    margin-top: -70px;
}
.notice-content{
    font-size: 14px;
    color: #7d7d7d;
    margin-left: 220px;
    margin-top: -60px;
}
.personal-input{
    margin-top: 70px;
    font-size: 16px;
    color: #000000;
}
.setting-card > .personal-input > .span > .ivu-input-wrapper > .ivu-input-icon{
    /* 使锁居中 */
    line-height: 44px;
}
.setting-card > .personal-input > .span > .ivu-input-wrapper > .ivu-input{
    height: 100%;
}
.confirm-btn{
    width: 430px;
    height: 44px;
    color: #7d7d7d;
    background-color: #e5e5e5;
    font-weight: bold;
    font-size: 18px;
    margin-left: 218px;
    margin-top: 70px;
}
.confirm-btn:hover{
    cursor: pointer;
    background-color: #1ebf73;
    color: white;
}
</style>

