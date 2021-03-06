// 用于全局注册组件
import Vue from 'vue'
// 引入HmHeader
import HmHeader from '../components/HmHeader.vue'
import HmLogin from '../components/HmLogo.vue'
import HmNavItem from '../components/HmNavItem.vue'
import HmPost from '../components/HmPost.vue'
import HmComment from '../components/HmComment.vue'
import HmFloor from '../components/HmFloor.vue'

// 注册全局组件
Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogin)
Vue.component('hm-navitem', HmNavItem)
Vue.component('hm-post', HmPost)
Vue.component('hm-comment', HmComment)
Vue.component('hm-floor', HmFloor)
