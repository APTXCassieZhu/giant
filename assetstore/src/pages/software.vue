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
                <Menu active-name="1">
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
                <br><br>
                <Button class="sidemenu-btn"><font-awesome-icon :icon="['fas','edit']"/> 找不到想要的？</Button>
            </div>
            <div v-show="showPage == 'general'" class="software-page">
                <div class="card-title">通用软件（{{generalNum}}款已收录）</div>
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
        }
    },
    mounted(){
        // this.$refs.sp1.class='btn1'
        // this.$refs.sp2.class='btn2'
        // this.$refs.sp3.class='btn3'
    },
    methods:{
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
    },
}
</script>

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
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    justify-content:center;
}
.sidemenu-card{
    position: sticky; 
    width: 240px;
    height: 500px;
    top: 210px;
    margin-top: 28px;
    margin-right: 30px;
    border-radius: 3px;
}
.sidemenu-btn{
    width: 239px;
    height: 49px;
    font-size: 16px;
    color: #515A6E;
    border-width: 0px;
}
.sidemenu-btn:hover{
    color: #1ebf73;
    background-color: #f0fff5;
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
    width: 250px;
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

