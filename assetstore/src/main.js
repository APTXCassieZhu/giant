// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'
import axios from 'axios'
// import VueResource from 'vue-resource'
import ViewUI from 'view-design'
import VueCropper from 'vue-cropper'
// import style
import 'view-design/dist/styles/iview.css';
import '../my-theme/index.less';     // change theme color
import 'ant-design-vue/dist/antd.css';
import '../my-theme/ant.less';
// import 动画特效
import lottie from 'vue-lottie';
Vue.component('lottie', lottie)

// fontawesome icon
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ViewUI);
Vue.config.productionTip = false
Vue.use(Vuex)

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// // Vue.use(ElementUI)

// console.log(ElementUI)
import { Rate, Tooltip } from "ant-design-vue"
import 'ant-design-vue/lib/rate/style/css'
import 'ant-design-vue/lib/tooltip/style/css'

// Vue.component(Rate.name, Rate)
// Vue.component(Tooltip.name, Tooltip)

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

// console.log(process.env.NODE_ENV)

// axios.defaults.baseURL = process.env.npm_lifecycle_event==='test' ?
// '//192.168.94.238:3000':
// '/'
axios.defaults.baseURL = '/'

global.axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$axios = axios


axios.interceptors.request.use(function (config) {
  //console.log('request interceptors config:',config)
  // config.headers.common['Content-Type'] = 'application/json'
  // config.headers.common['aaaaaaaaaaa'] = 'aaaaaaaaaaaaaaa'
  config.headers.common['authorization'] = store.state.token
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})



axios.interceptors.response.use(
  response => {
    if (response.data.code == "401") {
      console.log('test 401 success')
      store.commit('REMOVE_COUNT', store.state.token)
      router.push('/login')
      return Promise.reject(response)
    }
    return Promise.resolve(response)
  },
  error => {
    if (error.response.status) {
      // debugger
      switch (error.response.status) {
        // 401: 未登录                
        // 未登录则跳转登录页面，并携带当前页面的路径                
        // 在登录成功后返回当前页面，这一步需要在登录页操作。                
        case 401:
          router.replace({                   
            path: "/login",                    
            query: {                    
              redirect: router.currentRoute.fullPath                    
            }                    
          });                    
          break
      }
      
      return Promise.reject(error.response)
    }
})

Vue.use(VueCropper)

Vue.config.productionTip = false
/* 设置全局提示的位置时间
Vue.prototype.$Message.config({
  top: 450,
  duration:2
});*/
// 用常量代替事件类型，使得代码更清晰
const ADD_COUNT = 'ADD_COUNT'
const REMOVE_COUNT = 'REMOVE_COUNT'
const ADD_USER = 'ADD_USER'
const SEARCH_COUNT = 'SEARCH_COUNT'
const NOW_ACTIVE = 'NOW_ACTIVE'
const PERSONAL_ACTIVE = 'PERSONAL_ACTIVE'
const READ_NOTICE = 'READ_NOTICE'
const NOTICE_READED = 'NOTICE_READED'
// const localstorage = require('./localstorage')


// 注册状态管理全局参数
var store = new Vuex.Store({
  state: {
    token: localStorage['token'],
    user: localStorage['user'],
    searchContent: '',
    activenum: 1,
    personalActive: "",
    breadListState: sessionStorage['gdrc-breadlist']?JSON.parse(sessionStorage['gdrc-breadlist']):[],
    breadCommentListState: sessionStorage['gdrc-breadlist-comment']?JSON.parse(sessionStorage['gdrc-breadlist-comment']):[],
    // { path:'',resourceId:'' }
    curResourceId: sessionStorage['gdrc-curResourceId'],
    curCommentResourceId: sessionStorage['gdrc-curCommentResourceId'],

    curNotice: localStorage['curNotice'],
  },
  
  mutations:{
      // login
      [ADD_COUNT](state, token) {
          localStorage.setItem("token", token)
          state.token = token
          // 让所有请求header里面都有token
          console.log('token ' + token)
          axios.defaults.headers.common['authorization'] = state.token
      },
      // logout
      [REMOVE_COUNT](state, token) {
          localStorage.removeItem("token", token)
          state.token = undefined
      },
      [ADD_USER](state, user) {
          console.log('user ' + user)
          const s = JSON.stringify(user)
          localStorage.setItem("user", s)
          state.user = s
      },
      // 存放用户搜索内容
      [SEARCH_COUNT](state, searchContent) {
          sessionStorage.setItem("search", searchContent)
          state.searchContent = searchContent
      },
      // 判断当前在那个页面
      [NOW_ACTIVE](state, activenum) {
          sessionStorage.setItem("active", activenum)
          state.activenum = activenum
      },
      // 判读当前在个人中心的两个标签页中
      [PERSONAL_ACTIVE](state, personalActive) {
          sessionStorage.setItem("personalActive", personalActive)
          state.personalActive = personalActive
      },
      // 从导航栏点击通知，前往消息中心，存储当前点击的通知内容
      [READ_NOTICE](state, item) {
          localStorage.setItem('curNotice', JSON.stringify(item))
      },
      [NOTICE_READED](state, item){
          localStorage.removeItem('curNotice', item)
          state.curNotice = undefined
      },

      SAVE_COMMENT_BREADLIST(state,{breadlist,resourceId}={ }){
        state.breadCommentListState =  [
          {fullPath:'/home', name:'主页'},
          ...breadlist,
          {fullPath:`/resourceDetail/${resourceId}/comment`, name:'全部评论'}
        ]
        //debugger
        state.curCommentResourceId = resourceId
        // debugger
        sessionStorage['gdrc-breadlist-comment'] = JSON.stringify( state.breadCommentListState )
        sessionStorage['gdrc-curCommentResourceId'] = state.curCommentResourceId

      },
      SAVE_BREADLIST(state,{breadlist,resourceId}={}){
        state.breadListState =  [
          {fullPath:'/home', name:'主页'},
          ...breadlist,
          {fullPath:`/resourceDetail/${resourceId}`, name:'资源详情'}
        ]
        //debugger
        state.curResourceId = resourceId
        // debugger
        sessionStorage['gdrc-breadlist'] = JSON.stringify( state.breadListState ) 
        sessionStorage['gdrc-curResourceId'] = state.curResourceId 
      }, 
      breadListStateRemove(state,n){
        while(n--){
          state.breadListState.shift()
        }
      }
    }
  
})


const normalResourceBreadList = (store, to) => {
  // 直接链接进入resourceDetail 如果有session并且resourceId是最近session中的resourceId
  // 从页面点进去重新处理session
  let { params, path } = to

  // debugger
  if (/resourceDetail/.test(path) && to.name === '资源详情') {
    if (params.resourceId != store.state.curResourceId * 1) {
      store.state.breadListState = [
        { fullPath: '/home', name: '主页' },
        { fullPath: `/resourceDetail/${params.resourceId}`, name: '资源详情' }
      ]

      store.state.curResourceId = params.resourceId
      // debugger
      sessionStorage['gdrc-breadlist'] = JSON.stringify(store.state.breadListState)
      sessionStorage['gdrc-curResourceId'] = store.state.curResourceId
    }
  }

  if (/comment/.test(path) && to.name === 'resourceComment') {
    if (params.resourceId != store.state.curCommentResourceId * 1) {
      store.state.breadCommentListState = [
        { fullPath: '/home', name: '主页' },
        { fullPath: `/resourceDetail/${params.resourceId}/comment`, name: '全部评论' }
      ]

      store.state.curCommentResourceId = params.resourceId
      // debugger
      sessionStorage['gdrc-breadlist-comment'] = JSON.stringify(store.state.breadCommentListState)
      sessionStorage['gdrc-curCommentResourceId'] = store.state.curCommentResourceId
    }
  }
}


router.beforeEach((to, from, next) => {

  normalResourceBreadList(store, to)

  // loading 效果
  ViewUI.LoadingBar.start()
  // 获取本地存储的token
  store.state.token = localStorage.getItem("token")
  store.state.user = localStorage.getItem("user")
  // 判断这个url是否需要登录权限
  if (to.meta.requireAuth) {
    if (store.state.token && store.state.user) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  ViewUI.LoadingBar.finish()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
