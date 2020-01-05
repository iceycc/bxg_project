//导入Vue
import Vue from 'vue'

//导入App.vue
import App from './App.vue'

//创建根实例，渲染根组件
new Vue({
    render:h=>h(App)
}).$mount("#app")