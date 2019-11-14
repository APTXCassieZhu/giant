<template>
    <div style="background-color: #eff2f5">
        <TopNavigation style="position:relative; height: 140px;"></TopNavigation>
        <div class="middle-card-wrapper">
            <Menu active-name="1" class="leftside-menu" style="width:auto;min-width:281px;">
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
            <!-- 提醒 -->
            <div v-if="!this.showNotices && !this.showNotices" class="notice-card">
                <div v-if="this.totalInfo.length == 0" class="empty">
                    <Divider/>
                    <font-awesome-icon :icon="['fas','bell']" class="empty-icon"/>
                    <div class="empty-notes">没有新的提醒</div>
                </div>
                <div v-else class="display-infoOrNotice">
                    <a @click="readAll('info')" :class="markRead"><font-awesome-icon :icon="['fas','check-circle']" class="mark-icon"/>  全部标为已读</a>
                    <Divider/>
                    <div v-for="(item,index) in totalInfo" :key="index" :class="infoContentClass(item.view)">
                        <div class="shorthand-content">
                            <div v-if="item.targetType === 'starResourceUpgrade'" @click="goPage(`/resourceDetail/${item.resource.id}`,item)" class="font-container">
                                <div class="font-image">{{item.resource.name.charAt(0)}}</div>
                                <div class="font-content">
                                    你关注的资源<span :class="markGreen(item.view)"> {{item.resource.name}} </span>更新了！
                                </div>
                            </div>
                            <div v-else-if="item.targetType === 'starSoftwareUpgrade'" @click="goPage('/personal',item)" class="font-container">
                                <font-awesome-icon :icon="['fas', 'th-large']" class="font-icon"/>
                                <div class="font-content">
                                    你的软件 {{item.software.name}} 更新了, 访问<span :class="markGreen(item.view)"> 这里</span> 快速更新
                                </div>
                            </div>
                            <div v-else-if="item.targetType === 'replyComment'" @click="goPage(`/resourceDetail/${item.resource.id}/comment?cID=${item.commentId}`,item)" class="font-container">
                                <font-awesome-icon :icon="['fas', 'comments']" class="font-icon"/>
                                <div class="font-content">
                                    <span v-if="item.sourceUsers.length<=3">
                                        <span v-for="(value, n) in item.sourceUsers" :key="n">
                                            <span v-if="value.nickName">
                                                {{value.nickName}}, 
                                            </span>
                                            <span v-else>
                                                {{value.name}},
                                            </span>
                                        </span>  
                                    </span>
                                    <!-- 三人以上不显示人名，直接xx,xx,xx等 -->
                                    <span v-else>
                                        <span v-if="item.sourceUsers[0].nickName">
                                            {{item.sourceUsers[0].nickName}}, 
                                        </span>
                                        <span v-else>
                                            {{item.sourceUsers[0].name}}, 
                                        </span>
                                        <span v-if="item.sourceUsers[1].nickName">
                                            {{item.sourceUsers[1].nickName}}, 
                                        </span>
                                        <span v-else>
                                            {{item.sourceUsers[1].name}}, 
                                        </span>
                                        <span v-if="item.sourceUsers[2].nickName">
                                            {{item.sourceUsers[2].nickName}}, 
                                        </span>
                                        <span v-else>
                                            {{item.sourceUsers[2].name}}, 
                                        </span>
                                        等
                                    </span>
                                    回复了你的<span :class="markGreen(item.view)"> 评论 </span>
                                </div>
                            </div>
                            <div v-else-if="item.targetType === 'resourceCommented'"  @click="goPage(`/resourceDetail/${item.resource.id}/comment?cID=${item.commentId}`,item)" class="font-container">
                                <font-awesome-icon :icon="['fas', 'comments']" class="font-icon"/>
                                <div class="font-content">
                                    <span v-if="item.sourceUsers.length<=3">
                                        <span v-for="(user, i) in item.sourceUsers" :key="i">
                                            <span v-if="user.nickName">
                                                {{user.nickName}}, 
                                            </span>
                                            <span v-else>
                                                {{user.name}}, 
                                            </span>
                                        </span> 
                                    </span>
                                    <!-- 三人以上不显示人名，直接xx,xx,xx等 -->
                                    <span v-else>
                                        <span v-if="item.sourceUsers[0].nickName">
                                            {{item.sourceUsers[0].nickName}}, 
                                        </span>
                                        <span v-else>
                                            {{item.sourceUsers[0].name}}, 
                                        </span>
                                        <span v-if="item.sourceUsers[1].nickName">
                                            {{item.sourceUsers[1].nickName}}, 
                                        </span>
                                        <span v-else>
                                            {{item.sourceUsers[1].name}}, 
                                        </span>
                                        <span v-if="item.sourceUsers[2].nickName">
                                            {{item.sourceUsers[2].nickName}}, 
                                        </span>
                                        <span v-else>
                                            {{item.sourceUsers[2].name}}, 
                                        </span>
                                        等
                                    </span>
                                    评论了你的<span :class="markGreen(item.view)"> {{item.resource.name}} </span> 
                                </div>
                            </div>
                            <div v-else  @click="goPage(`/resourceDetail/${item.resource.id}`,item)" class="font-container">
                                <div class="font-image">{{item.resource.name.charAt(0)}}</div>
                                <div class="font-content">
                                    你关注的资源<span :class="markGreen(item.view)"> {{item.resource.name}} </span>被评论
                                </div>
                            </div>
                            <div class="time-slot">{{getTime(item.updatedAt)}}</div>
                        </div>
                        <Divider/>
                    </div>
                    <Button style="color:#1ebf73;width:150px;margin-left:43%" @click="addMoreInfo()" size="large">加载更多</Button>
                </div>
            </div>
            <!-- 通知 -->
            <div v-if="this.showNotices && !this.showNoticeDetail" class="notice-card">
                <div v-if="this.totalNotice.length == 0" class="empty">
                    <Divider/>
                    <font-awesome-icon :icon="['fas','envelope-open']" class="empty-icon"/>
                    <div class="empty-notes">没有新的通知</div>
                </div>
                <div v-else class="display-infoOrNotice">
                    <a @click="readAll('notice')" :class="markRead1"><font-awesome-icon :icon="['fas','check-circle']" class="mark-icon"/>  全部标为已读</a>
                    <Divider/>
                    <div v-for="(item,index) in totalNotice" :key="index" :class="noticeContentClass(item.view)">
                        <div class="shorthand-content" @click="showNoticeDetails(item)">
                            <div v-if="item.targetType === 'software'" class="font-container">
                                <font-awesome-icon :icon="['fas', 'th-large']" class="font-icon"/>
                                <div class="font-content">{{item.title}}</div>
                            </div>
                            <div class="time-slot">{{getTime(item.updatedAt)}}</div>
                        </div>
                        <Divider/>
                    </div>
                    <Button style="color:#1ebf73;width:150px;margin-left:43%" @click="addMoreNotice()" size="large">加载更多</Button>
                </div>
            </div>
            <!-- 系统通知的具体内容 -->
            <div v-if="this.showNoticeDetail" class="notice-card" style="z-index:10">
                <div class="shorthand-content notice-detail-head">
                    <a @click="showNotice()" class="back-btn"><font-awesome-icon :icon="['fas','chevron-left']" class="back-icon"/>返回</a>
                    <span>{{this.curNoticeItem.title}}</span>
                    <span>{{getTime(this.curNoticeItem.updatedAt)}}</span>
                </div>
                <Divider/>
                <div class="notice-detail-content" v-html="this.curNoticeItem.content">
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
        axios.get('/api/remind', {
            params: {
                page: this.infoPage,
                pageSize: this.infoPageSize
            }
        }).then(res=>{
            if(res.data.code === 0){
                this.infoNotRead = res.data.data.webCount
                this.totalInfo = res.data.data.list
            }else if(res.data.code === 400){
                alert('参数格式不正确')
            }
        })   
        axios.get('/api/bulletin', {
            params: {
                page: this.noticePage,
                pageSize: this.noticePageSize
            }
        }).then(res=>{
            if(res.data.code === 0){
                this.noticeNotRead = res.data.data.webCount
                this.totalNotice = res.data.data.list
            }else if(res.data.code === 400){
                alert('参数格式不正确')
            }
        })  
        // 判断是否时由导航栏的通知跳转过来的
        // debugger

       // console.log(this.$store.state)
        if(this.$store.state.curNotice){
            let o = JSON.parse(this.$store.state.curNotice) 
            if(o.title != null){
                console.log('lalal')
                this.showNotices = true
                this.showNoticeDetail = true
                this.curNoticeItem = o
                this.$store.commit('NOTICE_READED', o)
            }

        }
    },
    data () {
        return {
            infoPage: 1,
            infoPageSize: 20,               // 加载更多时每次从后端拿pagesize个数的新信息
            noticePage: 1,
            noticePageSize: 20,
            showNotices: false,             // 展示通知还是提醒
            /* info-提醒 notice-通知 */
            infoNotRead: 3,
            totalInfo: [],
            noticeNotRead: 0,
            totalNotice: [],  
            markRead: 'mark-read',          // 提醒的全部已读button
            markRead1: 'mark-read',         // 通知的全部已读button
            showNoticeDetail: false,        // 是否展示具体的通知内容
            curNoticeItem: {},              // 展示的通知
        }
    },
    methods:{
        goPage(url,item){
            /* 跳转之前告知后端已读 */
            axios.put(`/api/remind/${item.id}/view`).then(res=>{
                if(res.data.code === 0){
                }else if(res.data.code === 400){
                    alert('参数格式不正确')
                }
            })   
            if(this.$route.path===url){
                location.reload()
            }else if(this.$route.path==='/personal'){
                this.$store.commit('PERSONAL_ACTIVE', "name2")
                this.$router.push(url)
            }else{
                this.$router.push(url)
            }
        },
        showNotice(){
            this.showNotices = true
            this.showNoticeDetail = false
        },
        showInfo(){
            this.showNotices = false
            this.showNoticeDetail = false
        },
        readAll(type){
            this.$Modal.confirm({
                title: '是否确认要清空 未读消息？',
                onOk: () => {
                    if(type == 'info'){
                        this.markRead = 'mark-readed'
                        this.infoNotRead = 0
                        for(var i=0; i<this.totalInfo.length; i++){
                            this.totalInfo[i].view = true
                        }
                        /* 设置全部已读 */
                        axios.put('/api/remind/view').then(res=>{
                            if(res.data.code === 0){
                            }else if(res.data.code === 400){
                                alert('参数格式不正确')
                            }
                        })   
                    }
                    else{
                        this.markRead1 = 'mark-readed'
                        this.noticeNotRead = 0
                        for(var i=0; i<this.totalNotice.length; i++){
                            this.totalNotice[i].view = true
                        }
                        /* 设置全部已读 */
                        axios.put('/api/bulletin/view').then(res=>{
                            if(res.data.code === 0){
                            }else if(res.data.code === 400){
                                alert('参数格式不正确')
                            }
                        })   
                    }
                },
                onCancel: () => {
                    this.$Message.info('您已取消');
                }
            });
        },
        infoContentClass(view){
            if(view){
                return 'info-content-readed'
            }else{
                return 'info-content'
            }
        },
        noticeContentClass(view){
            if(view){
                return 'info-content-readed'
            }else{
                return 'info-content'
            }
        },
        markGreen(view){
            if(view){
                return 'mark-grey'
            }else{
                return 'mark-green'
            }
        },
        getTime(t){
            var begin = new Date(t)
            var end = new Date()
            var dateDiff = end.getTime() - begin.getTime();
            //时间差的毫秒数
            var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
            var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000))//计算出小时数
            //计算相差分钟数
            var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
            //计算相差秒数
            var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
            var seconds=Math.round(leave3/1000)
            // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
            // 1、 刚刚（10分钟内）
            // 2、 ? 分钟以前（10分钟以上60分钟内）
            // 3、 ? 小时以前（60分钟以上24小时内）
            // 4、 昨天（24小时以上48小时内）
            // 5、 ? 天前（48小时以上）
            if(dayDiff >= 2){
                return dayDiff+"天前"
            }else if(dayDiff == 1){
                return "昨天"
            }else if(hours >= 1 && hours <= 23){
                return hours+"小时以前"
            }else if(minutes >= 11 && minutes <= 59){
                return minutes+"分钟以前"
            }else{
                return "刚刚"
            }
        },
        addMoreInfo(){
            axios.get('/api/remind', {
                params: {
                    page: this.infoPage,
                    pageSize: this.infoPageSize
                }
            }).then(res=>{
                if(res.data.code === 0){
                    this.infoNotRead = res.data.data.webCount
                    this.totalInfo = this.totalInfo.concat(res.data.data.list)
                }else if(res.data.code === 400){
                    alert('参数格式不正确')
                }
            })   
        },
        addMoreNotice(){
            axios.get('/api/bulletin', {
                params: {
                    page: this.noticePage,
                    pageSize: this.noticePageSize
                }
            }).then(res=>{
                if(res.data.code === 0){
                    this.noticeNotRead = res.data.data.webCount
                    this.totalNotice = this.totalNotice.concat(res.data.data.list)
                }else if(res.data.code === 400){
                    alert('参数格式不正确')
                }
            })   
        },
        /* 点击通知，直接在消息中心页面查看细节 */ 
        showNoticeDetails(item){
            this.showNoticeDetail = true
            this.curNoticeItem = item
            /* 告知后端通知已读 */
            axios.put(`/api/bulletin/${item.id}/view`).then(res=>{
                if(res.data.code === 0){
                }else if(res.data.code === 400){
                    alert('参数格式不正确')
                }
            })  
        },
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
    text-align: center;
}
.display-infoOrNotice{
    display: flex;
    flex-direction: column;
    text-align:center;
}
.shorthand-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.mark-read{
    float: right;
    margin-left: 995px;
    font-size: 14px;
    color: #1ebf73;
}
.mark-green{
    color: #1ebf73;
}
.mark-readed{
    font-size: 14px;
    margin-left: 995px;
    color: #7f7f7f;
}
.mark-grey{
    color: #7f7f7f;
}
.mark-icon{
    width: 16px;
    height: 14px;
    font-size: 18px;
}
.font-container{
    display: flex;
    align-items: center;
}
.font-image{
    width: 41px;
    height: 41px;
    border-radius: 3px;
    background-color: #d8d8d8;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1.13px;
    color: #ffffff;
    display: inline-block;
    text-align: center;
    line-height: 41px;
    margin-right: 30px;
}
.font-icon{
    width: 36px;
    height: 36px;
    font-size: 36px;
    color: #d8d8d8;
    display: inline-block;
    text-align: center;
    line-height: 36px;
    margin-right: 30px;
    position: relative;
    /* top: 10px; */
}
.font-content{
    display:inline-block; 
    text-align: left;
    /* height:32px; */
    width:900px;
}
.time-slot{
    float: right;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.13px;
}
.info-content{
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    color: black;
}
.info-content-readed{
    cursor: pointer;
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
.back-btn{
    cursor: pointer;
    color: #7f7f7f;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.13px;
    color: #7f7f7f;
}
.back-icon{
    font-size: 16px;
    font-weight: normal;
    letter-spacing: normal;
    color: #7f7f7f;
    margin-right: 10px;
}
.notice-detail-head{
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.13px;
    color: black;
}
.notice-detail-content{
    text-align:left;
    padding: 80px 141px 140px 260px;
}
</style>