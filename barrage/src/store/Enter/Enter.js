import requests from '@/api'
const state = {
  userLogin: null,
  roomCode: null,
  classRoomId: null
}
const mutations = {
  USERLOGIN(state, data) {
    state.userLogin = data
    const { id } = data
    localStorage.setItem('ID', id)
    sessionStorage.setItem('BARRAGEFLAG', true)
  },
  SETROOMCODE(state, data) {
    state.roomCode = data
  },
  SETCLASSROOMID(state, data) {
    state.classRoomId = data
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
}

export default {
  namespaced: true, state, mutations, actions
}
