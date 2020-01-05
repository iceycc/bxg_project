// 导入根实例
import Vue from 'vue'

// 导入根组件
import App from './App.vue'

// console.log('123456')

new Vue({
	el: '#app',
	render: function(creatElement) {
		return creatElement(App)
	}
})
