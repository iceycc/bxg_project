import Vue from 'vue'

import App from './App'

import router from './router/index'

new Vue({
    el:"#app",
    router,
    render:h => h(App)
})