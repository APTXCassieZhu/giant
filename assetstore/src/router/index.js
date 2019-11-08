import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/users/login'
import home from '../pages/home'
import artfilter from '../pages/search/artFilter'
import artshow from '../pages/search/artShow'
import toolfilter from '../pages/search/toolFilter'
import searchresult from '../pages/search/searchResult'
import searchempty from '../pages/search/searchEmpty'
import software from '../pages/software'
import discussion from '../pages/Q&A'
import personal from '../pages/users/personal'
import editSetting from '../pages/users/editSetting'
import visit from '../pages/users/visit'
import knowledge from '../pages/knowledge'
import Notice from '../pages/notice'

import uploadFile from '../pages/uploadFile'
import resourceDetail from '../pages/resourceDetail'
import versionHistory from '../pages/resources/versionHistory'

Vue.use(Router)

export default new Router({ 
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/personal',
      name: 'Personal',
      component: personal,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/editSetting',
      name: 'EditSetting',
      component: editSetting,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/visit',
      name: 'Visit',
      component: visit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/software',
      name: 'Software',
      component: software,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/knowledge',
      name: 'Knowledge',
      component: knowledge,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/artFilter',
      name: 'ArtFilter',
      component: artfilter,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/artShow',
      name: 'ArtShow',
      component: artshow,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/toolFilter',
      name: 'ToolFilter',
      component: toolfilter,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/searchresult',
      name: 'SearchResult',
      component: searchresult,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/searchempty',
      name: 'SearchEmpty',
      component: searchempty,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/Q&A',
      name: 'Q&A',
      component: discussion,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/upFile',
      name: 'upFile',
      component: uploadFile,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/resourceDetail/:resourceId',
      name:'resourceDetail',
      component:resourceDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/resourceDetail/:resourceId/versionHistory',
      name:'VersionHistory',
      component:versionHistory,
      meta: {
        requireAuth: true
      }
    }
  ]
})
