// 配置全局的过滤器
// 过滤器
// 引入moment
import Vue from 'vue'
import moment from 'moment'
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
