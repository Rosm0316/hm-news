// 配置全局的过滤器
// 过滤器
// 引入moment
import Vue from 'vue'
import moment from 'moment'
Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
