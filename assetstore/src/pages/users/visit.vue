<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="self-card">
            <div class="self">
                <img src="../../assets/绿头像.jpg" class="avatar">
                <ul style="font-size: 21px;font-weight: bold;">{{this.resName}}</ul>
                <!-- TODO 属于哪个部门从amt那里得到-->
                <ul style="font-size: 14px; color: #7f7f7f;">前沿技术部门</ul>
            </div>
            <br>
            <!-- TODO 用户自己输入-->
            <ul style="font-size: 14px; color: #7f7f7f;">
                我不要你觉得，我要我觉得，必须改 = =
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
            <Button class="ask-btn">向TA提问</Button>
        </div>
        
        <div class="asset-card" >
            <Tabs value="name" :animated="false">
                <TabPane :label="tab" name="name">
                    <div v-if="this.sourceList.length==0" class="like-btn-container">
                    </div>
                    <div v-else v-for="(item, n) in this.sourceList" :key="n" style="display:inline-block;">
                        <like-box :softwareName="item" :whoShared="resName"></like-box>
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
import LikeBox from '../../components/likeBox.vue'

export default {
    name:"Visit",
    components:{TopNavigation, Footer, Corner, LikeBox},
    computed:{
    },
    mounted() {
        this.tab = "资源("+this.sourceList.length+")"
    },
    data () {
        return {
            resName: "受访者张佳",
            tab: "资源(3)",
            personalTagList: ['需求狂人','纠结','evil','偶尔良心发现','冷酷无情','无理取闹','债主'],// 从后端拿
            // TODO 这两个list还得修改。每一个都还有其他产品信息
            productList: ['批判大会','忆往昔峥嵘岁月'],    
            sourceList: ['受访者上传资源1', '受访者上传资源2','受访者上传资源3'],
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
</style>
<style scoped>
.self-card{
    position: relative;
    display:inline-block;
    font-family: MicrosoftYaHei;
    width: 360px;
    height: 730px;
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
.edit-self{
    position: absolute;
    top: 0px;
    right: 15px;
    border-radius: 3px;
    /*color: rgb(0, 140, 255);*/
    color: #1ebf73;
    cursor: pointer;
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

