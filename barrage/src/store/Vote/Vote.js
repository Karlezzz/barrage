import { _findAll } from '@/api'
import { endpoint } from '@/api/ednpoint'
const { Vote } = require('../../../lib/models')

const state = {
  votes: Vote.initFromArray([{
    question: 'How to learn Vue?',
    id:'111',
    content: 'test',
    duration: 600000,
    voteOptions: [
      {
        id: 'A2HRJMCVVvUZEMSJqzQQl',
        optionValue: 'Online',
        selectMembers: [
          { name: 'Tom', id: '001' },
          { name: 'Sam', id: '002' },
        ],
      },
      {
        id: 'A2HRJMCVVvUZEMSJqzQ23',
        optionValue: 'Book',
        selectMembers: [
          { name: 'Karle', id: '011' },
          { name: 'Mary', id: '032' },
          { name: 'Don', id: '031' },
        ],
      },
      {
        id: 'A2HRJMCVVvUDUHFSJqzQ23',
        optionValue: 'Class',
        selectMembers: [
          { name: 'Joe', id: '005' },
          { name: 'Yan', id: '036' },
          { name: 'Perry', id: '056' },
        ],
      },
    ],
  }]),
}
const mutations = {
  SETVOTES(state, data) {
    state.votes.push(data)
  },
  UPDATEALLVOTES(state,data) {
    state.votes = []
    state.votes = [data]
  }
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
export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
