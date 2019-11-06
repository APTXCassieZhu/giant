<template>
    <div id="top-nav" class="topnav">
        <div class="topnav-box">
            <div class="topnav-box-menu">
                <Icon type="ios-menu" size="48"></Icon>
            </div>
            <div class="topnav-box-logo">
                <img src="../assets/logo.png" style="width:29px; height: 33px;" alt="logo" @click="goPage('/home')">      
            </div>
            <span class="logo-text" @click="goPage('/home')">GDRC</span>
            <!--不知道怎么清除之前div css-->
            <div class="topnav-box-image">
                <img src="../assets/logo.png" alt="logo">
            </div>
            
            <div class="topnav-box-link">               
                <div class="topnav-box-link-a">
                    <Dropdown placement="bottom-start">
                        <a href="javascript:void(0)">美术类资源
                            <Icon size="28" type="md-arrow-dropdown" style="position:relative; top: 3px;"></Icon>
                        </a>
                        <DropdownMenu slot="list" class="topnav-dropdown">
                            <!--TODO 超链接导向的网页还没建-->
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
                    <Dropdown placement="bottom-start">
                        <a href="javascript:void(0)">研发类工具
                            <Icon size="28" type="md-arrow-dropdown" style="position:relative; top: 3px;"></Icon>
                        </a>
                        <DropdownMenu slot="list" class="topnav-dropdown">
                            <!--TODO 超链接导向的网页还没建-->
                            <ul><DropdownItem><router-link to="/工具/可视化脚本">可视化脚本</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/地形">地形</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/动画编辑器">动画编辑器</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/粒子和效果">粒子和效果</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/其他工具">其他工具</router-link></DropdownItem></ul>
                            <ul><DropdownItem><router-link to="/工具/AI">AI</router-link></DropdownItem></ul>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <router-link class="topnav-box-link-a"  style="bottom:1px;" to="/software" exact-active-class="router-active">常用软件</router-link>
            </div>
            
            <!--提交搜索内容-->
            <div class="topnav-box-search">
            </div>
           
            <div class="topnav-box-user">
                <span class="welcome">欢迎回来，{{userName}}</span>
                <Dropdown placement="bottom-start">
                    <a href="javascript:void(0)">
                        <div class="topnav-user" @click="goLike('personal')">{{userName.charAt(0)}}</div>
                    </a>
                    <DropdownMenu slot="list" class="topnav-dropdown" style="margin-left:-25px;">
                        <ul><DropdownItem><span class="user-box-link-a" @click="goLike('personal')">个人中心</span></DropdownItem></ul>
                        <ul><DropdownItem><span class="user-box-link-a" @click="goLike('like')">我的关注</span></DropdownItem></ul>
                        <ul><DropdownItem><router-link class="user-box-link-a" to="/editPersonal">修改资料</router-link></DropdownItem></ul>
                        <ul><DropdownItem><span class="user-box-link-a" @click="logout()">退出登录</span></DropdownItem></ul>
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
</template>

<script>
export default {
    name: "HomeTopNavigation",
    data(){
        return{
            userName: '神之子阿目',
        }
    },
    computed:{
        // getUser(){
        //     return this.$store.state.token;
        // }
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
    width: 100%;
    height: 80px;
    margin: 0;
    padding: 0;
    font-family: MicrosoftYaHei;
    background-color: #eef2f5;
    border-bottom: 1px, solid, rgb(181, 198, 230);
}

.topnav-box {
    position: relative;
    top: 15px;
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
    cursor: pointer;
    width: 5%;
    left: 4%;
    top: 6px;
    float: left;
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

.logo-text{
    position: relative;
    float:left;
    left: 20px;
    top: 7px;
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
    color: #2f2f2f;
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
    font-family: MicrosoftYaHei;
    text-decoration: none;
    width: 15%;
    float: left;
    padding-right: 3%;
    text-align:center;    
    color: black;
    bottom: 4px;
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
.welcome{
    position:relative;
    bottom: 0px;
    font-size:14px;
    color: rgba(0, 0, 0, 0.5);
}
.topnav-box-user{
    position: relative;
    font-family: MicrosoftYaHei;
    width: 10%;
    float:right;
    align-content: center;
    color:black;
}

.topnav-user{
    color:rgba(0, 0, 0, 0.5);
    background-color: #e8f8f0;
    width:35px;
    height:35px;
    line-height: 35px;
    text-align: center;
    border-radius: 50%;
}

.user-box-link-a{
    color:black;
}

.topnav-box-link-a:hover, .topnav-user:hover, .user-box-link-a:hover{
    /*color: #6495ED;
    border-top: 5px solid #6495ED;*/
    color: #1ebf73;
    cursor: pointer;
}

.topnav-box-link-a a:hover {
    color: #1ebf73;
    cursor: pointer;
}

.topnav-box-link-a router-link-active{
    /*color: #BA55D3;*/
    color:seagreen;
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

.topnav-dropdown router-link{
    font-size: 18px;
}

@media only screen and (max-width: 720px) {
    .topnav-box-image{
        display: block;
        position: relative;
        text-align: center;
        height: 55px;
        float: center;
    }

    .topnav-box-image img {
        width: 50px;
        height: 50px;
        /*border-radius: 50%;*/
        border-color: black;
        border-width: 0px;  
        border-style: solid;
        text-align: center;
        position: relative;
    }

    .topnav-box-user-login {
        display: block;
        position: relative;
        float: right;
    }

    .topnav-box-menu {
        display: block;
        position: relative;
        margin-left: auto;
        margin-right: 0px;
        float: left;
    }

    .topnav-box-link, .topnav-box-search, .topnav-box-user, .topnav-box-logo, .logo-text{
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

