import * as types from '../mutation-types'
import { SearchManager } from '../../api'

// initial state
const state = {
  keyword: '',
  fetching: false,
  total: 0,
  hits: [],
  error: null,
}

// getters
const getters = {
  keyword: state => state.keyword,
  fetching: state => state.fetching,
  total: state => state.total,
  hits: state => state.hits,
  error: state => state.error,
}

// mutations
const mutations = {
  [types.UPDATE_KEYWORD] (state, { keyword }) {
    state.keyword = keyword
  },

  [types.SEARCH_REQUEST] (state) {
    state.fetching = true
  },

  [types.SEARCH_SUCCESS] (state, { hits, total }) {
    state.fetching = false
    state.total = total
    state.hits = hits
  },

  [types.SEARCH_FAILURE] (state, { error }) {
    state.fetching = false
    state.error = error
  },
}

// actions
const actions = {
  fetchHits ({ commit, state }, keyword) {
    commit(types.UPDATE_KEYWORD, { keyword })
    commit(types.SEARCH_REQUEST)

    SearchManager.search(keyword)
      .then(response => {
        commit(types.SEARCH_SUCCESS, response)
      })
      .catch(error => {
        commit(types.SEARCH_FAILURE, { error })
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
