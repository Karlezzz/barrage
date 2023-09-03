import { reqUserLogin } from '@/api'
const state = {
  userLogin: {}
}
const mutations = {
  USERLOGIN(state, data) {
    state.userLogin = data
    const { id, name, token } = data
    localStorage.setItem("TOKEN", token)
    localStorage.setItem('ID', id)
  }
}
const actions = {
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    if (result.status === 200) {
      commit("USERLOGIN", result.data)
    } else {
      console.log(result.statusText);
    }
  }
}

export default {
  namespace: true, state, mutations, actions
}
