<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="middle-card-wrapper">
            <div class="self-card">
                <div class="self">
                    <!-- <img src="../../assets/绿头像.jpg" class="avatar"> -->
                    <div v-if="this.profilePic != null"><img class="avatar" :src="profilePic"></div>
                    <div v-else class="font-avatar">{{getUser.charAt(0)}}</div>
                    <Icon size="20" class="edit-self" type="md-create" @click="goPage('/editSetting')"/>
                    <ul style="font-size: 21px;font-weight: bold;">{{getUser}}</ul>
                    <ul style="font-size: 14px; color: #7f7f7f;">{{getDep}}</ul>
                </div>
                <br>
                <ul style="font-size: 14px; color: #7f7f7f;">{{getSign}}</ul>
                <Divider />
                <!-- TODO 从后端数据库读取-->
                <ul style="font-size: 16px; font-weight: bold">标签</ul><br>
                <span v-for="(item,index) in personalTagList" :key="index">
                    <Tag class="tag-style" size="large">{{item}}</Tag>
                </span>
                <Divider />
                <ul style="font-size: 16px; font-weight: bold">优秀作品集</ul><br>
                <div v-for="(item, i) in productList" :key="'a'+i">
                    <div class="font-image">{{item.charAt(0)}}</div>&emsp;{{item}}
                    <br><br>
                </div>
            </div>
            
            <div class="asset-card" >
                <Tabs :value="personalActive" :animated="false">
                    <TabPane :label="tab1" name="name1">
                        <div class="upload-style" @click="goPage('/upFile')">
                            <Icon id="folder" size="80" type="md-folder" :class="uploadFolderStyle"/>  
                            <font-awesome-icon :icon="['fas','plus']" @mouseover="bright" @mouseout="unBright" class="upload-add-style"/>
                        </div>
                        <source-box v-bind:sourceName='this.productList[0]'></source-box>
                        <source-box v-bind:sourceName='this.productList[1]'></source-box>  
                    </TabPane>
                    <TabPane :label="tab2" name="name2">
                        <software-box v-bind:softwareName='this.softwareList[0]'></software-box>
                        <software-up-box v-bind:softwareName='this.softwareList[1]'></software-up-box>
                        <software-pend-box v-bind:softwareName='this.softwareList[2]'></software-pend-box>
                    </TabPane>
                    <TabPane :label="`关注(${this.$store.state.favoriteList.length})`" name="name3">
                        <div v-if="this.$store.state.favoriteList.length==0" class="like-btn-container">
                            <cartoon></cartoon>
                            <Button class="like-btn" @click="goPage('/')">去关注</Button>
                        </div>
                        <div v-else v-for="n in this.$store.state.favoriteList.length" :key="n" style="display:inline-block;">
                            <like-box></like-box>
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
import SourceBox from '../../components/sourceBox.vue'
import LikeBox from '../../components/likeBox.vue'
import SoftwareBox from '../../components/softwareBox.vue'
import SoftwareUpBox from '../../components/softwareUpBox.vue'
import SoftwarePendBox from '../../components/softwarePendBox.vue'
import Cartoon from '../../components/cartoon.vue'

export default {
    name:"Personal",
    components:{TopNavigation, Footer, Corner, SourceBox, SoftwareBox, 
    SoftwareUpBox, SoftwarePendBox, LikeBox, Cartoon},
    computed:{
        getUser(){ 
            let o = JSON.parse(this.$store.state.user)
            if(o.nickName == null){
                return o.name
            }else{
                return o.nickName
            }
        },
        getDep(){
            let o = JSON.parse(this.$store.state.user)
            return o.dept
        },
        getSign(){
            let o = JSON.parse(this.$store.state.user)
            return o.signature
        }
    },
    mounted() {
        this.personalActive = this.$store.state.personalActive
        // this.tab3 = "关注("+this.$store.state.favoriteList.length+")"
        // 拿到头像
        let o = JSON.parse(this.$store.state.user)
        this.profilePic = o.profilePic
    },
    data () {
        return {
            profilePic: null,
            uploadFolderStyle: "upload-folder-style",
            tab1: "资源(2)",
            tab2: "软件(1)",
            personalActive: "name1",
            personalTagList: ['小天使','小棉袄','小甜饼','柯南骨灰粉','正义使者','你老爸','暴躁老妹'],// 从后端拿
            // TODO 这两个list还得修改。每一个都还有其他产品信息
            productList: ['二次元人物模型','天空贴图素材包'],    
            softwareList: ['ADOBE CS SUITE', 'WINDOWS 10预装版','申请的软件名称'],
        }
    },
    methods:{
        goPage(url){
            this.$router.push(url)
        },
        bright(){
            this.uploadFolderStyle = "upload-folder-style-hover"
        },
        unBright(){
            this.uploadFolderStyle = "upload-folder-style";
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
    margin-left: 0px;
 }
.asset-card > .ivu-tabs{
    overflow: visible;
    min-height: 500px;
}
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container > .ivu-tabs-nav-wrap
> .ivu-tabs-nav-scroll{
    position: sticky;
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
    font-family: MicrosoftYaHei;
    width: 360px;
    height: 660px;
    margin-top: 53px;
    /* top: 10px; */
    padding: 30px 20px 30px 25px;
    border-radius: 3px;
    background-color: #ffffff;
}
.self{
    position: relative;
    font-family: MicrosoftYaHei;
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
.avatar{
    border-radius: 50%; 
    width: 104px; 
    height:104px;
    text-align: center;
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

.asset-card{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    width: 1200px;
    height: 660px;
    margin-left: 50px;
    margin-top: 53px;
    padding: 20px 28px 30px 28px;
    border-radius: 3px;
    background-color: #ffffff;
    overflow: auto;
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
.tabpane{
    cursor: pointer;
    font-size: 16px;
}
.tabpane:hover{
    color: #1ebf73;
}
.upload-style{
    float: left;
    height: 196px; 
    width: 274px;
    margin-top: 30px;
    margin-right: 50px;
    border: solid 2px #eaeaea;
}
.upload-style:hover{
    background-color: #e8f8f0;
    border: solid 2px #1ebf73;
}
.upload-add-style{
    position: absolute;
    cursor: pointer;
    color: #ffffff;
    top: 178px;
    left: 128px;
    width: 24px;
    font-size: 24px;
    text-align:center;
    z-index: 10;
}

.upload-folder-style{
    position: absolute;
    cursor: pointer;
    line-height: 196px;
    width: 274px;
    text-align:center;
    color:#e5e5e5;
}
.upload-folder-style-hover{
    position: absolute;
    cursor: pointer;
    line-height: 196px;
    width: 274px;
    text-align:center;
    color:#1ebf73;
}
.upload-folder-style:hover{
    color:#1ebf73;
}
.like-btn-container{
    width: 1120px;
    height: 560px;
}
.like-btn{
    position: relative;
    width: 250px;
    height: 50px;
    top: 230px;
    left: 460px;
    font-size: 16px;
    float: center;
}
</style>

