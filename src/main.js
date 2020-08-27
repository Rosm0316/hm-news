import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入通用的样式
import './styles/base.css'
import './styles/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'

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
