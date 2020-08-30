import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' }
]

const router = new VueRouter({
  routes
})
// 全局导航守卫
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  // console.log(to)
  // if (to.name === 'user') {
  //   if (token) {
  //     next()
  //   } else {
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }
  // 优化导航守卫
  if (to.name !== 'user' || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})
export default router
