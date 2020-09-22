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

import uploadFile from '@/pages/resources/uploadFile'
import updateFile from '@/pages/resources/updateFile'
import editFile from '@/pages/resources/editFile'
import resourceDetail from '@/pages/resources/resourceDetail'
import versionHistory from '@/pages/resources/versionHistory'
import resourceComment from '@/pages/resources/comment'
import artShowRole from '@/pages/search/artShowRole'
import DevShowSub from '@/pages/search/devShowSub'


Vue.use(Router)

export default new Router({ 
	mode: "history",
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
		 return savedPosition
		} else {
		 return { x: 0, y: 0 }
		}
	},
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      // name: 'Home',
      name:'主页',
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
      // name: 'Personal',
      component: personal,
      name:'个人中心',
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
      path: '/:userId/visit',
      name: 'Visit',
      component: visit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/software',
      // name: 'Software',
      name:'软件中心',
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
      // name: 'SearchResult',
      name:'资源搜索',
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
      path: '/uploadFile',
      name: 'uploadFile',
      component: uploadFile,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/updateFile/:resourceId',
      name: 'updateFile',
      component: updateFile,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/editFile/:resourceId',
      name: 'editFile',
      component: editFile,
      meta: {
        requireAuth: true
      }
    },

    {
      path:'/resourceDetail/:resourceId',
      // name:'resourceDetail',
      name:'资源详情',
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
    },
 
    {
      path:'/resourceDetail/:resourceId/comment',
      name:'resourceComment',
      component:resourceComment,
      meta: {
        requireAuth: true
      }
    },


    {
      path:'/artShow/*',
      name:'artShowRole',
      component:artShowRole,
      meta: {
        requireAuth: true
      }
    },
    {
      path:'/devShow/*',
      name:'DevShowSub',
      component:DevShowSub,
      meta: {
        requireAuth: true
      }
    }
  ]

})
