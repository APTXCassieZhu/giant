<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="self-card">
            <div class="self">
                <ul><img src="../../assets/绿头像.jpg" class="avatar">
                <Icon size="20" class="edit-self" type="md-create" @click="goPage('/editPersonal')"/></ul>
                <ul style="font-size: 21px;font-weight: bold;">{{getUser}}</ul>
                <!-- TODO 属于哪个部门从amt那里得到-->
                <ul style="font-size: 14px; color: #7f7f7f;">前沿技术部门</ul>
            </div>
            <br>
            <!-- TODO 用户自己输入-->
            <ul style="font-size: 14px; color: #7f7f7f;">
                啦啦啦啦啦啦啦啦啦啦啦这一段是瞎写的座右铭：今天明天和后天，一直快乐单身狗╮(╯▽╰)╭
            </ul>
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
                    <div class="upload-style">
                        <Icon id="folder" size="80" type="md-folder" :class="uploadFolderStyle"/>  
                        <Icon size="40" type="md-add" @mouseover.native="bright()" @mouseout.native="unBright()" class="upload-add-style"/>
                    </div>
                    <source-box v-bind:sourceName='this.productList[0]'></source-box>
                    <source-box v-bind:sourceName='this.productList[1]'></source-box>
                </TabPane>
                <TabPane :label="tab2" name="name2">
                    <software-box v-bind:softwareName='this.softwareList[0]'></software-box>
                    <software-up-box v-bind:softwareName='this.softwareList[1]'></software-up-box>
                    <software-pend-box v-bind:softwareName='this.softwareList[2]'></software-pend-box>
                </TabPane>
                <TabPane :label="tab3" name="name3">
                    <div v-if="this.$store.state.favoriteList.length==0" class="like-btn-container">
                        <Button class="like-btn" @click="goPage('/')">去关注</Button>
                    </div>
                    <div v-else v-for="n in this.$store.state.favoriteList.length" :key="n" style="display:inline-block;">
                        <like-box></like-box>
                    </div>
                </TabPane>
            </Tabs>
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

export default {
    name:"Personal",
    components:{TopNavigation, Footer, Corner, SourceBox, SoftwareBox, 
    SoftwareUpBox, SoftwarePendBox, LikeBox},
    computed:{
        getUser(){
            return this.$store.state.token;
        },
    },
    mounted() {
        this.personalActive = this.$store.state.personalActive
        this.tab3 = "关注("+this.$store.state.favoriteList.length+")"
    },
    data () {
        return {
            uploadFolderStyle: "upload-folder-style",
            tab1: "资源(2)",
            tab2: "软件(1)",
            tab3: "关注(0)",
            personalActive: "name1",
            personalTagList: ['小天使','小棉袄','小甜饼','柯南骨灰粉','正义使者','你老爸'],// 从后端拿
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
.self-card{
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    width: 360px;
    height: 660px;
    left: 50px;
    top: 10px;
    padding: 30px 20px 30px 25px;
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
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    width: 1200px;
    height: 660px;
    left: 100px;
    top: 30px;
    padding: 20px 28px 30px 28px;
    border-radius: 3px;
    background-color: #ffffff;
    overflow: auto;
}

.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container{
    font-size: 18px!important;
}
.asset-card > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container
 > .ivu-tabs-nav-wrap > .ivu-tabs-nav-scroll > .ivu-tabs-nav > .ivu-tabs-tab{
    /* 使得三个标签间距变大 */
    padding: 8px 50px;
 }

 /*.asset-card > .ivu-tabs > .ivu-tabs-content{
   overflow: auto;
}*/
.ivu-tabs-nav-scroll {
    position: sticky;
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
    margin-right: 30px;
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
    top: 173px;
    left: 120px;
    width: 24px;
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

