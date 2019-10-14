<template>
    <div class="my-container-login" id="myForm" style="background-color:white;">
        <div class="my-wrap-login"> 
            <div class="my-login-logo">
                <!--<img src="../images/login.png">-->
                <h1>LOGO</h1>
                <br>
            </div>
            <Form id="login" ref="loginForm" :model="loginForm" :rules="loginRule">
                <FormItem prop="account">
                    <Input type = "text" placeholder="请输入域账户" v-model="loginForm.account" id="account">
                    </Input>
                </FormItem>
                <FormItem prop="password">                    
                    <Input type = "password" password placeholder="请输入登录密码" v-model="loginForm.password" id="password">
                    </Input>
                </FormItem>
                <FormItem>
                    <div class="my-container-login-btn">
                        <Button type="primary" @click="loginSubmit()" class="my-login-btn">登录</Button>
                    </div>
                </FormItem>
            </Form>

            <div class="text-center">
                <Checkbox style="float:left;" v-model="single">记住登录状态</Checkbox>
                <a style="float:right;" onclick="window.location.href='register.html'"><u>忘记密码？</u></a>
            </div>
        </div>
    </div>
</template>

<script>
import VueResource from 'vue-resource' 
import Vuex from 'vuex' 
export default {
    data(){
        return {
            single: true,
            loginForm: {
                account: "",
                password: ""
            },
            loginRule: {
                account: [{required: true, message:'请填写您的域账号', trigger:'blur'}],
                password:[{required: true, message:'请填写您的密码', trigger:'blur'},
                            {type:'string', min: 6, message:'密码请不要太短', trigger:'blur'}]
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
        loginSubmit(){
            console.log(this.loginForm);
            this.$http.post('/users/login',{account:this.loginForm.account, password:this.loginForm.password},{emulateJSON:true}).then((res)=>{
                // 登录成功
                this.$store.commit('REMEM_COUNT', this.single)
                this.$store.commit('ADD_COUNT', this.loginForm.account);
                this.$router.push('/')
            }, (res)=>{
                // 登录失败
                alert("出错啦QAQ"+response.status)
            })
        }
    }
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
    border-color:rgb(115, 183, 124); 
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

