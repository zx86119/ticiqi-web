import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import http from '@/utils/http'
import '@/common/style/index.less'
import '@/common/theme/style/theme/index.css'
import '@/common/style/element-reset.less'
import $cookies from 'vue-cookies'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$http = http
Vue.use($cookies)
Vue.use(Element, { size: 'small', zIndex: 3000, fontSize: '16px' })

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
