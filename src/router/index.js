import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "user" */ '../views/user/Login.vue')
const Register = () => import(/* webpackChunkName: "user" */ '../views/user/Register.vue')
const User = () => import(/* webpackChunkName: "user" */ '../views/user/User.vue')
const UserEdit = () => import(/* webpackChunkName: "user" */ '../views/user/UserEdit.vue')
const Follow = () => import(/* webpackChunkName: "user" */ '../views/user/Follow.vue')
const myComment = () => import(/* webpackChunkName: "user" */ '../views/user/myComment.vue')
const myStar = () => import(/* webpackChunkName: "user" */ '../views/user/myStar.vue')
const index = () => import(/* webpackChunkName: "index" */ '../views/news/index.vue')
const Manage = () => import(/* webpackChunkName: "news" */ '../views/news/Manage.vue')
const PostDetail = () => import(/* webpackChunkName: "news" */ '../views/news/PostDetail.vue')
const Search = () => import(/* webpackChunkName: "news" */ '../views/news/Search.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/follow', component: Follow, name: 'follow' },
  { path: '/my-comment', component: myComment, name: 'my-comment' },
  { path: '/my-star', component: myStar, name: 'my-star' },
  { path: '/', component: index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' },
  { path: '/search', component: Search, name: 'search' }
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
