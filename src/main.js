import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入flexible
import 'amfe-flexible'
// 引入icon
import '@/assets/font_3527091_473tzhfgkfg/iconfont.css'
// 引入百度
import BaiduMap from 'vue-baidu-map'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 百度地图
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'yuRZhw2OEl7DBtqOGDG19TdOdr76xCYX'
})

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
