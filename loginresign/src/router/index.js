import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index'
import Login from '../components/login/Login'
import Register from '../components/login/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
