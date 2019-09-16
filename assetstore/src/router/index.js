import Vue from 'vue'
import Router from 'vue-router'
import TopNav from '@/components/TopNav'
import login from '../pages/login'

Vue.use(Router)

export default new Router({
  routes: [
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
      component: TopNav
    }
  ]
})