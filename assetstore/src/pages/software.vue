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
        <Menu active-name="1" class="sidemenu-card">
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
        <div v-show="showPage == 'general'" class="software-page">
            <span class="card-title">通用软件（{{generalNum}}款已收录）</span>
            <Divider/>
            <div v-for="n in 7" :key="n">
                <software-download></software-download>
            </div>
            <Button v-show="!ifMore" id="more" class="more" @click="addMore()">加载更多</Button>
            <div v-if="ifMore">
                <software-download v-for="n in 13" :key="n"></software-download>
            </div>
        </div>
        <div v-show="showPage == 'special'" class="software-page">
            <span class="card-title">专用软件（{{specialNum}}款已收录）</span>
            <Divider/>
            <div v-for="n in 7" :key="n">
                <software-download></software-download>
            </div>
            <Button v-show="!ifMore" id="more" class="more" @click="addMore()">加载更多</Button>
            <div v-if="ifMore">
                <software-download v-for="n in 13" :key="n"></software-download>
            </div>
        </div>
        <div v-show="showPage == 'free'" class="software-page">
            <span class="card-title">常用免费软件（{{freeNum}}款已收录）</span>
            <Divider/>
            <div v-for="n in 7" :key="n">
                <software-download></software-download>
            </div>
            <Button v-show="!ifMore" id="more" class="more" @click="addMore()">加载更多</Button>
            <div v-if="ifMore">
                <software-download v-for="n in 13" :key="n"></software-download>
            </div>
        </div>
        <div v-show="showPage == 'schedule'" class="software-page">
            <span class="card-title">预装软件（{{scheduleNum}}款已收录）</span>
            <Divider/>
            <div v-for="n in 7" :key="n">
                <software-download></software-download>
            </div>
            <Button v-show="!ifMore" id="more" class="more" @click="addMore()">加载更多</Button>
            <div v-if="ifMore">
                <software-download v-for="n in 13" :key="n"></software-download>
            </div>
        </div>
        <div v-show="showPage == 'drive'" class="software-page">
            <span class="card-title">驱动软件（{{driveNum}}款已收录）</span>
            <Divider/>
            <div v-for="n in 7" :key="n">
                <software-download></software-download>
            </div>
            <Button v-show="!ifMore" id="more" class="more" @click="addMore()">加载更多</Button>
            <div v-if="ifMore">
                <software-download v-for="n in 13" :key="n"></software-download>
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
export default {
    name:"software",
    components:{TopNavigation, Footer, Corner, SoftwareDownload},
    data(){
        return{
            generalNum: 20,
            specialNum: 25,
            freeNum: 18,
            scheduleNum: 10,
            driveNum: 8,
            ifMore: false,
            showPage: 'general'
        }
    },
    methods:{
        addMore(){
            this.ifMore = true
        },
    },
}
</script>

<style scoped>
.bread-container {
    position: relative;
    left: 3%;
}
.alert{
    position: relative;
    top: 15px;
    left: 2.5%;
    width: 90%;
    font-size: 16px;
}
.sidemenu-card{
    position: relative; 
    float: left;
    z-index: 0; 
    left:2.5%;
    top: 28px;
    border-radius: 3px;
}

.software-page{
    position: relative;
    left: 80px;
    top: 28px;
    width: 1200px;
    height: 600px;
    border-radius: 3px;
    padding: 0px 30px 30px 30px;
    background-color: white;
    overflow: auto;
}
.card-title{
    font-size:16px;
    position:relative;
    height:50px;
    top: 14px;
}
.more{
    width: 193px;
    height: 44px;
    background-color: #e8f8f0;
    color: #1ebf73;
    border: solid 1px #1ebf73;
    font-size: 18px;
    font-weight: 600;
}
.more:hover{
    color: white;
    background-color: #1ebf73;
}
</style>

