import { _findAll } from '@/api'
import { endpoint } from '@/api/ednpoint'
const { Vote } = require('../../../lib/models')

const state = {
  votes: []
}
const mutations = {
  SETVOTES(state, data) {
    state.votes = data
  },
  UPDATEVOTE(state, data) {
    const { votes } = state
    const originVoteIndex = votes.findIndex((v) => {
      return v.id === data.id
    })
    state.votes.splice(originVoteIndex, 1, data)
  },
}
const actions = {
  async getAllVotes({ commit }) {
    try {
      const result = await _findAll(endpoint.vote)
      if (result) {
        const votes = Vote.initFromArray(result)
        commit('SETVOTES', votes)
        return
      }
    } catch (error) {
      console.log(error)
    }
  },
}

const getters = {
  votes: state => Vote.initFromArray(state.votes)
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
