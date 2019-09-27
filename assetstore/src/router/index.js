import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/TopNav'
import login from '../pages/login'
import home from '../pages/home'
import searchResult from '../pages/search'
import software from '../pages/software'
import discussion from '../pages/Q&A'

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
      component: login,
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
      path: '/search',
      name: 'Search',
      component: searchResult,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/knowledge',
      name: 'Knowledge',
      component: TopNav,
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
    }
  ]
})
