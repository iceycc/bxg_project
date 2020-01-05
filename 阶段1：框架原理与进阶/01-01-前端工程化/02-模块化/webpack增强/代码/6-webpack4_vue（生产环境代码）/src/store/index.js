import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //Vue.prototype.$store

//Vuex相关的代码 , 该对象中写的就是Vuex核心概念的代码

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store