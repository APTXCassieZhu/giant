// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
//import axios from 'axios'
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

// 用常量代替事件类型，使得代码更清晰
const ADD_COUNT = 'ADD_COUNT'
const REMOVE_COUNT = 'REMOVE_COUNT'
const REMEM_COUNT = 'REMEM_COUNT'
const SEARCH_COUNT = 'SEARCH_COUNT'
const NOW_ACTIVE = 'NOW_ACTIVE'
const localstorage = require('./localstorage')
// 注册状态管理全局参数
var store = new Vuex.Store({
  state:{
    token:'',
    userID:'',
    single:true,
    searchContent:'',
    activenum: 1,
  },
  mutations:{
    // rememeber login state
    [REMEM_COUNT] (state, single) {
      state.single = single
    },
    // login
    [ADD_COUNT] (state, token) {
      if(state.single){
        // 用户勾选记住登录状态
        localstorage.setAge(30*24*60*60*1000).set("token", token)
      }else{
        // 用户未勾选记住登录状态
        sessionStorage.setItem("token", token)
      }  
      state.token = token
    },
    // logout
    [REMOVE_COUNT] (state, token) {
      if(state.single) {
        console.log(token+" logout.")
        localStorage.removeItem("token", token)
      } else {
        sessionStorage.removeItem("token", token)
      }
        
      state.token = token
    },
    // 存放用户搜索内容
    [SEARCH_COUNT] (state, searchContent) {
      sessionStorage.setItem("search", searchContent)
      state.searchContent = searchContent
    },
    // 判断当前在那个页面
    [NOW_ACTIVE] (state, activenum) {
      sessionStorage.setItem("active", activenum)
      state.activenum = activenum
    },
  }
})

router.beforeEach((to,from,next) => {
  // loading 效果
  iView.LoadingBar.start();
  // 获取本地存储的token
  store.state.token = localstorage.get("token");
  // 判断这个url是否需要登录权限
  if(to.meta.requireAuth) {
    if(store.state.token !== "" && store.state.token !== null) {
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
var eventHub = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
