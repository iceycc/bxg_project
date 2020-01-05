<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div v-if="goods.goodsinfo" class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goods.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.thumb_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="count" :min="1" :max="goods.goodsinfo.stock_quantity" size="small"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button class="buy">立即购买</button>
                                                <button ref="addToShopCartRef" @click="addToShopCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="isShowIntroduction=true" :class="{ selected: isShowIntroduction }">商品介绍</a>
                                        </li>
                                        <li>
                                            <a :class="{ selected: !isShowIntroduction }" href="javascript:;" @click="isShowIntroduction=false">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-show="isShowIntroduction" class="tab-content entry" style="display: block;">
                                <div style="padding:5px;" v-html="goods.goodsinfo.content"></div>
                            </div>
                            <div v-show="!isShowIntroduction" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="textAreaRef" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentInfo.totalcount === 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentInfo.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[2, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="commentInfo.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 被动画的元素 -->
        <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div v-show="isShow" ref="animateRef" v-if="goods.imglist" class="animateDiv">
                <img :src="goods.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import "../../statics/site/js/jqueryplugins/jqimgzoom/css/magnifier.css";

.animateDiv {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
}

.animateDiv img {
  width: 100%;
  height: 100%;
}
</style>

<script>
import "@/statics/site/js/jqueryplugins/jqimgzoom/js/magnifier";

//按需导入
import { Affix } from "iview";
import { ADD_GOODS } from "@/store/mutation-types";
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      goods: {}, //商品数据
      count: 1, //购买数量
      isShowIntroduction: true, //是否显示商品介绍
      pageIndex: 1, //页码
      pageSize: 2, //页容量
      commentInfo: {}, //评论相关的信息，有总条数，当前页码的数据
      addToShopCartOffset: null, //动画开始时候的top、left
      shoppingCartCountOffset: null, //动画结束时候的top、left
      isShow: false //是否显示动画
    };
  },
  components: {
    //局部注册的组件，就是我们goodsinfo.vue的子组件
    Affix
  },
  watch: {
    $route: function(newValue) {
      //重新发送请求
      this.getGoodsData();
      //重新加载评论数据
      this.getCommentListData();
    }
  },
  created() {
    //发送获取商品信息的数据
    this.getGoodsData();
    //分页获取评论数据
    this.getCommentListData();
  },
  updated() {
    $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
  },
  methods: {
    //获取商品数据
    getGoodsData() {
      const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;

      this.$axios.get(url).then(res => {
        this.goods = res.data.message;

        setTimeout(() => {
          //获取动画开始时候的位置，并且把它保存起来
          this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset();
          //让图片移动到开始位置
          $(this.$refs.animateRef).css(this.addToShopCartOffset);

          //获取动画结束时候的位置，并且把它保存起来
          this.shoppingCartCountOffset = $("#shoppingCartCount").offset();
        }, 200);
      });
    },
    //分页获取评论数据
    getCommentListData() {
      const url = `site/comment/getbypage/goods/${
        this.$route.params.goodsId
      }?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;

      this.$axios.get(url).then(res => {
        this.commentInfo = res.data;
      });
    },
    //分页组件相关的方法
    //更改了页容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.pageIndex = 1;

      this.getCommentListData();
    },
    //更改了页码
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;

      this.getCommentListData();
    },
    //提交评论
    postComment() {
      //1.获取用户填写的内容
      const content = this.$refs.textAreaRef.value;

      if (content.trim().length === 0) {
        this.$message({
          message: "请填写评论内容!",
          type: "warning"
        });
        return;
      }

      //2.发送post请求
      const url = `site/validate/comment/post/goods/${
        this.$route.params.goodsId
      }`;
      this.$axios.post(url, { commenttxt: content }).then(res => {
        //1.提示评论成功
        this.$message({
          message: "评论成功!",
          type: "success"
        });

        //2.清空内容
        this.$refs.textAreaRef.value = "";

        //3.重新加载第一页数据
        this.pageIndex = 1;
        this.getCommentListData();
      });
    },
    //先创建一个 ADD_GOODS的方法，然后将该方法和store的mutations的某个方法建立好对应关系
    ...mapMutations([
      ADD_GOODS // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
    addToShopCart() {
      //加入到购物车
      this.isShow = true;

      //调用Vuex的mutations方法
      //载荷就是参数
      const goods = {
        goodsId: this.$route.params.goodsId,
        count: this.count
      };

      //同步，调用mutation
      // this.$store.commit(ADD_GOODS,goods)

      //异步 ，调用Action
      // this.$store.dispatch('addGoodsAsync',goods)

      this.ADD_GOODS(goods)
    },
    //动画相关的处理函数
    beforeEnter: function(el) {
      // ...
      el.style.top = `${this.addToShopCartOffset.top}px`;
      el.style.left = `${this.addToShopCartOffset.left}px`;
      el.style.transform = "scale(1)";
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function(el, done) {
      el.style.transition = "all .6s";

      //刷新动画帧
      el.offsetWidth;

      //设置结束位置
      el.style.top = `${this.shoppingCartCountOffset.top}px`;
      el.style.left = `${this.shoppingCartCountOffset.left}px`;
      el.style.transform = "scale(0.5)";
      // ...
      done();
    },
    afterEnter: function(el) {
      // ...
      this.isShow = false;
    }
  }
};
</script>