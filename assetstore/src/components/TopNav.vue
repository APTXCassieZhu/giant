<template>
<div>
    <div id="top-nav" class="topnav">
        <div class="topnav-box">
            <div class="topnav-box-menu">
                <Icon type="ios-menu" size="48"></Icon>
            </div>
            <div class="topnav-box-logo" >
                <img src="../assets/logo.png" style="width:29px; height: 33px;" alt="首页" @click="goPage('/home')">
            </div>
            <span class="logo-text" @click="goPage('/home')">GDRC</span>
            <!--不知道怎么清除之前div css-->
            <div class="topnav-box-image">
                <img src="../assets/logo.png" alt="logo">
            </div>
            
            <div class="topnav-box-link">
                <Search style="z-index: 1000;"></Search>
            </div>
            <div class="topnav-box-user">
                <Icon class="topnav-user" type="md-cloud-upload" size="29" @click="goPage('/upFile')"/>
                <Dropdown placement="bottom-start">
                    <a href="javascript:void(0)">
                        <Badge :count="totalUnreadNum" overflow-count="99">
                            <Icon class="topnav-user" @click="goPage('/notice')" type="md-notifications" size="29"/>
                        </Badge>
                    </a>
                    <DropdownMenu slot="list" class="topnav-dropdown-notice" style="margin-left: -250px;">
                        <Tabs value="name1" style="width:408px;">
                            <TabPane label="提醒" icon="ios-notifications" name="name1">
                                <div v-if="this.infoDropdownCount === 0" style="text-align:center;margin:auto">
                                    <font-awesome-icon :icon="['fas','bell']" class="empty-icon"/>
                                    <div class="empty-notes">没有新的提醒</div>
                                    <ul style="position:absolute;" class="ignore-all-ul">
                                        <Button class="ignore-all-btn-disabled" disabled>忽略全部</Button>
                                        <Button class="ignore-all-btn" @click="goPage('/notice')">查看更多</Button>
                                    </ul>
                                </div>
                                <div v-else>
                                    <div v-for="(item,index) in totalUnreadInfo" :key="index" class="notice-content">
                                        <div v-if="!item.ignore">
                                            <div class="shorthand-content">
                                                <div v-if="item.targetType === 'starResourceUpgrade'" class="jump"  @click="goPage(`/resourceDetail/${item.resource.id}`)">
                                                    <div class="font-image">{{item.resource.name.charAt(0)}}</div>
                                                    <div class="font-content">
                                                        你关注的资源<span class="mark-green"> {{item.resource.name}} </span>更新了！
                                                        <div class="time-slot">{{getTime(item.updatedAt)}}</div>
                                                    </div>
                                                </div>
                                                <div v-else-if="item.targetType === 'starSoftwareUpgrade'" class="jump" @click="goLike('software')">
                                                    <font-awesome-icon :icon="['fas', 'th-large']" class="font-icon"/>
                                                    <div class="font-content">
                                                        你的软件 {{item.software.name}} 更新了, 访问<span class="mark-green"> 这里</span> 快速更新
                                                        <div class="time-slot">{{getTime(item.updatedAt)}}</div>
                                                    </div>
                                                </div>
                                                <div v-else-if="item.targetType === 'replyComment'" class="jump"  @click="goPage(`/resourceDetail/${item.resource.id}/comment?cID=${item.commentId}`)">
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
                                                        回复了你的<span class="mark-green"> 评论 </span>
                                                        <div class="time-slot">{{getTime(item.updatedAt)}}</div>
                                                    </div>
                                                </div>
                                                <div v-else-if="item.targetType === 'resourceCommented'" class="jump"  @click="goPage(`/resourceDetail/${item.resource.id}/comment?cID=${item.commentId}`)">
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
                                                        评论了你的<span class="mark-green"> {{item.resource.name}} </span> 
                                                        <div class="time-slot">{{getTime(item.updatedAt)}}</div>
                                                        <div class="time-slot">{{getTime(item.updatedAt)}}</div>
                                                    </div>
                                                </div>
                                                <div v-else class="jump"  @click="goPage(`/resourceDetail/${item.resource.id}`)">
                                                    <div class="font-image">{{item.resource.name.charAt(0)}}</div>
                                                    <div class="font-content">
                                                        你关注的资源<span class="mark-green"> {{item.resource.name}} </span>被评论
                                                        <div class="time-slot">{{getTime(item.updatedAt)}}</div>
                                                    </div>
                                                </div>
                                                <font-awesome-icon :icon="['fas','times']" class="close-icon-btn" @click="deleteUnread(item)"/>
                                            </div>
                                        </div>
                                    </div>
                                    <ul style="position:absolute;" class="ignore-all-ul"><Button class="ignore-all-btn" @click="ignoreAllInfo()">忽略全部</Button>
                                    <Button class="ignore-all-btn" @click="goPage('/notice')">查看更多</Button></ul>
                                </div>
                            </TabPane>
                            <TabPane label="通知" icon="ios-megaphone" name="name2" >
                                <div v-if="this.noticeDropdownCount === 0" style="text-align:center">
                                    <font-awesome-icon :icon="['fas','envelope-open']" class="empty-icon"/>
                                    <div class="empty-notes">没有新的通知</div>
                                    <ul style="position:absolute;" class="ignore-all-ul"><Button class="ignore-all-btn-disabled" disabled>忽略全部</Button>
                                    <Button class="ignore-all-btn" @click="goPage('/notice')">查看更多</Button></ul>
                                </div>
                                <div v-else>
                                    <div v-for="(item,index) in totalUnreadNotice" :key="index" class="notice-content">
                                        <p style="cursor:pointer;padding: 0px 30px;">{{item}}</p>
                                        <font-awesome-icon :icon="['fas','times']" class="close-icon-btn1" @click="deleteUnread(item)"/>
                                        <Divider/>
                                    </div>
                                    <ul style="position:absolute;" class="ignore-all-ul" >
                                        <Button class="ignore-all-btn" @click="ignoreAllNotice()">忽略全部</Button>
                                        <Button class="ignore-all-btn" @click="goPage('/notice')">查看更多</Button>
                                    </ul>
                                </div>
                            </TabPane>
                        </Tabs>
                    </DropdownMenu>
                </Dropdown>
                <Icon class="topnav-user" @click="goPage('/editSetting')" type="md-settings" size="29"/>
                <Dropdown placement="bottom-start">
                    <a href="javascript:void(0)">
                        <img v-if="profile" class="topnav-user-image" :src="profile" @click="goLike('personal')" alt="avatar">
                        <div v-else class="topnav-user-image" @click="goLike('personal')">{{getUser.charAt(0)}}</div>
                    </a>
                    <DropdownMenu slot="list" class="topnav-dropdown" >
                        <DropdownItem><span class="user-box-link-a" @click="goLike('personal')">个人中心</span></DropdownItem>
                        <DropdownItem><span class="user-box-link-a" @click="goLike('like')">我的关注</span></DropdownItem>
                        <DropdownItem><router-link class="user-box-link-a" to="/editSetting">修改资料</router-link></DropdownItem>
                        <DropdownItem><span class="user-box-link-a" @click="logout()">退出登录</span></DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div to='/login' class="topnav-box-user-login">
                <Tooltip content="个人中心" placement="top" style="position:fixed; z-index:1000;">
                    <div class="topnav-user" @click="goLike('personal')">{{getUser.charAt(0)}}</div>
                </Tooltip>
            </div>
        </div>
    </div>
    <Divider class="divide"/>
    <div class="submenu">
        <Menu mode="horizontal" :active-name="activenum" class="nav-menu">
            <MenuItem name="1" @click.native="goPage('/artFilter')">
                美术类资源
            </MenuItem>
            <MenuItem name="2" @click.native="goPage('/toolFilter')">
                研发工具
            </MenuItem>
            <MenuItem name="3" @click.native="goPage('/software')">
                常用软件
            </MenuItem>
        </Menu>
    </div>
</div>
</template>

<script>
import Search from '../components/Search.vue'
export default {
    name: "TopNavigation",
    components: {Search},
    data(){
        return{
            activenum: 0,
            profile: null,
            userName: '神',
            totalUnreadNum: 100,
            infoDropdownCount: 0,
            noticeDropdownCount: 2,
            totalUnreadInfo: [],
            totalUnreadNotice: ['软件领取通知：您已成功申领 ADOBE CS SUITE 软件，请下载','您已成功提交 ADOBE CS SUITE 软件申请 '],  
        }
    },
    computed:{
        getUser(){ 
            let o = JSON.parse(this.$store.state.user)
            this.profile = o.profilePic
            if(o.nickName == null){
                return o.name
            }else{
                return o.nickName
            }
        }
    },
    mounted(){
        axios.get('/api/remind', {
            params: {
                page: 1,
                pageSize: 5
            }
        }).then(res=>{
            if(res.data.code === 0){
                this.totalUnreadNum = res.data.data.dropdownCount + this.totalUnreadNotice.length
                this.totalUnreadInfo = res.data.data.list
                this.infoDropdownCount = res.data.data.dropdownCount
            }else if(res.data.code === 400){
                alert('参数格式不正确')
            }
        })
    },
    methods:{
        logout(){
            this.$store.commit('REMOVE_COUNT', this.$store.state.token);
            this.$router.push('/login')
        },
        goPage(url){
            if(url === '/artFilter'){
                this.activenum = 1
                this.$store.commit('NOW_ACTIVE', this.activenum)
            }else if(url === '/toolFilter'){
                this.activenum = 2
                this.$store.commit('NOW_ACTIVE', this.activenum)
            }else if(url === '/software'){
                this.activenum = 3
                this.$store.commit('NOW_ACTIVE', this.activenum)
            }
            if(this.$route.path===url){
                location.reload()
            }else{
                this.$router.push(url)
            }
        },
        goLike(type){
            if(type === 'personal'){
                this.$store.commit('PERSONAL_ACTIVE', "name1")
            }else if(type === 'like'){
                this.$store.commit('PERSONAL_ACTIVE', "name3")
            }else if(type === 'software'){
                this.$store.commit('PERSONAL_ACTIVE', "name2")
            }
            this.$router.push('/personal')
        },
        mircophone(){
            // let $parent = document.querySelectorAll('#top-nav .ivu-tabs-tab')[1]

            // let $span = document.createElement('span')
            // $span.className = 'iconX-bullhorn-solid'
            // $parent.appendChild($parent)
        },
        deleteUnread(item){
            for(var i = 0; i < this.totalUnreadInfo.length; i++) {
                if(this.totalUnreadInfo[i] == item) {
                    console.log("delete info")
                    this.totalUnreadInfo.splice(i, 1);
                    this.totalUnreadNum --
                    this.infoDropdownCount --
                    axios.put(`/api/remind/${item.id}/ignore`).then(res=>{
                        if(res.data.code === 0){
                            
                        }else if(res.data.code === 400){
                            alert('参数格式不正确')
                        }
                    })
                    break
                }
            }
            for(var i = 0; i < this.totalUnreadNotice.length; i++) {
                if(this.totalUnreadNotice[i] == item) {
                    console.log('delete notice')
                    this.totalUnreadNotice.splice(i, 1);
                    this.totalUnreadNum --
                    this.noticeDropdownCount --
                    break
                }
            }
            /*TODO axios put*/
        },
        ignoreAllInfo(){
            this.totalUnreadNum -= this.infoDropdownCount
            /*TODO 忽略全部 */
            axios.put(`/api/remind/ignore`).then(res=>{
                if(res.data.code === 0){
                    
                }else if(res.data.code === 400){
                    alert('参数格式不正确')
                }
            })
            this.infoDropdownCount = 0
            this.totalUnreadInfo = [];
        },
        ignoreAllNotice(){
            this.totalUnreadNum -= this.noticeDropdownCount
            this.noticeDropdownCount = 0
            this.totalUnreadNotice = [];
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
            console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
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
    }   
}
</script>
<style>
.topnav-dropdown-notice > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container
 > .ivu-tabs-nav-wrap > .ivu-tabs-nav-scroll > .ivu-tabs-nav > .ivu-tabs-tab {
    padding: 8px 66px;
    margin-right: 3px;
    margin-left: 3px;
 }
 /* .topnav-dropdown-notice > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container
 > .ivu-tabs-nav-wrap > .ivu-tabs-nav-scroll > .ivu-tabs-nav > .ivu-tabs-tab {
    width: 20px;
    height: 20px;
 } */
 .topnav-dropdown-notice > .ivu-tabs > .ivu-tabs-content{
    position: relative;
 }
 .topnav-dropdown-notice > .ivu-tabs > .ivu-tabs-content > .ivu-tabs-tabpane{
    box-sizing: border-box;
    padding-bottom: 62px;
    position: relative;
 }
.topnav-box-user > .ivu-dropdown > .ivu-select-dropdown > .ivu-dropdown-menu > .ivu-tabs > .ivu-tabs-bar{
    margin-bottom: 0px;
}
.topnav-box-user > .ivu-dropdown > .ivu-select-dropdown > .ivu-dropdown-menu > .ivu-tabs > .ivu-tabs-bar > .ivu-tabs-nav-container{
    font-size: 18px;
}
</style>
<style scoped>
.topnav {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 80px;
    margin: 0;
    padding: 0;
    border-color: grey;
    background-color: #ffffff;
    z-index: 100;
    font-family: MicrosoftYaHei;
}

.topnav-box {
    overflow: hidden;
    position: fixed;
    margin-top: 15px;
    width: 100%;
    height: 80px;
    color:black;
    font-family: MicrosoftYaHei;
    z-index:inherit;
}

.topnav-box router-link{
    color: black;
    z-index:inherit;
    font-family: MicrosoftYaHei;
}

/*only show when the screen is small*/
.topnav-box-menu, .topnav-box-user-login, .topnav-box-image {
    display: none;
}

.topnav-box-logo{
    position: relative;
    cursor: pointer;
    width: 5%;
    left: 4%;
    top: 10px;
    float:left;
    z-index:inherit;
}

.topnav-box-logo img {
    width: 70px;
    height: 50px;
    border-radius: 5%;
    border-color: black;
    border-width: 0px;  
    border-style: solid;
    align-content: center;
    z-index:inherit;
}

.logo-text{
    position: relative;
    float:left;
    left: 20px;
    top: 11px;
    text-align: center;
    font-size: 22px;
    font-family: MicrosoftYaHeiHeavy;
    font-weight: bold;
    cursor: pointer;
    width: 62px;
    height: 30px;
    font-weight: 900;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
    z-index:inherit;
    color: #2f2f2f;
}

.topnav-box-link {
    position: relative;
    float:left;
    left: 5%;
    top: 5px;
    width: 30%;
    min-width: 400px;
    height: 80px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: black;
    z-index:inherit;
}

.topnav-box-user{
    position: relative;
    width:15%;
    min-width: 240px;
    top: 10px;
    float:right;
    align-content: center;
    color:black;
    z-index:inherit;
}

.topnav-user-image{
    position: relative;
    top: -2px;
    width: 30px;
    height: 30PX;
    color:rgba(0, 0, 0, 0.5);
    background-color: #e8f8f0;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    margin-left:30px;
}
.topnav-user-image:hover{
    color: #1ebf73;
}

.topnav-user{
    color:black;
    z-index:inherit;
    margin-left: 30px;
}
.user-box-link-a{
    color:black;
    z-index:inherit;
    text-align: center;
    margin-left:5px;
    /* margin-right: 30px; */
}
.topnav-user:hover, .user-box-link-a:hover{
    color: #1ebf73;
    /*border-top: 5px solid #6495ED;*/
    cursor: pointer;
}
.notice-content{
    color: black;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
}
.empty-icon{
    font-size: 48px;
    margin-top: 50px;
    color: #d8d8d8;
}
.empty-notes{
    position: relative;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.31px;
    color: #d8d8d8;
    margin-top: 20px;
    margin-bottom: 40px;
}
.shorthand-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 0px;
}
.shorthand-content:hover{
    background-color: #e8f8f0;
}
.ignore-all-ul{
    position: absolute;
    bottom:0;
    left:0;
    display: flex;
}
.ignore-all-btn{
    border-radius: 0px;
    font-size: 18px;
    letter-spacing: 1.13px;
    color: #8a8a8a;
    width: 204px;
    height: 62px;
}
.ignore-all-btn:hover{
    color: #1ebf73;
}
.ignore-all-btn-disabled{
    border: solid 1px #e5e5e5;
    font-size: 16px;
    letter-spacing: 1px;
    color: #d8d8d8;
    width: 204px;
    height: 62px;
}
.close-icon-btn{
    /* position: absolute;
    margin-top: -20px;*/
    margin-right: 20px; 
    /* float: right; */
    cursor: pointer;
    color: #7f7f7f;
}
.close-icon-btn1{
    position: absolute;
    margin-top: -20px;
    left: 380px;
    float: right;
    cursor: pointer;
    color: #7f7f7f;
}
.close-icon-btn:hover,.close-icon-btn1:hover{
    color: red;
}
.topnav-dropdown, .topnav-dropdown-notice{
    color: black;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    position: fixed;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    background-color: rgba(255, 255, 255, 0.988);
    border-radius: 4px;
    z-index: 100;
}
.topnav-dropdown-notice{
    min-height: 284px;
    max-height: 900px;
}
.mark-green{
    color: #1ebf73;
}
.time-slot{
    font-size: 12px;
    letter-spacing: 0.75px;
    color: #7f7f7f;
}
.jump{
    cursor: pointer;
    display: flex;
    align-items: center;
}

.font-image{
    width: 36px;
    height: 36px;
    border-radius: 3px;
    background-color: #d8d8d8;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1.13px;
    color: #ffffff;
    display: inline-block;
    text-align: center;
    line-height: 36px;
    margin-right: 10px;
    margin-left: 20px;
    cursor: pointer;
}
.font-icon{
    width: 36px;
    height: 36px;
    font-size: 36px;
    color: #d8d8d8;
    display: inline-block;
    text-align: center;
    line-height: 36px;
    margin-right: 10px;
    margin-left: 20px;
    position: relative;
    /* top: 10px; */
    cursor: pointer;
}
.font-content{
    display:inline-block; 
    text-align: left;
    /* height:32px; */
    width:300px;
}
.divide{
    position: fixed;
    top: 80px;
    margin: 0px 0px; 
    z-index: 20; 
    color: gray;
}
.submenu{
    border-top:1px, solid, #6495ED;
    background-color:#ffffff;
    width: 100%;
    overflow: hidden;
    position: fixed;
    font-family: MicrosoftYaHei;
    height: 60px;
    top: 80px;
    z-index: 10;
    box-shadow: 0 1px 5px 0 rgba(141, 141, 141, 0.5)
}
.nav-menu{
    float: right;
    width: 98%;
    background-color:#ffffff;
    height: 60px;
    line-height: 60px;
    display: block;
    margin: 0;
    padding: 0;
    outline: 0;
    left: 18px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
}
</style>

