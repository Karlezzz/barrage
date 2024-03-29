import store from '@/store/index'
// console.log(store.dispatch('createOne'));

async function _createOne(url, body) {
  const result = await store.dispatch('axios/createOne', {
    url,
    body,
  })
  return result.total === 1 ? result.data[0] : null
}

async function _findAll(url, options) {
  const result = await store.dispatch('axios/findAll', {
    url,
    query: {
      active: true,
      deleted: false,
      ...options,
    },
  })
  return result.data || []
}
async function _findOne(url, options) {
  const result = await store.dispatch('axios/findAll', {
    url,
    query: {
      // active: true,
      // deleted: false,
      ...options,
    },
  })
  return result.total === 1 ? result.data[0] : null
}

async function _updateOne(url, body) {
  const result = await store.dispatch('axios/updateOne', {
    url,
    body,
  })
  return result.total === 1 ? result.data[0] : null
}

export {
  _findAll,
  _findOne,
  _createOne,
  _updateOne,
}
