import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import './main.css'
Vue.config.productionTip = false

// 自定义Vue过滤器，格式化时间
Vue.filter('formatDate', function(value, format) {
  // 格式化时间
  let d = new Date(parseInt(value))
  return moment(d).format(format)
})

// 导入apollo相关插件
import VueApollo from 'vue-apollo'
Vue.use(VueApollo)

// 产生apollo客户端实例对象
import ApolloClient from 'apollo-boost'
const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

// 把apollo实例对象挂载到Vue实例中
new Vue({
  apolloProvider,
  render: h => h(App),
}).$mount('#app')
