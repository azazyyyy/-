// 入口文件
import './Mock'
import Vue from 'vue'
import App from './App.vue'
import './styles/global.less'
import router from './router'
import './Evenbus'
import showMessage from './utils/showMessage'

Vue.prototype.$showMessage = showMessage

import vloading from './divectives/loading'
import vlayze from './divectives/layze'
import store from './store'
store.dispatch('setting/fetchSetting')
Vue.directive('layze', vlayze)
Vue.directive('loading', vloading)
// import './api/banner'
window.showMessage = showMessage
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 测试
// import * as blogapi from './api/Blog'

// blogapi.getBlog("adasa").then(r => {
//   console.log(r)
// })
// blogapi.getBlogCategories().then(r => {
//   console.log(r)
// })
