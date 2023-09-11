import requests from '@/api'
const state = {
  userLogin: null,
  roomCode: null
}
const mutations = {
  USERLOGIN(state, data) {
    state.userLogin = data
    const { id, token } = data
    localStorage.setItem("TOKEN", token)
    localStorage.setItem('ID', id)
    sessionStorage.setItem('BARRAGEFLAG', true)
  },
  SETROOMCODE(state,data) {
    state.roomCode = data
  }
}
const actions = {
  async userLogin({ commit }, data) {
    await requests({
      url: '/user',
      method: 'post',
      data
    }).then((res) => {
      commit("USERLOGIN", res.data)
      return 1
    }).catch(() => {
      console.log('1')
    })
  },

  test() {
    console.log(2);
  }
}

export default {
  namespaced: true, state, mutations, actions
}
