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
  //mode: "history",
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: home
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
      component: searchResult
    },
    {
      path: '/knowledge',
      name: 'Knowledge',
      component: TopNav
    },
    {
      path: '/Q&A',
      name: 'Q&A',
      component: discussion
    }
  ]
})
