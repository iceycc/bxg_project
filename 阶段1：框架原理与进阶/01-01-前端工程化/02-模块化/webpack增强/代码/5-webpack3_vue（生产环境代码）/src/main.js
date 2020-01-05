import Vue from 'vue'
import moment from 'moment'
// import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload'

//集成中间件/插件【注意：必须是基于Vue的】
// Vue.use(ElementUI) //把它提供的组件都进行的注册
Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: require("./statics/site/images/01.gif"),
    // loading: '/src/statics/site/images/01.gif',
    attempt: 1
})

//导入根组件
import App from './App'

//按需导入Element-UI的组件
import {
    Button,
    Pagination,
    Input,
    InputNumber,
    Switch,
    Form,
    FormItem,
    Radio,
    RadioGroup,
    MessageBox,
    Message,
    Carousel,
    CarouselItem,
    Row,
    Col
} from 'element-ui'

Vue.use(Button) //自动导入element-ui/lib/theme-chalk/button.css
Vue.use(Pagination)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

//导入全局样式
//导入element-ui的样式
// import 'element-ui/lib/theme-chalk/index.css'
import "./statics/site/css/style.css"

//过滤器相关
Vue.filter('dateFmt',(input,formatStr='YYYY-MM-DD')=>{
    return moment(input).format(formatStr)
})

// 导入router
import router from './router' //如果router文件夹下有index.js它加载的就是index.js
// 导入store
import store from './store'

new Vue({
    el:"#app",
    router,
    store,
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    // render:function(createElement){
    //     return createElement(App)
    // }
    render:createElement=>{
        return createElement(App)
    }
}) 
