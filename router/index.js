import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/auth/login'
import ei from '@/components/session/index'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },
    {
      path: '/ei',
      name: 'Manage Session',
      component: ei,
    },
  
  ]
})
