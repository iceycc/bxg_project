import Vue from 'vue'
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'
import foo from './modules/foo'
import bar from './modules/bar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    foo,
    bar
  },
  state: {
    count: 10,
    message: 'hello world',
    todos: [
      { id: 1, text: '吃饭', done: true },
      { id: 2, text: '睡觉', done: false },
      { id: 3, text: '打豆豆', done: false },
      { id: 4, text: '写代码', done: false }
    ]
  },
  mutations: {
    // increment (state, num = 1) {
    //   state.count += num
    // },
    increment (state, { num = 1 }) {
      // mutation 提交会立即形成一条改变记录
      state.count += num
    },
    [SOME_MUTATION] (state) {
      state.message = '你哈，世界'
    }
  },
  actions: {
    increment ({ commit }, { num = 1 }) {
      setTimeout(function () {
        commit({
          type: 'increment',
          num
        })
      }, 1000)
    }
  },
  getters: {
    remaining: state => {
      return state.todos
        .filter(item => item.done === false)
        .length
    },
    getTodoById: state => {
      return id => {
        return state.todos.find(item => item.id === id)
      }
    }
  }
})

export default store
