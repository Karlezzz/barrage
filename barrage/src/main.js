import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import global_ from './static/global'
import echarts_ from './echats/index'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(
  new VueSocketIO({
    // 生产环境建议关闭，开发环境打开(在控制台看到socket连接和事件监听的信息)
    debug: true,
    connection: SocketIO.connect('http://localhost:3001', {
      // 创建时是否自动连接 我们这里设定为false,在指定页面再开启
      autoConnect: false,
      // 路径(默认值：/socket.io/) 
      path: "/my-app/",
      // 目前有两种传输方式：HTTP long-polling（可简称：polling）、WebSocket
      transports: ['websocket'],
      // 附加请求头（在服务器端的 socket.handshake.headers 对象中找到）
      extraHeaders: {},
    }),
    // options: ,
  })
)
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.global = global_
    Vue.prototype.echarts = echarts_
  }
}).$mount('#app')
