<template>
<div>
    <div id="top-nav" class="topnav">
        <div class="topnav-box">
            <div class="topnav-box-menu">
                <Icon type="ios-menu" size="48"></Icon>
            </div>
            <div class="topnav-box-logo">
                <img src="../assets/logo.png" alt="logo">
            </div>

            <!--不知道怎么清除之前div css-->
            <div class="topnav-box-image">
                <img src="../assets/logo.png" alt="logo">
            </div>
            
            <div class="topnav-box-link">
                <Search></Search>
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
    <Divider style="margin: 0px 0px"/>
    <div class="submenu">
        <Menu mode="horizontal" :theme="light" active-name="1" class="nav-menu">
            <MenuItem name="1">
                <Icon type="ios-paper" />
                美术类资源
            </MenuItem>
            <MenuItem name="2">
                <Icon type="ios-construct" />
                研发工具
            </MenuItem>
            <MenuItem name="3">
                <Icon type="ios-people" />
                常用软件
            </MenuItem>
        </Menu>
        <br>
    </div>
</div>
</template>

<script>
import Search from '../components/Search.vue'
export default {
    name: "TopNavigation",
    components: {Search},
    computed:{
        getUser(){
            return this.$store.state.token;
        }
    },
    methods:{
        logout(){
            this.$store.commit('REMOVE_COUNT', this.$store.state.token);
            this.$router.push('/login')
        }
    }   
}
</script>

<style scoped>

.topnav {
    overflow: hidden;
    width: 100%;
    height: 80px;
    margin: 0;
    padding: 0;
    border-color: grey;
    background-color: aliceblue;
    border-bottom: 5px, solid, #6495ED;

}

.topnav-box {
    overflow: hidden;
    position: fixed;
    margin-top: 15px;
    width: 100%;
    height: 80px;
    color:black;
}

.topnav-box router-link{
    color: black;
}

/*only show when the screen is small*/
.topnav-box-menu, .topnav-box-user-login, .topnav-box-image {
    display: none;
}

.topnav-box-logo{
    position: relative;
    width: 5%;
    left: 4%;
    float:left;
}

.topnav-box-logo img {
    width: 70px;
    height: 50px;
    border-radius: 5%;
    border-color: black;
    border-width: 0px;  
    border-style: solid;
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
    color: black;
    z-index: 10000;
}

.topnav-box-user{
    position: relative;
    width: 15%;
    float:right;
    align-content: center;
    color:black;
}

.topnav-user{
    color:black;
}

.topnav-user:hover{
    color: #6495ED;
    /*border-top: 5px solid #6495ED;*/
    cursor: pointer;
}

.topnav-dropdown{
    font-size: 18px;
    position: fixed;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    background-color: rgba(255, 255, 255, 0.988);
    z-index: 100;
}

.topnav-dropdown router-link{
    font-size: 18px;
}

.submenu{
    border-top:1px, solid, #6495ED;
    background-color:aliceblue;
    width: 100%;
    position: relative;
    height: 60px;
    z-index: -1;
}
.nav-menu{
    z-index:-1;
    float: right;
    width: 98%;
    background-color:aliceblue;
}
</style>

