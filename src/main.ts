import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './components/index'
import './assets/main.css'
import { AxiosService } from './axios'
import api from './axios/api'

Vue.config.productionTip = false

Vue.prototype.$http = new AxiosService()
Vue.prototype.$api = api

declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosService
    $api: any
  }
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
