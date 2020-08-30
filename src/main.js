import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.css'
import './styles/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入amfe-flexible库
import 'amfe-flexible'
// 引入HmHeader
import HmHeader from './components/HmHeader.vue'
import HmLogin from './components/HmLogo.vue'
import HmNavItem from './components/HmNavItem.vue'

// 引入axios
import axios from 'axios'

// 引入moment
import moment from 'moment'
// 过滤器
Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
// 把axios挂载到vue原型上
Vue.prototype.$axios = axios
// 给axios配置默认的baseURL基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// 注册全局组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogin)
Vue.component('hm-navitem', HmNavItem)

// 全局的把所有组件的vant都导入好了
Vue.use(Vant)

// 按需引入
// import { Button } from 'vant'
// Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
