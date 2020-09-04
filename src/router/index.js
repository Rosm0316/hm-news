import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import Follow from '../views/user/Follow.vue'
import myComment from '../views/user/myComment.vue'
import myStar from '../views/user/myStar.vue'
import index from '../views/news/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/follow', component: Follow, name: 'follow' },
  { path: '/my-comment', component: myComment, name: 'my-comment' },
  { path: '/my-star', component: myStar, name: 'my-star' },
  { path: '/', component: index, name: 'index' }
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
  // 需要拦截的所有页面
  const authUrls = ['/user', '/user-edit', '/follow', '/my-comment', '/my-star']
  if (!authUrls.includes(to.path) || token) {
    next()
  } else {
    router.push('/login').catch(err => err)
  }
})
export default router
