// 配置全局的过滤器
// 过滤器
// 引入moment
import Vue from 'vue'
import moment from 'moment'
// 给moment全局定义语言环境
moment.locale('zh-CN')
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
Vue.filter('now', input => {
  return moment(input).fromNow()
})
