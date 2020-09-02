import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.css'
import './styles/iconfont.css'

// 引入amfe-flexible库
import 'amfe-flexible'

import './utils/global.js'
import './utils/request.js'
import './utils/filters.js'
import './utils/vant.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
