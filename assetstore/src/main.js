// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import axios from 'axios'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(Vuex)

/*axios post setting
axios.defaults.baseURL='http://localhost:8080'
global.axios=axios
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.prototype.$axios = axios*/
Vue.use(iView)
Vue.use(VueResource)

const ADD_COUNT = 'ADD_COUNT'; // 用常量代替事件类型，使得代码更清晰const REMOVE_COUNT = 'REMOVE_COUNT';//注册状态管理全局参数var store = new Vuex.Store({  state:{    token:'',    userID:'',  },  mutations: {    //写法与getters相类似    //组件想要对于vuex 中的数据进行的处理    //组件中采用this.$store.commit('方法名') 的方式调用，实现充分解耦    //内部操作必须在此刻完成(同步)    [ADD_COUNT] (state, token) { // 第一个参数为 state 用于变更状态 登录      sessionStorage.setItem("token", token);      state.token = token;    },    [REMOVE_COUNT] (state, token) { // 退出登录       sessionStorage.removeItem("token", token);       state.token = token;    },  }});
const REMOVE_COUNT = 'REMOVE_COUNT';
// 注册状态管理全局参数
var store = new Vuex.Store({
  state:{
    token:'',
    userID:'',
  },
  mutations:{
    // login
    [ADD_COUNT] (state, token, single) {
      if(!single){
        // 用户未勾选记住登录状态
        var localstorage = require('./localstorage')
        localstorage.setAge(30*24*60*60*1000).set("token", token);
      }else{
        // 用户勾选记住登录状态
        localStorage.setItem("token", token);
      }  
      state.token = token;
    },
    // logout
    [REMOVE_COUNT] (state, token) {
      localStorage.removeItem("token", token);
      state.token = token;
    }
  }
})

router.beforeEach((to,from,next) => {
  // loading 效果
  iView.LoadingBar.start();
  // 获取本地存储的token
  store.state.token = sessionStorage.getItem("token");
  // 判断这个url是否需要登录权限
  if(to.meta.requireAuth) {
    if(store.state.token !== "" && store.state.token !== null) {
      console.log("login or not: "+store.state.token)
      next();
    }else{
      next({path:'/login', query:{redirect: to.fullPath}});
    }
  }else{
    next();
  }
})
router.afterEach(route => {
  iView.LoadingBar.finish();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
