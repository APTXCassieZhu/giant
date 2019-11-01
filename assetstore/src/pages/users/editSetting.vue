<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="middle-card-wrapper">
            <Menu active-name="1" class="leftside-menu">
                <MenuItem name="1" @click.native="showPerson">
                    <Icon size="18" type="md-person" />个性化设置
                </MenuItem>
                <MenuItem name="2" @click.native="showInfo">
                    <Icon size="18" type="md-notifications" />消息通知设置
                </MenuItem>
            </Menu>
            <div v-if="this.showPersonal" class="setting-card">
                <Upload 
                    name='avatar'
                    :format="['jpg','png']" 
                    :max-size="1024" 
                    :before-upload="handleBeforeUpload"
                    :on-format-error="handleFormatError" 
                    :on-exceeded-size="handleMaxSize"
                    :on-progress="handleUploading"
                    :on-success="handleSuccess" 
                    :show-upload-list="false"
                    action="/upload/avatar"
                >
                    <img class="camera" v-if="finished" :src="imageUrl" alt="avatar" />
                    <div v-else class="camera">
                        <Icon v-if="loading" size="28" type='ios-loading' class="demo-spin-icon-load"/>
                        <Icon v-if="!loading" size="28" type='md-camera'/>
                    </div>
                </Upload>
                <Upload 
                    name='avatar'
                    :format="['jpg','png']" 
                    :max-size="1024" 
                    :before-upload="handleBeforeUpload"
                    :on-format-error="handleFormatError" 
                    :on-exceeded-size="handleMaxSize"
                    :on-progress="handleUploading"
                    :on-success="handleSuccess" 
                    :show-upload-list="false"
                    action="/upload/avatar"
                >
                    <Button class="camera-btn" type="success"><font-awesome-icon :icon="['fas','upload']"/> 上传</Button>
                </Upload>
                <div class="notice-content">
                    <p>* 支持上传 JPG\PNG 格式的图像文件</p>
                    <p>图片大小不能超过 1MB</p>
                    <p>最小图片尺寸不能低于 100像素 X 100像素</p>
                </div>
                <div class="personal-input">绑定的域账号
                    <span style="margin-left: 120px;" class="span1">
                        <Input v-model="account" readonly icon="md-lock"
                        style="width: 430px; height: 44px;" />
                    </span>
                </div>
                <Form ref="personalForm" :model="personalForm" :rules="inputRule">
                    <FormItem prop="nickname" class="personal-input">显示名
                        <span style="margin-left: 172px;" class="span">
                            <Input v-model="personalForm.nickname" placeholder="工作环境，显示名称请谨慎对待" maxlength="10"
                            @onkeyup.native="onlyWord()" @onbeforepaste.native="onlyWord1()"
                            style="width: 430px; height: 44px;" />
                        </span>
                    </FormItem>
                    <FormItem prop="sign" class="personal-input">
                        <span style="position:relative; top: -86px;">签名栏</span>
                        <span style="margin-left: 172px;" class="span">
                            <Input type="textarea" v-model="personalForm.sign" placeholder="团队简介以及个人签名" maxlength="140" show-word-limit  
                            style="width: 430px; height: 198px;" />
                        </span>
                    </FormItem>
                    <FormItem>
                        <Button class="confirm-btn" type="success">确认</Button>
                    </FormItem>
                </Form>
            </div>
            <div v-if="!showPersonal" class="setting-card info-setting-card">
                <div class="info-content">
                    <span class="info-text">资源更新提醒</span>
                    <i-switch class="info-switch" v-model="switch1" @on-change="updateChange">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <div class="info-content">
                    <span class="info-text">提问回答提醒</span>
                    <i-switch class="info-switch" v-model="switch2" @on-change="replayChange">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <div class="info-content">
                    <span class="info-text">向您提问提醒</span>
                    <i-switch class="info-switch" v-model="switch3" @on-change="askChange">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <div class="info-content">
                    <span class="info-text">软件更新提醒</span>
                    <i-switch class="info-switch" v-model="switch4" @on-change="softwareChange">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <div class="info-content">
                    <span class="info-text">资源评论提醒</span>
                    <i-switch class="info-switch" v-model="switch5" @on-change="commentChange">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <Button class="save-btn" type="success">保存</Button>
            </div>
        </div>
        <corner></corner>
        <Footer style="position:relative; bottom: 0px; margin-top:200px"></Footer>
    </div>
</template>

<script>
import TopNavigation from '../../components/TopNav.vue'
import Footer from '../../components/footer.vue'
import Corner from '../../components/corner.vue'
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
export default {
    name:"EditSetting",
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
        /* TODO 检查是否含有敏感词 */
        const sensitive = (rule, value, callback) => {
            // if (value.length < 6) {
            //     callback(new Error('*仅限中英文'))
            // } else {
            //     callback()
            // }
        }
        return {
            account: 'xiamuZhu@ztgame.com',
            personalForm: {
                nickname: "",
                sign: ""
            },
            inputRule: {
                nickname: [{required: false, trigger:'blur'}],
                sign:[{required: false, validator: sensitive, trigger:'blur'}]
            },
            showPersonal: true,
            switch1: true,
            switch2: true,
            switch3: false,
            switch4: true,
            switch5: true,
            // 无需从后端读取
            loading: false,     // 判断图片是否加载完毕    
            finished: false,    // 判断图片已经加载完毕    
            imageUrl: '',
        }
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
        showPerson(){
            console.log(this.showPersonal)
            this.showPersonal = true
        },
        showInfo(){
            this.showPersonal = false
        },
        handleBeforeUpload(file){
            this.finished = false
            let self = this
            return new Promise(function (resolve, reject) {
                let fr = new FileReader();
                fr.onload = e => {
                    let src = e.target.result;
                    const image = new Image();
                    image.onload = () => {
                        console.log(image.width);  
                        console.log(image.height);
                        if(image.width < 100 || image.height < 100){
                            self.$Notice.warning({
                                title: '图片小于最小尺寸(100px * 100px)'
                            });
                            reject();
                        }else {
                            resolve();
                        }
                    };
                    image.onerror = reject;
                    image.src = src;
                    self.imageUrl = src;
                };
                fr.readAsDataURL(file)
            });
        },
        handleFormatError(){
            this.$Notice.warning({
                title: '不支持的图片格式'
            });
        },
        handleMaxSize(){
            this.$Notice.warning({
                title: '图片容量超过上限(1MB)'
            });
        },
        handleUploading(event, file){
            if (file.status === 'uploading') {
                this.loading = true;
                return;
            }
        },
        handleSuccess (res, file) {
            // file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            // file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            console.log("file "+file.status)
            console.log("file "+file.name)
            this.loading = false;
            this.finished = true;
            
            // Get this url from response in real world.
            // getBase64(file.originFileObj, imageUrl => {
            //     this.imageUrl = imageUrl;
            //     this.loading = false;
            //     console.log("url "+this.imageUrl)
            // });
        },
        /* TODO 只能输入中英文 ？？？ */
        onlyWord(){
            this.personalForm.nickname=this.personalForm.nickname.replace(/[/d]/g,'') 
        },
        onlyWord1(){
            clipboardData.setData('text',clipboardData.getData('text').replace(/[/d]/g,''))
            // this.personalForm.nickname=this.personalForm.nickname.replace(/[/d]/g,'') 
        },
        // TODO 改变的值要传给后端
        updateChange(status){
        },
        replayChange(status){
        },
        askChange(status){
        },
        softwareChange(status){
        },
        commentChange(status){
        },
    },
}
</script>
<style>
.setting-card > .personal-input > .span1 > .ivu-input-wrapper > .ivu-input-icon{
    /* 使锁居中 */
    line-height: 44px;
}
.setting-card > .personal-input > .span1 > .ivu-input-wrapper > .ivu-input{
    height: 100%;
    background-color: #eaeaea;
}
.span > .ivu-input-wrapper > .ivu-input{
    height: 100%;
}
</style>
<style scoped>
.middle-card-wrapper{
    width:100%;
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    justify-content:center;
    /* align-items:center; */
}
.leftside-menu{
    position: sticky;
    font-family: MicrosoftYaHei;
    width: 281px;
    height: 160px;
    /* left: 50px; */
    top: 170px;
    margin-right: 30px;
    padding: 30px 30px 30px 30px;
    border-radius: 3px;
    /*box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2);*/
    background-color: #ffffff;
}
.setting-card{
    position: relative;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    width: 830px;
    height: 900px;
    /* left: 350px; */
    top: 30px;
    padding: 60px 30px 60px 80px;
    border-radius: 3px;
    background-color: #ffffff;
    overflow: auto;
}
.info-setting-card{
    height: 650px;
    width: 830px;
    padding: 60px 98px 60px 98px;
}
.info-content{
    height: 84px;
    border-bottom: 1px solid #eff2f5;
    text-align:center;
    line-height: 84px;
}
.info-text{
    color: #000000;
    font-size: 16px;
    position: relative;
    float: left;
    margin-right: 450px;
}
.info-switch{
    position: relative;
    /* float: right; */
}
.save-btn{
    margin-top: 60px;
    margin-left: 100px;
    width: 430px;
    height: 44px;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
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
.camera:hover{
    cursor: pointer;
    color: #1ebf73;
    background-color: #e8f8f0;
}
.camera-btn{
    display: inline-block;
    height: 44px;
    width: 430px;
    font-size: 16px;
    margin-left: 220px;
    margin-top: -220px;
}
.camera-btn:active{
    background-color: #1ebf73;
    color: white;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
.notice-content{
    font-size: 14px;
    color: #7d7d7d;
    margin-left: 220px;
    margin-top: -100px;
}
.personal-input{
    margin-top: 70px;
    font-size: 16px;
    color: #000000;
}

.confirm-btn{
    width: 430px;
    height: 44px;
    font-weight: bold;
    font-size: 18px;
    margin-left: 218px;
    margin-top: 70px;
    cursor: pointer;
}

</style>

