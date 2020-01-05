<template>
    <div>
        <!-- 1.0 头部 -->
        <div class="header">
            <!-- 1.0 导航栏头部 -->
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>黑马买买买</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <span v-show="!isLogin">
                            <router-link to="/login" class="">登录</router-link>
                            <strong>|</strong>
                            <a href="" class="">注册</a>
                            <strong>|</strong>
                        </span>
                        <span v-show="isLogin">
                            <router-link to="/vipcenter" class="">会员中心</router-link>
                            <strong>|</strong>
                            <a @click="logout">退出</a>
                            <strong>|</strong>
                        </span>
                        <router-link to="/shopcart" class="">
                            <i id="shoppingCartCount" class="iconfont icon-cart"></i>购物车(
                            <span>
                                <!-- <span>{{$store.getters.getBuyCount}}</span> -->
                                <!-- <span>{{getBuyCount}}</span> -->
                                <span>{{getMyCount}}</span>
                            </span>)</router-link>
                    </div>
                </div>
            </div>

            <!-- 2.0 导航条 -->
            <div class="head-nav">
                <div class="section">
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">首页</span>
                                </a>
                            </li>
                            <li class="news">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">每日精选</span>
                                </a>
                            </li>
                            <li class="photo">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">秒杀专区</span>
                                </a>
                            </li>
                            <li class="video">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">黑马超市</span>
                                </a>
                            </li>
                            <li class="down">
                                <a href="#" class="">
                                    <span class="out" style="top: 0px;">会员权益</span>
                                </a>
                            </li>
                            <li class="goods">
                                <router-link to="/goodslist" class="router-link-exact-active ">
                                    <span class="out" style="top: 0px;">购物商城</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 2.0 路由出口 -->
        <router-view></router-view>
        <!-- 3.0 底部 -->
        <div class="footer">
            <div class="section">
                <div class="foot-nav">
                    <a href="">关于我们</a>
                    <strong>|</strong>
                    <a href="">联系我们</a>
                    <strong>|</strong>
                    <a href="">联系客服</a>
                    <strong>|</strong>
                    <a href="">合作招商</a>
                    <strong>|</strong>
                    <a href="">商家帮助</a>
                    <strong>|</strong>
                    <a href="">营销中心</a>
                    <strong>|</strong>
                    <a href="">隐私政策</a>
                </div>
                <div class="foot-box">
                    <div class="copyright">
                        <p>版权所有 黑马买买买 </p>
                        <p>公司地址： 联系电话：</p>
                        <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                    </div>
                    <div class="service">
                        <p>周一至周日 9:00-24:00</p>
                        <a href="#">
                            <i class="iconfont icon-phone"></i>在线客服</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //加了default 就是默认导出
    //比如导出一个字符串 export default "你是个好人"
    import {bus} from './common/bus'

    //建立我们内部的计算属性和vuex中的对应关系
    import { mapGetters } from 'vuex'

    export default {
        computed:{
            // 使用对象展开运算符将 getter 混入 computed 对象中
            // 下面这么写，会手写在computed中，生成一个名字为
            //getBuyCount的计算属性，并且会建立和仓库中的getters的getBuyCount的对应关系
            // ...mapGetters([
            //     'getBuyCount'
            //     // ...
            // ])
            ...mapGetters({
                // 把 `this.getMyCount` 映射为 `this.$store.getters.getBuyCount`
                getMyCount: 'getBuyCount'
            })
        },
        created() {
            bus.$on('logined',isLogin=>{
                this.isLogin = isLogin
            })

            this.checkLogin()
        },
        methods:{
            //判断是否登录
            checkLogin(){
                this.$axios.get(`site/account/islogin`).then(res=>{
                    if(res.data.code === 'logined'){
                        this.isLogin = true
                    }else{
                        this.isLogin = false
                    }
                })
            },
            //退出
            logout(){
                this.$axios.get('site/account/logout').then(res=>{
                    if(res.data.status === 0){
                        //更改App.vue头部的状态
                        this.isLogin = false

                        //去首页
                        this.$router.push('goodslist')
                    }
                })
            }
        },
        data(){
            return {
                isLogin:false
            }
        },
        mounted() {
            $("#menu2 li a").wrapInner('<span class="out"></span>');
            $("#menu2 li a").each(function () {
                $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
            });

            $("#menu2 li a").hover(function () {
                $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
                $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

            }, function () {
                $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
                $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
            });
        },
    }
</script>

<style scoped>
    @import "./statics/site/js/jqueryplugins/hoverNav/css/style.css"
</style>