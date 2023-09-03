import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import enter from './Enter/Enter'
import axios from './Axios/axios'

export default new Vuex.Store({
  modules: {
    enter,
    axios
  }
})
