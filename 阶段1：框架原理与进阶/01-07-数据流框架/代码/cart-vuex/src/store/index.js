import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import * as plugins from './plugins'

import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  state,
  mutations,
  actions,
  getters,
  modules: {
    products,
    cart
  },
  plugins: [
    ...(debug ? [createLogger()] : []),
    createPersistedState()]
})

export default store
