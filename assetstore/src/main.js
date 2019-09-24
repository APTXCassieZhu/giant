// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
//import VueCookies from 'vue-cookies'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
///Vue.prototype.$http = axios
Vue.use(Vuex)
axios.defaults.baseURL='http://localhost:8080'
global.axios=axios
axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.prototype.$axios = axios

Vue.use(iView)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
