export default {
  namespaced: true,
  state: {
    a: 123
  },
  mutations: {
  },
  actions: {},
  getters: {
    abc (state) {
      return state.a + '...'
    }
  }
}
