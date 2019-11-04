// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import ViewUI from 'view-design';
import VueCropper from 'vue-cropper'
// import style
import 'view-design/dist/styles/iview.css';
import '../my-theme/index.less';       // change theme color
// fontawesome icon
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.use(ViewUI);
Vue.config.productionTip = false
Vue.use(Vuex)

/*axios post setting
axios.defaults.baseURL='http://localhost:8080'
global.axios=axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$axios = axios*/
Vue.use(VueResource)
Vue.use(VueCropper)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
/* 设置全局提示的位置时间
Vue.prototype.$Message.config({
  top: 450,
  duration:2
});*/
// 用常量代替事件类型，使得代码更清晰
const ADD_COUNT = 'ADD_COUNT'
const REMOVE_COUNT = 'REMOVE_COUNT'
const REMEM_COUNT = 'REMEM_COUNT'
const SEARCH_COUNT = 'SEARCH_COUNT'
const NOW_ACTIVE = 'NOW_ACTIVE'
const PERSONAL_ACTIVE = 'PERSONAL_ACTIVE'
const ADD_FAVORITE = 'ADD_FAVORITE'
const REMOVE_FAVORITE = 'REMOVE_FAVORITE'
const localstorage = require('./localstorage')
// 注册状态管理全局参数
var store = new Vuex.Store({
  state:{
    token:'',
    userID:'',
    single:true,
    searchContent:'',
    activenum: 1,
    personalActive: "",
    favoriteList: [],
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
    // 判读当前在个人中心的两个标签页中
    [PERSONAL_ACTIVE] (state, personalActive) {
      sessionStorage.setItem("personalActive", personalActive)
      state.personalActive = personalActive
    },
    // 添加关注到用户关注列表
    [ADD_FAVORITE] (state, favorite) {
      state.favoriteList.push(favorite)
      localStorage.setItem("favorite", state.favoriteList)
    },
    // 取消关注
    [REMOVE_FAVORITE] (state, favorite) {
      for(var i = 0; i < state.favoriteList.length; i++) {
        if(state.favoriteList[i] == favorite) {
          state.favoriteList.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("favorite", state.favoriteList)
    }
  }
})

router.beforeEach((to,from,next) => {
  // loading 效果
  ViewUI.LoadingBar.start();
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
  ViewUI.LoadingBar.finish();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
