import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import global_ from './static/global'
Vue.use(VueRouter)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.global = global_
  }
}).$mount('#app')
