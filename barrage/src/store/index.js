import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import enter from './Enter/Enter'

export default new Vuex.Store({
    modules:{
        enter,
    }
})
