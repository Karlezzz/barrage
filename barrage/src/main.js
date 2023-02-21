import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router/index.js'


Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
  

}).$mount('#app')
