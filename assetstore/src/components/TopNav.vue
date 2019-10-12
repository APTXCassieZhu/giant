<template>
<div>
    <div id="top-nav" class="topnav">
        <div class="topnav-box">
            <div class="topnav-box-menu">
                <Icon type="ios-menu" size="48"></Icon>
            </div>
            <div class="topnav-box-logo" >
                <img src="../assets/logo.png" style="width:50px; height: 50px;" alt="首页" @click="goPage('/')">
            </div>
            <span class="logo-text" @click="goPage('/')">GDRC</span>
            <!--不知道怎么清除之前div css-->
            <div class="topnav-box-image">
                <img src="../assets/logo.png" alt="logo">
            </div>
            
            <div class="topnav-box-link">
                <Search style="z-index: 1000;"></Search>
            </div>
            <div class="topnav-box-user">
                <Icon type="md-cloud-upload" size="36"/>
                <Icon type="md-notifications" size="36"/>
                <Icon type="md-settings" size="36"/>
                <span>&emsp; {{getUser}}</span>
                <Dropdown placement="bottom-start">
                    <a href="javascript:void(0)">
                        <Icon type="ios-contact" size="48" class="topnav-user"/>
                    </a>
                    <DropdownMenu slot="list" class="topnav-dropdown">
                        <ul><DropdownItem><router-link style="color:black;" to="/personal">个人中心</router-link></DropdownItem></ul>
                        <ul><DropdownItem><router-link style="color:black;" to="/personal">我的关注</router-link></DropdownItem></ul>
                        <ul><DropdownItem><router-link style="color:black;" to="/personal">修改资料</router-link></DropdownItem></ul>
                        <ul><DropdownItem><span style="color:black;" @click="logout()">退出登录</span></DropdownItem></ul>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div to='/login' class="topnav-box-user-login">
                <Tooltip content="个人中心" placement="top" style="position:fixed; z-index:1000;">
                    <Icon type="ios-contact" size="48"/>
                </Tooltip>
            </div>
        </div>
    </div>
    <Divider class="divide"/>
    <div class="submenu">
        <Menu mode="horizontal" :theme="light" :active-name="activenum" class="nav-menu">
            <MenuItem name="1" @click.native="goPage('/artFilter')">
                <Icon type="ios-paper" />
                美术类资源
            </MenuItem>
            <!--TODO menuitem 2 3的网页还没建，to的地址可能会改变-->
            <MenuItem name="2" @click.native="goPage('/toolFilter')">
                <Icon type="ios-construct" />
                研发工具
            </MenuItem>
            <MenuItem name="3" @click.native="goPage('/software')">
                <Icon type="ios-people" />
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
        }
    },
    computed:{
        getUser(){
            return this.$store.state.token;
        }
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
            this.$router.push(url)
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
    left: 2%;
    top: 7px;
    font-size: 25px;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    cursor: pointer;
    align-content: center;
}

.topnav-box-link {
    position: relative;
    float:left;
    left: 5%;
    top: 10px;
    width: 40%;
    height: 80px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: black;
    z-index:inherit;
}

.topnav-box-user{
    position: relative;
    width: 15%;
    float:right;
    align-content: center;
    color:black;
    z-index:inherit;
}

.topnav-user{
    color:black;
    z-index:inherit;
}

.topnav-user:hover{
    color: #6495ED;
    /*border-top: 5px solid #6495ED;*/
    cursor: pointer;
}

.topnav-dropdown{
    font-size: 18px;
    font-family: MicrosoftYaHei;
    position: fixed;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.988);
    z-index:inherit;
}

.topnav-dropdown router-link{
    font-size: 18px;
    font-family: MicrosoftYaHei;
    z-index:inherit;
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
    font-size: 14px;
    font-family: MicrosoftYaHei;
}
</style>

