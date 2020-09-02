// 这里处理axios请求的
// 引入axios
import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import { Toast } from 'vant'

// 把axios挂载到vue原型上
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// 设置axios拦截器
axios.interceptors.request.use(function (config) {
  // console.log('拦截到了响应', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
axios.interceptors.response.use(function (response) {
  // console.log('拦截到了响应', response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // console.log('token失效啦')
    // 跳转到登录界面
    router.push('/login')
    // 清除登录信息
    localStorage.removeItem('token')
    localStorage.removeItem('token')
    // 给提示
    Toast.fail('登录信息失效')
  }
  return response
})
