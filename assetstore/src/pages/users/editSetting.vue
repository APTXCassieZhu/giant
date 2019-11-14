<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="middle-card-wrapper">
            <Menu active-name="1" class="leftside-menu" style="width:281px;">
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
                    action="/upload"
                >
                    <div v-if="finished" class="demo-upload-list">
                        <img class="camera" :src="imageUrl" alt="avatar" />
                        <div class="demo-upload-list-cover">
                            <svg @mousedown="handleView()" style="position:relative; top: 5px;height:32px; width: 32px;cursor:pointer;" t="1572859566143" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4817"  width="200" height="200"><defs></defs><path d="M512 234.666667c131.946667 0 252.245333 80.512 360.874667 241.536a64 64 0 0 1 2.410666 67.712l-2.410666 3.882666-6.058667 8.853334C759.786667 711.765333 641.493333 789.333333 512 789.333333c-131.946667 0-252.245333-80.512-360.874667-241.536a64 64 0 0 1-2.410666-67.712l2.410666-3.882666 6.058667-8.853334C264.213333 312.234667 382.506667 234.666667 512 234.666667z m0 64c-105.770667 0-206.037333 65.749333-301.952 204.757333L204.181333 512l5.888 8.597333C306.069333 659.648 406.314667 725.333333 512 725.333333c105.770667 0 206.037333-65.749333 301.952-204.757333l5.866667-8.576-5.888-8.597333C717.930667 364.352 617.685333 298.666667 512 298.666667z m0 77.482666a141.482667 141.482667 0 1 1 0 282.944 141.482667 141.482667 0 0 1 0-282.944z m0 64a77.482667 77.482667 0 1 0 0 154.944 77.482667 77.482667 0 0 0 0-154.944z" p-id="4818" fill="#ffffff"></path></svg>
                            <Modal v-model="viewImage" :footer-hide="true" style="text-align:center">
                                <img :src="imageUrl" alt="avatar" />
                            </Modal>
                            <svg @mousedown="handleRemove()" style="height:23px; width: 23px; cursor:pointer;" t="1572861115099" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2153" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M426.65984 42.65984l170.65984 0q53.00224 0 90.50112 37.49888t37.49888 90.50112l0 42.65984 170.65984 0q17.67424 0 30.16704 12.4928t12.4928 30.16704-12.4928 30.16704-30.16704 12.4928l-42.65984 0 0 512q0 53.00224-37.49888 90.50112t-90.50112 37.49888l-426.65984 0q-53.00224 0-90.50112-37.49888t-37.49888-90.50112l0-512-42.65984 0q-17.67424 0-30.16704-12.4928t-12.4928-30.16704 12.4928-30.16704 30.16704-12.4928l170.65984 0 0-42.65984q0-53.00224 37.49888-90.50112t90.50112-37.49888zM768 810.65984l0-512-512 0 0 512q0 17.67424 12.4928 30.16704t30.16704 12.4928l426.65984 0q17.67424 0 30.16704-12.4928t12.4928-30.16704zM597.34016 128l-170.65984 0q-17.67424 0-30.16704 12.4928t-12.4928 30.16704l0 42.65984 256 0 0-42.65984q0-17.67424-12.4928-30.16704t-30.16704-12.4928z" p-id="2154" fill="#ffffff"></path></svg>
                        </div>
                    </div>
                    <div v-else class="camera">
                        <Icon v-if="loading" size="28" type='ios-loading' class="demo-spin-icon-load"/>
                        <Icon v-if="!loading" size="28" type='md-camera'/>
                    </div>
                </Upload>
                <Modal title="图片剪裁" v-model="dialogVisible" @on-ok="cropFinish()" :loading="loading">
                    <div class="cropper" style="text-align:center">
                        <vueCropper
                            ref="cropper"
                            :img="option.img"
                            :outputSize="option.size"
                            :outputType="option.outputType"
                            :info="true"
                            :full="option.full"
                            :canMove="option.canMove"
                            :canMoveBox="option.canMoveBox"
                            :original="option.original"
                            :autoCrop="option.autoCrop"
                            :fixed="option.fixed"
                            :fixedNumber="option.fixedNumber"
                            :centerBox="option.centerBox"
                            :infoTrue="option.infoTrue"
                            :fixedBox="option.fixedBox"
                            @realTime="realTime"
                        ></vueCropper>
                    </div>
                </Modal>
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
                    action="/upload"
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
                            <Input v-model="personalForm.nickname" placeholder="工作环境，显示名称请谨慎对待" maxlength="10" show-word-limit 
                            @onkeyup.native="onlyWord()" @onbeforepaste.native="onlyWord1()" clearable 
                            style="width: 430px; height: 44px;" />
                        </span>
                    </FormItem>
                    <FormItem prop="sign" class="personal-input">
                        <span style="position:relative; top: -86px;">签名栏</span>
                        <span style="margin-left: 172px;" class="span">
                            <Input type="textarea" v-model="personalForm.sign" placeholder="团队简介以及个人签名" maxlength="140" show-word-limit  
                            style="width: 430px; height: 198px;" clearable/>
                        </span>
                    </FormItem>
                    <FormItem>
                        <Button class="confirm-btn" type="success" @click="submitPersonalForm()">确认</Button>
                    </FormItem>
                </Form>
            </div>
            <div v-if="!showPersonal" class="setting-card info-setting-card">
                <div class="info-content">
                    <span class="info-text">资源更新提醒</span>
                    <i-switch class="info-switch" v-model="switch1"       >
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <div class="info-content">
                    <span class="info-text">提问回答提醒</span>
                    <i-switch class="info-switch" v-model="switch2">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <div class="info-content">
                    <span class="info-text">向您提问提醒</span>
                    <i-switch class="info-switch" v-model="switch3">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <div class="info-content">
                    <span class="info-text">软件更新提醒</span>
                    <i-switch class="info-switch" v-model="switch4">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <div class="info-content">
                    <span class="info-text">资源评论提醒</span>
                    <i-switch class="info-switch" v-model="switch5">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </div>
                <Button class="save-btn" type="success" @click="submitSetting()">保存</Button>
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
    mounted() {
        this.personalActive = this.$store.state.personalActive 
        let u = JSON.parse(this.$store.state.user)
         if(u.profilePic != null){
            this.finished = true
            this.imageUrl = u.profilePic
        }
        this.account = u.account
        this.personalForm.nickname = u.nickName
        this.personalForm.sign = u.signature
        // axios.get('/user/describe').then((res)=>{
        //     if(res.data.code == 0){
        //         this.$store.commit('ADD_COUNT', res.headers.Authorization)
        //         if(res.data.data.profilePic != null){
        //             this.finished = true
        //             this.imageUrl = res.data.data.profilePic
        //         }
        //         this.account = res.data.data.account
        //         this.personalForm.nickname = res.data.data.nickName
        //         this.personalForm.sign = res.data.data.signature
        //     }
        //     else if(res.data.code == 404){
        //         alert('user not found')
        //     }
        // }, (res)=>{
        //     // 请求失败
        //     alert(res)
        // })
        /*TODO 从后端get setting的数据 */
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
            viewImage: false,   // 点击大图查看头像
            dialogVisible: false,
            // 裁剪组件的基础配置option
            option: {
                img: '', // 裁剪图片的地址
                info: true, // 裁剪框的大小信息
                outputSize: 0.8, // 裁剪生成图片的质量
                outputType: 'png', // 裁剪生成图片的格式
                canScale: true, // 图片是否允许滚轮缩放
                autoCrop: true, // 是否默认生成截图框
                autoCropWidth: 250, // 默认生成截图框宽度
                autoCropHeight: 250, // 默认生成截图框高度
                fixedBox: false, // 固定截图框大小 不允许改变
                fixed: true, // 是否开启截图框宽高固定比例
                fixedNumber: [1, 1], // 截图框的宽高比例
                full: false, // 是否输出原图比例的截图
                canMoveBox: true, // 截图框能否拖动
                original: false, // 上传图片按照原始比例渲染
                centerBox: false, // 截图框是否被限制在图片里面
                infoTrue: false // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
            },
            // 防止重复提交
            loading: false
        }
    },
    methods:{
        goPage(url){
            if(this.$route.path===url){
                location.reload()
            }else{
                this.$router.push(url)
            }
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
                            self.$Message.warning({
                                background: true,
                                content: '图片小于最小尺寸(100px * 100px)'
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
                // 转化为base64
                fr.readAsDataURL(file)
            });
        },
        handleFormatError(){
            this.$Message.warning({
                background: true,
                content: '不支持的图片格式'
            });
        },
        handleMaxSize(){
            this.$Message.warning({
                background: true,
                content: '图片容量超过上限(1MB)'
            });
        },
        handleUploading(event, file){
            if (file.status === 'uploading') {
                this.loading = true;
                return;
            }
        },
        handleSuccess (res, file) {
            console.log("file "+file.status)
            console.log("file "+file.name)
            
            this.loading = false;
            this.finished = true;
            this.option.img = this.imageUrl
            this.dialogVisible = true
        },
        // 实时预览函数
        realTime(data) {
            console.dir(data)
            this.imageUrl = data.url
        },
        cropFinish(){
            this.$refs.cropper.getCropData((data) => {
                this.loading = true
                this.dialogVisible = false
                this.imageUrl = data
            });
        },
        handleView(){
            this.viewImage = true
        },
        handleRemove(){
            this.finished = false
            this.loading = false
        },
        submitPersonalForm(){
            this.$http.put('/user',{profilePic:this.imageUrl, nickName:personalForm.nickname, 
            signature:personalForm.sign}).then(res => {
                if(res.data.code == 0){
                    // 更新全局变量信息
                    this.$store.commit('ADD_USER', res.data.data);
                    // 用户基本资料修改成功
                    this.$Message.warning({
                        background: true,
                        content: '修改资料成功'
                    });
                }
                else if(res.data.code == 400){
                    alert('bad request (form error)')
                }
            }, res => {
                // error callback
            });
        },
        /* TODO 只能输入中英文 ？？？ */
        onlyWord(){
            this.personalForm.nickname=this.personalForm.nickname.replace(/[/d]/g,'') 
        },
        onlyWord1(){
            clipboardData.setData('text',clipboardData.getData('text').replace(/[/d]/g,''))
            // this.personalForm.nickname=this.personalForm.nickname.replace(/[/d]/g,'') 
        },
        submitSetting(){
            /* TODO swagger 接口还没写好 */
            this.$http.put('/user',{profilePic:this.imageUrl, nickName:personalForm.nickname, 
            signature:personalForm.sign}).then(res => {
                if(res.data.code == 0){
                    // 用户基本资料修改成功
                    this.$Message.warning({
                        background: true,
                        content: '修改设置成功'
                    });
                }
                else if(res.data.code == 400){
                    alert('bad request (form error)')
                }
            }, res => {
                // error callback
            });
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
    resize: none;
}
.personal-input > .ivu-form-item-content > span > .ivu-input-wrapper > .ivu-icon{
    /* 使clearable的叉叉居中 */
    line-height: 44px;
}

.leftside-menu > .ivu-menu-item{
    width: 281px;
    padding: 14px 40px;
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
    height: 98px;
    top: 170px;
    margin-right: 30px;
    border-radius: 3px;
    /*box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.2);*/
    background-color: #ffffff;
    z-index: 0;
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
.demo-upload-list{
    display: inline-block;
    height: 116px;
    width: 116px;
    border-radius: 50%;
    text-align: center;
    line-height: 116px;
}
.camera{   
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
    cursor: pointer;
}
.camera-btn:active{
    background-color: #1ebf73;
    color: white;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 60px;
    height: 116px;
    width: 116px;
    border-radius: 50%;
    text-align: center;
    line-height: 116px;
    background: rgba(0,0,0,.5);
    z-index: 1;
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.cropper {
    width: auto;
    height: 300px;
}

.notice-content{
    font-size: 14px;
    color: #7d7d7d;
    margin-left: 220px;
    margin-top: -90px;
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

