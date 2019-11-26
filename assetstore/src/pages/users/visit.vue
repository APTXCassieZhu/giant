<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="middle-card-wrapper">
            <div class="self-card">
                <div class="self">
                    <div v-if="this.profilePic != null"><img class="avatar" :src="profilePic"></div>
                    <div v-else class="font-avatar">{{this.resName.charAt(0)}}</div>
                    <ul style="font-size: 21px;font-weight: bold;">{{this.resName}}</ul>
                    <ul style="font-size: 14px; color: #7f7f7f;">{{this.user.dept}}</ul>
                </div>
                <br>
                <ul style="font-size: 14px; color: #7f7f7f;text-align: center">{{this.signature}}</ul>
                <Divider />
                <ul style="font-size: 16px; font-weight: bold">印象</ul><br>
    
                <span v-for="(item,index) in this.user.labels" :key="index">
                    <a-tag class="tag-style">
                        &emsp;{{item.val}}&emsp;
                        <font-awesome-icon :icon="['fas', 'times']" v-if="isMe(item.sourceUserId)" class="tag-style-close" @click="handleCloseTag(item)"/>
                    </a-tag>
                </span>
                
                <a-form v-if="inputVisible" id="components-form-demo-validate-other" :form="form">
                    <a-form-item class="form-ant-style">
                        <!-- TODO validator 2-8为key enter时validate-->
                        <a-input
                            ref="input"
                            type="text"
                            size="small"
                            :style="inputAnt"
                            placeholder="请输入2-8个字符"
                            @change="handleInputChange"
                            @blur="handleInputConfirm"
                            @keyup.enter="handleInputConfirm"
                            v-decorator="['resource-version', { rules: [
                                {type:'string', min: 2, max: 8, message:'请输入2-8个字符', trigger:'blur'},
                                {validator:this.handleValidator.bind(this)}
                                ] 
                            }]"
                        >
                            <Icon slot="suffix" type="md-return-left" />
                        </a-input>
                    </a-form-item>
                </a-form>
                <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
                    <a-icon type="plus" class="plus-ant-style"/> <span style="color: #1ebf73;font-size: 12px">增加标签</span>
                </a-tag>
                <div v-if="this.user.labels.length == 0" class="tag-hint">
                    美术大佬？IT精英？为Ta添加第一条标签吧！
                </div>
                <Divider />
                <ul style="font-size: 16px; font-weight: bold">优秀作品集</ul><br>
                <div v-if="this.user.fineResources == null" class="empty-personal">
                    <p>暂无优秀作品哦～</p>
                </div>
                <div v-else v-for="(resource, i) in this.user.fineResources" :key="'a'+i">
                    <div class="personal-fine">
                        <div v-if="resource.images==null" class="font-image">{{resource.name.charAt(0)}}</div>
                        <div v-else><img class="font-image" :src="concatImgUrl(resource.images[0].id)"></div>
                        <div class="font-name">{{resource.name}}</div>
                    </div>
                    <br><br>
                </div>
                <Button class="ask-btn">向TA提问</Button>
            </div>
        
            <div class="asset-card" >
                <Tabs value="name" :animated="false">
                    <TabPane :label="tab" name="name">
                        <div class="container">
                            <div>
                                <span v-for="(item, n) in this.sourceList" :key="n" style="display:inline-block;">
                                    <others-box :source="item" :whoShared="resName" :isStar="item.isStar"></others-box>
                                </span>
                            </div>
                            <div style="text-align: center">
                                <Button v-show="ifMoreSource" id="more" class="more" @click="addMore()">加载更多</Button>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
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
import OthersBox from '../../components/othersBox.vue'

export default {
    name:"Visit",
    components:{TopNavigation, Footer, Corner, OthersBox},
    computed:{
    },
    beforeCreate() {
        // var that = this
        // this.form = this.$form.createForm(this, {name: 'validate_other'})

        var that = this
        this.form = this.$form.createForm(this, {
            name: 'validate_other' 
        })
    },
    mounted() {
        // 拿到访问对象的基础信息
        axios.get(`/api/user/${this.$route.params.userId}`,{params:{page: this.sourcePage,
        pageSize: this.sourcePageSize,}}).then((res)=>{
            if(res.data.code == 0){
                this.user = res.data.data
                this.profilePic = res.data.data.profilePic
                if(res.data.data.nickName == null){
                    this.resName = res.data.data.name
                }else{
                    this.resName = res.data.data.nickName
                }
                if(res.data.data.signature == null){
                    this.signature = '该用户暂未填写描述'
                }else{
                    this.signature = res.data.data.signature
                }
                if(res.data.data.labels == null){
                    this.user.labels = []
                }
            }
        }, (res)=>{
            alert(res)
        })
        // 拿到访问的用户上传的公开资源列表
        axios.get(`/api/user/${this.$route.params.userId}/resource`, {
            params: {
                page: this.page,
                pageSize: this.pageSize,
            }
        }).then((res)=>{
            if(res.data.code == 0){
                this.sourceList = res.data.data.list
                this.tab = `资源(${res.data.data.count})`
                if(res.data.data.count > this.sourceList.length){
                    this.ifMoreSource = true
                }
            }
        }, (res)=>{
            alert(res)
        })
    },
    computed:{
        
    },
    data () {
        return {
            user: {
                labels:[],
                fineResources:[]
            },
            page: 1,
            pageSize: 10,
            resName: "受访者张佳",
            profilePic: null,
            tab: `资源(0)`,
            signature: "",
            personalTagList: ['改需求狂人','纠结','evil','偶尔良心发现','冷酷无情','无理取闹','债主'],// 从后端拿
            sourceList: [],
            inputVisible: false,
            inputValue: '',
            inputAnt: "{width: 315px; height: 31px;}",
            ifMoreSource: false,
            page: 1,
            pageSize: 20,
        }
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
        handleValidator(rule,value,callback){
            if(this.user.labels.length >= 10){
                callback('不要超过10个噢~')
                return 
            }else{
                callback()
            }
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(function() {
                this.$refs.input.focus();
            });
        },
        handleCloseTag(removedTag){
            const tags = this.user.labels.filter(tag => tag !== removedTag);
            this.user.labels = tags;
        },
        handleInputChange(e) {
            this.inputValue = e.target.value;
        },

        handleInputConfirm() {
            const inputValue = this.inputValue;
            console.log(inputValue.length)
            let personalTagList = this.user.labels;
            let o = JSON.parse(this.$store.state.user)
            if (inputValue && personalTagList.indexOf(inputValue) === -1 && inputValue.length <= 8 
            && inputValue.length >= 2) {
                personalTagList = [...personalTagList, {'val': inputValue, 'sourceUserId': o.id, 'userId': this.$route.params.userId}];
                this.user.labels = personalTagList
                console.log(this.user.labels)
                Object.assign(this, {
                    inputVisible: false,
                    inputValue: '',
                });
                axios.post(`/api/user/${this.$route.params.userId}/label`,{'label': inputValue},{emulateJSON:true}).then((res)=>{
                    if(res.data.code == 0){
                    }
                    else if(res.data.code == 40101){
                        this.$Modal.error({
                            title: '未找到用户',
                        })
                    }
                    }, (res)=>{
                    alert(res)
                })
            }
        },
        // 判断是不是用户打的标签，只有自己给别人打的标签，才有资格删除
        isMe(sid){
            let o = JSON.parse(this.$store.state.user)
            return sid == o.id
        },
        addMore(){
            this.page += 1
            axios.get(`/api/${this.$route.params.userId}/resource`, {
                params: {
                    page: this.page,
                    pageSize: this.pageSize,
                }
            }).then((res)=>{
                if(res.data.code == 0){
                    this.sourceList = this.sourceList.concat(res.data.data.list)
                    if(res.data.data.count > this.sourceList.length){
                        this.ifMoreSource = true
                    }else{
                        this.ifMoreSource = false
                    }
                }
            }, (res)=>{
                // 登录失败
                alert(res)
            })
        },
        concatImgUrl(url){
            return `//192.168.94.238:3000/file/download/${url}?token=${this.$store.state.token}`         
        },
    },
}
</script>
<style>
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container{
    font-size: 18px!important;
}
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container
 > .ivu-tabs-nav-wrap > .ivu-tabs-nav-scroll > .ivu-tabs-nav > .ivu-tabs-tab{
    /* 使得三个标签间距变大 */
    padding: 8px 50px;
 }
.asset-card > .ivu-tabs{
    overflow: visible;
    min-height: 500px;
}
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container > .ivu-tabs-nav-wrap
> .ivu-tabs-nav-scroll{
    position: sticky;
}
.plus-ant-style > svg{
    color: #1ebf73;
}
.form-ant-style,.ant-form-item {
    margin-bottom: 0px;
}
</style>
<style scoped>
.middle-card-wrapper{
    width:100%;
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    justify-content:center;
    /* align-items:center; */
}
.self-card{
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    width: 360px;
    /* min-height: 730px; */
    left: 50px;
    top: 50px;
    padding: 30px 20px 40px 25px;
    border-radius: 3px;
    background-color: #ffffff;
}
.self{
    position: relative;
    font-family: MicrosoftYaHei;
    text-align: center;
}
.avatar{
    border-radius: 50%; 
    width: 104px; 
    height:104px;
    text-align: center;
}
.font-avatar{
    border-radius: 50%; 
    width: 104px; 
    height:104px;
    text-align: center;
    line-height: 104px;
    background-color: #e8f8f0;
    color: #1ebf73;
    font-size: 50px;
    margin: auto;
    margin-bottom: 15px;
}
.edit-self{
    position: absolute;
    top: 0px;
    right: 15px;
    border-radius: 3px;
    /*color: rgb(0, 140, 255);*/
    color: #1ebf73;
    cursor: pointer;
}
.tag-hint{
    font-size: 12px;
    letter-spacing: 0.86px;
    color: #7f7f7f;
    margin-top: 5px;
}
.ask-btn{
    width: 316px;
    height: 41px;
    border-radius: 3px;
    border: solid 1px #1ebf73;
    background-color: #e8f8f0;
    font-size: 16px;
    font-weight: 600;
    color: #1ebf73;
    cursor: pointer;
    margin-top: 20px;
}
.asset-card{
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    width: 1200px;
    height: 660px;
    left: 100px;
    top: 53px;
    padding: 20px 28px 30px 28px;
    border-radius: 3px;
    background-color: #ffffff;
    overflow: auto;
}
.tag-style{
    margin-right:15px;
    margin-bottom: 10px;
}
.tag-style-close{
    width: 10px;
    height: 10px;
    color: #7f7f7f;
    line-height: 21px;
    text-align: center;
    top: -2px;
    position: relative;
}
.tag-style-close:hover{
    color: red;

}
.empty-personal{
    font-size: 14px;
    color: #777777;
    letter-spacing: 1px;
}
.personal-fine{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.font-image{
    font-size:16px;
    display: inline-block;
    color: #1ebf73;
    background-color: #e8f8f0;
    height: 44px;
    width: 44px;
    text-align: center;
    line-height: 44px;
}
.font-name{
    font-size: 14px;
    letter-spacing: 1px;
    color: #7f7f7f;
    margin-left: 20px;
}
.tabpane{
    cursor: pointer;
    font-size: 16px;
}
.tabpane:hover{
    color: #1ebf73;
}

.container{
    display:flex;
    /* align-items:center; */
    flex-direction: column;
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
    margin-top: 30px;
}

@media only screen and (max-width: 1600px) {
    .asset-card {
        width: 800px;
        min-height: 620px;
    }
}
@media only screen and (max-width: 1366px) {
    .asset-card {
        width: 900px;
        min-height: 620px;
    }
}
</style>

