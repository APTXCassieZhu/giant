import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/TopNav'
import login from '../pages/login'
import search from '../pages/search'
import software from '../pages/software'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Top Navigation',
      component: TopNav
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/software',
      name: 'Software',
      component: software
    },
    {
      path: '/search',
      name: 'Search',
      component: search
    },
    {
      path: '/knowledge',
      name: 'Knowledge',
      component: TopNav
    }
  ]
})
