import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import foodslist from '../components/foodlist/foodlist'
import newslist from '../components/newslist/newslist'

const router = new VueRouter({
    routes:[
        {path:'/foods',component:foodslist},
        {path:'/news',component:newslist}
    ]
})

export default router