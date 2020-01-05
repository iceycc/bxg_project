import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCordova from 'vue-cordova'
Vue.use(VueCordova)
 // add
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.cordova.on('deviceready', () => {
  console.log('Cordova: device is read!')
})
