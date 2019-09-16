<template>
    <div class="my-container-login" id="myForm" style="background-color:white;">
        <div class="my-wrap-login"> 
            <div class="my-login-logo">
                <!--<img src="../images/login.png">-->
                <h1>LOGIN</h1>
            </div>
            <br>
            <form action>
                <div class="my-wrap-login-input">
                    <input type = "text" name = "ID" placeholder="请输入域账户" class="my-login-input"><br>
                </div>
                <div class="my-wrap-login-input">
                    <input type = "password" name = "pwd" placeholder="请输入登录密码" class="my-login-input"><br>
                </div>
            </form>
            <div class="my-container-login-btn">
                <button onclick="window.location.href='home.html'" class="my-login-btn">Login </button>
            </div>
            <br>
            <div class="text-center">Don't have an account?
                <a onclick="window.location.href='register.html'"><u>Sign Up</u></a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
   
}
</script>

<style scoped>
    .my-container-login{
    width:100%;
    min-height:100vh;
    display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;
    justify-content:center;
    align-items:center;
    padding:15px;
    }
    
    .my-wrap-login {
    width:390px;
    overflow:hidden;
    border-style: solid;
    border-color:#7392B7; 
    border-radius:10px;
    padding:30px ;
    box-shadow:0 5px 10px 0 rgba(0,0,0,.1);-moz-box-shadow:0 5px 10px 0 rgba(0,0,0,.1);-webkit-box-shadow:0 5px 10px 0 rgba(0,0,0,.1);-o-box-shadow:0 5px 10px 0 rgba(0,0,0,.1);-ms-box-shadow:0 5px 10px 0 rgba(0,0,0,.1)
    }
    
    .my-wrap-login-input{width:100%;position:relative; margin-bottom:37px}
    .my-login-input{
    border-style:none;
    border-bottom:2px solid #adadad;
    width:100%;
    }
    .my-login-logo {
    display:block;
    position:center;
    line-height:1.2;text-align:center;
    }
    
    .my-container-login-btn{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap;justify-content:center;padding-top:13px}
    .my-login-btn{   
    background-size: 200% auto;
    background-image: linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%);
    color: #354354;
    border: 2px solid #7392B7;
    transition: 0.5s;
    text-align: center;
    border-radius:10px;
    width: 250px;
    height: 35px;
    }
    
    .my-login-btn:hover {
    background-position: right center;
    color: white;
    }  
</style>

