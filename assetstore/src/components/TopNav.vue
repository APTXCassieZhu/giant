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
                <Icon class="topnav-user" type="md-cloud-upload" size="29"/>
                <Icon class="topnav-user" @click="goPage('notice')" type="md-notifications" size="29"/>
                <Icon class="topnav-user" @click="goPage('editSetting')" type="md-settings" size="29"/>
                <Dropdown placement="bottom-start">
                    <a href="javascript:void(0)">
                        <img v-if="profile" class="topnav-user-image" :src="profile" @click="goLike('personal')" alt="avatar">
                        <div v-else class="topnav-user-image" @click="goLike('personal')">{{userName.charAt(0)}}</div>
                    </a>
                    <DropdownMenu slot="list" class="topnav-dropdown" style="margin-left:-30px;">
                        <ul><DropdownItem><span class="user-box-link-a" @click="goLike('personal')">个人中心</span></DropdownItem></ul>
                        <ul><DropdownItem><span class="user-box-link-a" @click="goLike('like')">我的关注</span></DropdownItem></ul>
                        <ul><DropdownItem><router-link class="user-box-link-a" to="/editSetting">修改资料</router-link></DropdownItem></ul>
                        <ul><DropdownItem><span class="user-box-link-a" @click="logout()">退出登录</span></DropdownItem></ul>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div to='/login' class="topnav-box-user-login">
                <Tooltip content="个人中心" placement="top" style="position:fixed; z-index:1000;">
                    <div class="topnav-user" @click="goLike('personal')">{{userName.charAt(0)}}</div>
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
        }
    },
    computed:{
    },
    mounted(){
        axios.get('/user/describe').then((res)=>{
            if(res.data.code == 0){
                this.$store.commit('ADD_COUNT', res.headers.Authorization)
                this.profile = res.data.data.profilePic
                this.userName = res.data.data.name
            }
            else if(res.data.code == 404){
                alert('user not found')
            }
        }, (res)=>{
            // 请求失败
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
            }
            this.$router.push('/personal')
        },
    }   
}
</script>

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
    width: 13%;
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
}
.topnav-user-image:hover{
    color: #1ebf73;
}

.topnav-user,.user-box-link-a{
    color:black;
    z-index:inherit;
    margin-right: 30px;
}

.topnav-user:hover, .user-box-link-a:hover{
    color: #1ebf73;
    /*border-top: 5px solid #6495ED;*/
    cursor: pointer;
}

.topnav-dropdown{
    color: black;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    position: fixed;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    background-color: rgba(255, 255, 255, 0.988);
    border-radius: 4px;
    z-index: 100;
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

