import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/users/login'
import home from '../pages/home'
import filter from '../pages/search/filter'
import software from '../pages/software'
import discussion from '../pages/Q&A'
import personal from '../pages/users/personal'
import knowledge from '../pages/knowledge'

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
      path: '/software',
      name: 'Software',
      component: software,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/filter',
      name: 'Filter',
      component: filter,
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
      path: '/Q&A',
      name: 'Q&A',
      component: discussion,
      meta: {
        requireAuth: true
      }
    }
  ]
})
