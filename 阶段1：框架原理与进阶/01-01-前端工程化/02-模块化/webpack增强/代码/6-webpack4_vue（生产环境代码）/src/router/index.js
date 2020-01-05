import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) //Vue.prototype.$route Vue.prototype.$router

//导入axios
import axios from 'axios'
axios.defaults.baseURL = "http://47.106.148.205:8899/"
axios.defaults.withCredentials = true //允许携带cookie
Vue.prototype.$axios = axios

//路由相关
//默认导入 ，如果 goodslist加了 {}，就称之为按需导入
// import goodslist from '@/components/goods/goodslist'
// import shopcart from '@/components/shopcart/shopcart'
// import goodsinfo from '@/components/goods/goodsinfo'
// import order from '@/components/order/order'
// import login from '@/components/account/login'
// import payOrder from '@/components/pay/payOrder'
// import paySuccess from '@/components/pay/paySuccess'
// import vipcenter from '@/components/vipcenter/vipcenter'
// import myOrders from '@/components/vipcenter/myOrders'
// import orderInfo from '@/components/vipcenter/orderInfo'

const goodslist = () => import(/* webpackChunkName: "goodslist" */ '@/components/goods/goodslist')
const shopcart = () => import(/* webpackChunkName: "shopcart" */ '@/components/shopcart/shopcart')
const goodsinfo = () => import(/* webpackChunkName: "goodsinfo" */ '@/components/goods/goodsinfo')
const order = () => import(/* webpackChunkName: "order" */ '@/components/order/order')
const login = () => import(/* webpackChunkName: "login" */ '@/components/account/login')
const payOrder = () => import(/* webpackChunkName: "payOrder" */ '@/components/pay/payOrder')
const paySuccess = () => import(/* webpackChunkName: "paySuccess" */ '@/components/pay/paySuccess')
const vipcenter = () => import(/* webpackChunkName: "vipcenter" */ '@/components/vipcenter/vipcenter')
const myOrders = () => import(/* webpackChunkName: "myOrders" */ '@/components/vipcenter/myOrders')
const orderInfo = () => import(/* webpackChunkName: "orderInfo" */ '@/components/vipcenter/orderInfo')

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {path:'/goodslist',component:goodslist},
        {path:'/shopcart',component:shopcart},
        {path:'/goodsinfo/:goodsId',component:goodsinfo},
        {path:'/login',component:login},
        // {path:'/order/:ids',component:order} //这种传参，我们称之为params
        {path:'/order',component:order,meta:{needLogin:true}},
        {path:'/pay',component:payOrder,meta:{needLogin:true}},
        {path:'/paySuccess',component:paySuccess,meta:{needLogin:true}},
        {path:'/vipcenter',component:vipcenter,meta:{needLogin:true}},
        {path:'/myOrders',component:myOrders,meta:{needLogin:true}},
        {path:'/orderInfo/:orderId',name: 'orderInfo',component:orderInfo,meta:{needLogin:true}}
    ]
})

//导航守卫
router.beforeEach((to, from, next) => {
    // ...
    if(to.fullPath != '/login'){
        localStorage.setItem('toVisitPath',to.fullPath)
    }

    if(to.meta.needLogin){//需要判断登录
        //判断是否登录过，如果登录过，直接next
        //如果没有登录过，去登录组件
        axios.get(`site/account/islogin`).then(res=>{
            if(res.data.code === 'nologin'){//未登录
                router.push('login')
            }else{//登录
                next()
            }
        })
    }else{
        //直接导航到组件中去
        next()
    }
})

//导出 router
export default router