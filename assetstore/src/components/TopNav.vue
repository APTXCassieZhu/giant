<template>
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
                <router-link class="topnav-box-link-a" to="/home" active-class="active" exact>首页</router-link>
               
                <div class="topnav-box-link-a">
                    <Dropdown>
                        <a href="javascript:void(0)">资源
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list" class="topnav-dropdown">
                            <ul><DropdownItem>2D</DropdownItem></ul>
                            <ul><DropdownItem>3D</DropdownItem></ul>
                            <ul><DropdownItem>贴图与材质</DropdownItem></ul>
                            <ul><DropdownItem>模板</DropdownItem></ul>
                            <ul><DropdownItem>3D动画</DropdownItem></ul>
                            <ul><DropdownItem>GUI界面</DropdownItem></ul>
                            <ul><DropdownItem>特效</DropdownItem></ul>
                            <ul><DropdownItem>音效</DropdownItem></ul>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div class="topnav-box-link-a">
                    <Dropdown>
                        <a href="javascript:void(0)">工具<Icon type="ios-arrow-down"></Icon></a>
                        <DropdownMenu slot="list" class="topnav-dropdown">
                            <ul><DropdownItem>可视化脚本</DropdownItem></ul>
                            <ul><DropdownItem>地形</DropdownItem></ul>
                            <ul><DropdownItem>动画编辑器</DropdownItem></ul>
                            <ul><DropdownItem>粒子和效果</DropdownItem></ul>
                            <ul><DropdownItem>其他工具</DropdownItem></ul>
                            <ul><DropdownItem>AI</DropdownItem></ul>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <router-link class="topnav-box-link-a" to="/software" active-class="active" exact>软件</router-link>
                <router-link class="topnav-box-link-a" to="/knowledge" active-class="active" exact>知识</router-link>
                <router-link class="topnav-box-link-a" to="/Q&A" active-class="active" exact>问答</router-link>
            </div>
            
            <!--提交搜索内容-->
            <form action="" id="keyword-search-form" class="topnav-box-search">
                <Input size="large" class="topnav-box-search-input" id="keyword-search" type=search placeholder="输入关键词"/>
                <button type="submit"><Icon type="ios-search" size="36"></Icon></button>
            </form>
           
            <router-link to='/login' class="topnav-box-user">
                <Icon type="ios-contact" size="48" onclick="gologin()"/>
                <span class="topnav-tooltip">登录</span>
            </router-link>

            <router-link to='/login' class="topnav-box-user-login">
                <Tooltip content="登录" placement="top" style="position:fixed; z-index:1000;">
                    <Icon type="ios-contact" size="48"/>
                </Tooltip>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
   path: '/',
   redirect: '/home' 
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

.topnav-box{
    overflow: hidden;
    position: fixed;
    margin-top: 15px;
    width: 100%;
    height: 80px;
    color:black;
    /*column-count: 4;*/
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
    width: 50px;
    height: 50px;
    /*border-radius: 50%;*/
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

.topnav-box-search-input{
    float: left;
    text-align: left;
    width: 80%;
    height: 36px;
    margin: 0;
}

.topnav-box-search button{
    background-color: aliceblue;
    float: left;
    width: 20%;
    height: 36px;
    cursor: pointer;
}

.topnav-box-search button:hover{
    background-color: #6495ED;
    color: white;
    border-width: 3px;
}

.topnav-box-user{
    position: relative;
    width: 7%;
    float:right;
    align-content: center;
}



.topnav-box-link-a:hover, .topnav-box-user:hover{
    color: #6495ED;
    border-top: 5px solid #6495ED;
    cursor: pointer;
}

.topnav-box-link-a router-link.active{
    color: #BA55D3;
}

/*text-decoration: none;
    width: 12%;
    float: left;
    padding-right: 2%;
    color: black;
        
    border-right-color: grey;
    border-right-width: 2px;*/

.topnav-dropdown{
    font-size: 18px;
    position: fixed;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    background-color: rgba(255, 255, 255, 0.988);
    z-index: 100;
}

/*.topnav-dropdown ul{
    padding: 8px;
}

.topnav-dropdown ul:hover{
    background-color: black;
    color: white;
}*/

/*.topnav-dropdown-trigger:hover .topnav-dropdown-test{
    display: block;
}
.topnav-dropdown-test{
    display: none;
    font-size: 18px;
    position: fixed;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    background-color: rgba(255, 255, 255, 0.988);
    z-index: 100;
}

.topnav-dropdown-test ul{
    padding: 8px;
}

.topnav-dropdown-test ul:hover{
    background-color: black;
    color: white;
}*/

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

