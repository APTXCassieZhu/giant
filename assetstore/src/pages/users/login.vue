<template>
    <div class="my-container-login" id="myForm">
        <div class="login-title">GDRC 研发资源中心</div>
        <div class="login-subtitle">您日常工作的好助力</div>
        <div class="my-wrap-login"> 
            <div class="my-login-logo">
                <p class="my-login-welcome">欢迎登陆</p>
            </div>
            <Form id="login" ref="loginForm" :model="loginForm" :rules="loginRule">
                <FormItem prop="account">
                    <Input ref="account" type = "text" placeholder="请输入域账户" v-model="loginForm.account" id="account" @on-change="fillIn()"/>
                </FormItem>
                <FormItem prop="password">                    
                    <Input ref="password" type = "password" password placeholder="请输入登录密码" v-model="loginForm.password" id="password" class="my-login-input" @on-change="fillIn()"/>
                </FormItem>
                <FormItem class="text-center">
                    <Checkbox class="login-remember" v-model="single">记住登录状态</Checkbox>
                    <a class="login-forget" @click="forgetPsd()">忘记密码？</a>
                </FormItem>
                <FormItem>
                    <Button type="primary" :disabled="disableOrNot" @click="loginSubmit()" :class="loginBtn">登录</Button>
                </FormItem>
            </Form>
        </div>
        <div class="login-footer">
            <p>Copyright © 巨人网络-前沿技术部, All Rights Reserved.</p>
            <p>荣誉出品</p>
        </div>
    </div>
</template>

<script>
import VueResource from 'vue-resource' 
import Vuex from 'vuex' 
export default {
    data(){
        return {
            loginBtn: 'my-login-btn-disable',
            disableOrNot: true,
            single: true,
            loginForm: {
                account: "",
                password: ""
            },
            loginRule: {
                account: [{required: true, message:'*请填写您的域账号', trigger:'blur'}],
                password:[{required: true, message:'*请填写您的密码', trigger:'blur'}]
                            //{type:'string', min: 6, message:'密码请不要太短', trigger:'blur'}]
            }
        }
   },
    created(){
   },
    mounted(){
       if(this.loginForm.account === '') {
           this.$refs.account.focus()
       } else if(this.loginForm.password === '') {
           this.$refs.password.focus()
       }
   },
   methods:{
        fillIn(){
            if(this.loginForm.account != '' && this.loginForm.password != ''){
                this.loginBtn = 'my-login-btn'
                this.disableOrNot = false
            }else{
                this.loginBtn = 'my-login-btn-disable'
                this.disableOrNot = true
            }
        },
        loginSubmit(){
            console.log(this.loginForm);
            this.$http.post('/users/login',{account:this.loginForm.account, password:this.loginForm.password},{emulateJSON:true}).then((res)=>{
                // 登录成功
                console.log(res.data)
                if(res.data.code == 0){
                    this.$store.commit('REMEM_COUNT', this.single)
                    this.$store.commit('ADD_COUNT', this.loginForm.account);
                    this.$router.push('/')
                }
                // alert("出错啦QAQ"+response.code)
                else if(res.data.code == 40101){
                    this.$Modal.error({
                        title: '抱歉，账号或密码错误，请确认之后重试',
                    });
                }else if(res.data.code == 40103){
                    this.$Modal.error({
                        title: '抱歉，连接域账号服务器失败，请稍后再试',
                    });
                }
            }, (res)=>{
                // 登录失败
                
            })
        },
        forgetPsd(){
            this.$Modal.info({
                title: '<p>忘记或重置域账号密码，</p><p>请致电8000服务台转3咨询</p>',
            });
        }
    }
}
</script>

<style scoped>
.my-container-login{
    width:100%;
    min-height:959px;
    /* display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;flex-wrap:wrap; */
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
    padding:15px;
    background: #eff2f5 url('../../assets/transparentLogo.png') no-repeat;
    background-position: 550px 200px;
    background-size: 400px 460px;
}
.login-title{
    font-size: 21px;
    font-weight: 900;
    line-height: 1;
    color: #7f7f7f;
    margin-bottom: 10px;
}
.login-subtitle{
    font-size: 21px;
    font-weight: 300;
    line-height: 1.14;
    color: #7f7f7f;
    margin-bottom: 30px;
}
.my-wrap-login {
    width: 379px;
    height: 414px;
    overflow:hidden;
    border-style: solid;
    border-radius:3px;
    border-width: 0px;
    padding:60px 40px 60px 40px;
    box-shadow: 0 1px 4px 3px rgba(141, 141, 141, 0.05);
    background-color: #ffffff;
    margin-bottom: 53px;
}
.my-login-logo {
    position: relative;
    display:block;
    position:center;
    line-height:1.2;
    text-align:left;
    margin-bottom: 30px;
}
.my-login-welcome{
    position: relative;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1.14px;
    color: #7f7f7f;
}

.my-login-input{
    width:100%;
    position:relative;
    margin-top:20px;
}
.text-center{
    position: relative;
    margin-top:35px;
}

.login-remember{
    position: relative;
    float:left;
    font-size: 12px;
    letter-spacing: 0.86px;
    color: #7f7f7f;
}
.login-forget{
    float:right;
    font-size:12px;
    cursor:pointer;
}
.my-container-login-btn{
    position: relative;
    padding-top:70px;
    width:100%;
    font-size: 16px;
    font-weight: bold;
}
.my-login-btn-disable, .my-login-btn-disable:hover{
    background-color: #d8d8d8;
    position: relative;
    text-align: center;
    border: 0px;
    width: 100%;
    height: 34px;
    border-radius: 3px;
    color: white;
}
.my-login-btn{   
    position: relative;
    background-image: linear-gradient(121deg, #5be9c5 1%, #7be3c3 14%, #37d89d 65%);
    text-align: center;
    border: 0px;
    width: 100%;
    height: 34px;
    border-radius: 3px;
    color: white;
}
.my-login-btn:hover{
    background-image: linear-gradient(121deg, #37d89d 35%, #7be3c3 86%, #5be9c5 99%);
}
.login-footer{
    font-size: 12px;
    letter-spacing: 0.86px;
    color: #cccccc;
}
</style>

