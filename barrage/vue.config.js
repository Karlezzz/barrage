const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // devServer:{
  //   host:'192.168.137.1',
  //   port:8889,
    
  // },
  // proxyTable: {
  //   '/socket.io':{
  //     target: 'http://127.0.0.1:3001/', // target host
  //     changeOrigin: true, // needed for virtual hosted sites
  //     logLevel: 'debug'
  //   },
  //   '/sockjs-node': {
  //     target: 'http://127.0.0.1:3001',
  //     ws: false,
  //     changeOrigin: true
  //   }
  // }
  
})
