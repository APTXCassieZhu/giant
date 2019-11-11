<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="middle-card-wrapper">
            <Menu active-name="1" class="leftside-menu" style="width:auto;min-width:281px;">
                <!--TODO 未完成，仅有样式-->
                <MenuItem name="1" @click.native="showInfo">
                    <div class="menu_left_part">
                        <font-awesome-icon :icon="['fas','bell']" style="margin-right:23px;"/> 
                         提醒
                    </div>
                    <div v-if="infoNotRead!=0" class="not-read">{{infoNotRead}}</div>
                </MenuItem>
                <MenuItem name="2" @click.native="showNotice">
                    <div class="menu_left_part">
                        <font-awesome-icon :icon="['fas','bullhorn']" style="margin-right:20px;"/> 
                        通知
                    </div>
                    <div v-if="noticeNotRead!=0" class="not-read">{{noticeNotRead}}</div>
                </MenuItem>
            </Menu>
            <div v-if="!this.showNotices" class="notice-card">
                <div v-if="this.totalInfo.length == 0" class="empty">
                    <Divider/>
                    <font-awesome-icon :icon="['fas','bell']" class="empty-icon"/>
                    <div class="empty-notes">没有新的提醒</div>
                </div>
                <div v-else class="display-infoOrNotice">
                    <a @click="readAll('info')" :class="markRead"><font-awesome-icon :icon="['fas','check-circle']" class="mark-icon"/>  全部标为已读</a>
                    <Divider/>
                    <div v-for="(item,index) in totalInfo" :key="index" :class="infoContentClass">
                        {{item}}
                        <!-- TODO 时间戳 -->
                        <span class="time-slot">刚刚</span>
                        <Divider/>
                    </div>
                </div>
            </div>
            <div v-if="this.showNotices" class="notice-card">
                <div v-if="this.totalNotice.length == 0" class="empty">
                    <Divider/>
                    <font-awesome-icon :icon="['fas','envelope-open']" class="empty-icon"/>
                    <div class="empty-notes">没有新的通知</div>
                </div>
                <div v-else class="display-infoOrNotice">
                    <a @click="readAll('notice')" :class="markRead"><font-awesome-icon :icon="['fas','check-circle']" class="mark-icon"/>  全部标为已读</a>
                    <Divider/>
                    <div v-for="(item,index) in totalNotice" :key="index" :class="noticeContentClass">
                        <span style="cursor:pointer">{{item}}</span>
                        <Divider/>
                    </div>
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

export default {
    name:"Notice",
    components:{TopNavigation, Footer, Corner, },
    computed:{
        getUser(){
            return this.$store.state.token;
        },
    },
    mounted() {
        // this.personalActive = this.$store.state.personalActive       
    },
    data () {
        return {
            showNotices: false,
            /* info-提醒 notice-通知 */
            infoNotRead: 3,
            totalInfo: ['你关注的资源 天空的材质包 更新了！','你的软件 Axure 更新了，访问 这里 快速更新！',
            'JOE 评论了你 天空资源的贴图', '前沿技术部 回答了你的问题'],
            noticeNotRead: 0,
            totalNotice: ['软件领取通知：您已成功申领 ADOBE CS SUITE 软件，请下载','您已成功提交 ADOBE CS SUITE 软件申请 '],  
            markRead: 'mark-read',
            infoContentClass: 'info-content',
            noticeContentClass: 'info-content',
        }
    },
    methods:{
        showNotice(){
            this.showNotices = true
        },
        showInfo(){
            this.showNotices = false
        },
        readAll(type){
            this.$Modal.confirm({
                title: '是否确认要清空 未读消息？',
                onOk: () => {
                    this.markRead = 'mark-readed'
                    if(type == 'info'){
                        this.infoContentClass = 'info-content-readed'
                        this.infoNotRead = 0
                    }
                    else{
                        this.noticeContentClass = 'info-content-readed'
                        this.noticeNotRead = 0
                    }
                },
                onCancel: () => {
                    this.$Message.info('您已取消');
                }
            });
        }
    },
}
</script>
<style>
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
    left: 50px;
    top: 170px;
    margin-right: 30px;
    border-radius: 3px;
    background-color: #ffffff;
    color: black;
    z-index: 0;
}
.menu_left_part{
    display: inline-block;
    /* font-size: 16px; */
    margin-right: 50px;
}

.not-read{
    display: inline-block;
    width: 47px;
    height: 18px;
    border-radius: 9px;
    font-size: 11px;
    background-color: #1ebf73;
    color: white;
    text-align: center;
}
.notice-card{
    position: relative;
    font-size: 16px;
    width: 1160px;
    height: auto;
    min-height: 600px;
    margin-top: 30px; 
    /* left: 350px; */
    padding: 30px 28px 30px 28px;
    border-radius: 3px;
    background-color: #ffffff;
    overflow: auto;
}
.display-infoOrNotice{
    display: flex;
    flex-direction: column;
}
.mark-read{
    float: right;
    margin-left: 995px;
    font-size: 14px;
    color: #1ebf73;
}
.mark-readed{
    font-size: 14px;
    margin-left: 995px;
    color: #7f7f7f;
}
.mark-icon{
    width: 16px;
    height: 14px;
    font-size: 18px;
}
.time-slot{
    float: right;
    margin-left: 995px;
}
.info-content{
    font-size: 18px;
    font-weight: 600;
    color: black;
}
.info-content-readed{
    color: #7f7f7f;
    font-size: 18px;
    font-weight: 600;
}
.empty{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.empty-icon{
    font-size: 48px;
    margin-top: 120px;
    color: #7f7f7f;
}
.empty-notes{
    position: relative;
    font-size: 21px;
    font-weight: 600;
    letter-spacing: 1.31px;
    color: #7f7f7f;
    margin-top: 20px;
}

</style>