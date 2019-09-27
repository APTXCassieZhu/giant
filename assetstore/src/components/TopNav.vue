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
                <router-link class="topnav-box-link-a" to="/home" exact-active-class="router-active">首页</router-link>
               
                <div class="topnav-box-link-a">
                    <Dropdown>
                        <a href="javascript:void(0)">资源
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list" class="topnav-dropdown">
                            <ul><DropdownItem><router-link to="/资源/2D">2D</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/资源/3D">3D</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/资源/贴图与材质">贴图与材质</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/资源/模板">模板</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/资源/3D动画">3D动画</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/资源/GUI界面">GUI界面</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/资源/特效">特效</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/资源/音效">音效</router-link></DropdownItem></ul>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="topnav-box-link-a">
                    <Dropdown>
                        <a href="javascript:void(0)">工具<Icon type="ios-arrow-down"></Icon></a>
                        <DropdownMenu slot="list" class="topnav-dropdown">
                            <ul><DropdownItem><router-link to="/工具/可视化脚本">可视化脚本</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/地形">地形</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/动画编辑器">动画编辑器</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/粒子和效果">粒子和效果</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/其他工具">其他工具</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/AI">AI</router-link></DropdownItem></ul>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <router-link class="topnav-box-link-a" to="/software" exact-active-class="router-active">软件</router-link>
                <router-link class="topnav-box-link-a" to="/knowledge" exact-active-class="router-active">知识</router-link>
                <router-link class="topnav-box-link-a" to="/Q&A" exact-active-class="router-active">问答</router-link>
            </div>
            
            <!--提交搜索内容-->
            <div class="topnav-box-search">
            </div>
           
            
            
            <div class="topnav-box-user">
                <span>欢迎回来，{{getUser}}</span>
                <Dropdown placement="bottom-start">
                    <a href="javascript:void(0)">
                        <Icon type="ios-contact" size="48"/>
                    </a>
                    <DropdownMenu slot="list" class="topnav-dropdown">
                        <ul><DropdownItem><router-link to="/personal">个人中心</router-link></DropdownItem></ul>
                        <ul><DropdownItem><router-link to="/personal">我的关注</router-link></DropdownItem></ul>
                        <ul><DropdownItem><router-link to="/personal">修改资料</router-link></DropdownItem></ul>
                        <ul><DropdownItem><span @click="logout()">退出登录</span></DropdownItem></ul>
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
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: "TopNavigation",
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
    border-width: 1px;  
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
    width: 60%;
    height: 80px;
    font-size: 18px;
    color: black;
}

.topnav-box-link-a{
    position: relative;
    text-decoration: none;
    width: 12%;
    float: left;
    padding-right: 2%;
    text-align:center;    
    color: black;
}

.topnav-box-link-a a{
    color: black;
}

.topnav-box-search{
    position: relative;
    width: 20%;
    float:left;
    font-size: 15px;
    top: 8.5px;
}

.topnav-box-user{
    position: relative;
    width: 10%;
    float:right;
    align-content: center;
    color:black;
}



.topnav-box-link-a:hover, .topnav-box-user Icon:hover{
    color: #6495ED;
    /*border-top: 5px solid #6495ED;*/
    cursor: pointer;
}

.topnav-box-link-a a:hover {
    color: #6495ED;
    cursor: pointer;
}

.topnav-box-link-a router-link-active{
    color: #BA55D3;
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

@media only screen and (max-width: 720px) {
    .topnav-box-image{
        display: block;
        position: relative;
        width: 80%;
        height: 55px;
        float: left;
    }

    .topnav-box-image img {
        width: 50px;
        height: 50px;
        /*border-radius: 50%;*/
        border-color: black;
        border-width: 0px;  
        border-style: solid;
        left: 0%;
        right: 50%;
        position: relative;
    }

    .topnav-box-user-login {
        display: block;
        width:10%;
        margin-right: auto;
        margin-left: 0px;
        position: relative;
        float: left;
    }

    .topnav-box-menu {
        width:10%;
        display: block;
        position: relative;
        margin-left: auto;
        margin-right: 0px;
        float: left;
    }

    .topnav-box-link, .topnav-box-search, .topnav-box-user, .topnav-box-logo{
        display: none;
    }
}

@media only screen and (max-width: 800px) {
    .topnav-box-logo {
        left: 2%;
    }

    .topnav-box-link {
        left: 10%;
    }
    
}

@media only screen and (max-width: 980px) {
    .topnav-box-logo {
        left: 3%;
    }
}

@media only screen and (max-width: 1080px) {
    .topnav-box-search input[type=search] {
        width:70%;
    }

    .topnav-box-user span{
        display: none;
    }
}

</style>

