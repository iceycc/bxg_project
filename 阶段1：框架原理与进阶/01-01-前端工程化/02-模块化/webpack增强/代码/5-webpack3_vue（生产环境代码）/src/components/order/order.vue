<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form :model="orderForm" :rules="rules" ref="orderForm" label-width="150px" class="demo-ruleForm">
                                    <el-form-item label="收货人姓名：" prop="accept_name">
                                        <el-input style="width:500px;" v-model="orderForm.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区：" prop="area">
                                        <v-distpicker :province="orderForm.area.province.value" :city="orderForm.area.city.value" :area="orderForm.area.area.value" @selected="onSelected"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址：" prop="address">
                                        <el-input style="width:500px;" v-model="orderForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码：" prop="mobile">
                                        <el-input style="width:500px;" v-model="orderForm.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱：">
                                        <el-input style="width:500px;" v-model="orderForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码：">
                                        <el-input style="width:250px;" v-model="orderForm.post_code"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="orderForm.payment_id" label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio-group @change="expressChange" v-model="orderForm.express_id">
                                        <el-radio label="1">顺丰快递
                                            <em>费用：20.00元 </em>
                                        </el-radio>

                                        <el-radio label="2">圆通快递
                                            <em>费用：10.00元</em>
                                        </el-radio>

                                        <el-radio label="3">韵达快递
                                            <em>费用：8.00元</em>
                                        </el-radio>

                                    </el-radio-group>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img style="width:50px;height:50px;" :src="item.img_url">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price * item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" v-model="orderForm.message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{orderForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getTotalAmount}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" @click="$router.push('shopcart')">返回购物车</a>
                                        <a id="btnSubmit" @click="goToOrder" class="btn submit">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VDistpicker from "v-distpicker";

import { getLocalGoods } from "../../common/localStorageHelper";

import {DELETEGOODSBYID} from '@/store/mutation-types'

export default {
  components: { VDistpicker },
  data() {
    /**
     * rule 检验对象
     * value 用户输入的要校验的原始值
     * callback 回调，决定是否校验成功
     */
    const checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号码"));
      }

      var myreg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
      if (!myreg.test(value)) {
        callback(new Error("手机号不正确"));
      } else {
        callback();
      }
    };

    return {
      goodsList: [], //要结算的商品列表
      totalCount:0,
      totalPrice:0,
      orderForm: {
        //该对象就是最终点击确认提交需要提交给后台的对象
        accept_name: "陈华", //收货人姓名
        area: {
          //所属地区
          province: { code: 440000, value: "广东省" },
          city: { code: 440300, value: "深圳市" },
          area: { code: 440306, value: "宝安区" }
        },
        address: "中粮商务公园", //详细地址
        mobile: "13838389438",
        email: "chenhuasvip@163.com",
        post_code: "350011",
        payment_id: "6", //在线支付
        express_id: "1", //快递方式 顺丰 圆通 韵达
        expressMoment:20, //运费，默认是20
        message:'请快点发货', //留言
        goodsAmount:0,//商品总额
      },
      rules: {
        //设置表单的校验规则
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        area: [{ required: true, message: "请输入所属地区", trigger: "blur" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        mobile: [{ required: true, validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getGoodsListData();
  },
  computed:{
    getTotalAmount(){
        return this.totalPrice + this.orderForm.expressMoment
    }  
  },
  methods: {
    onSelected(data) {
      this.orderForm.area = data;
    },
    expressChange(label){//快递方式变更之后，触发的函数
        switch (label) {
            case "1":
                this.orderForm.expressMoment = 20
                break;

            case "2":
                this.orderForm.expressMoment = 10
                break;

            case "3":
                this.orderForm.expressMoment = 8
                break;
        
            default:
                break;
        }

    },
    //获取要结算的商品的信息
    getGoodsListData() {
      const url = `site/validate/order/getgoodslist/${this.$route.query.ids}`;

      //后台需要的ids
      this.orderForm.goodsids = this.$route.query.ids

      const localGoods = getLocalGoods();
      const tempObj = {}

      this.$axios.get(url).then(res => {
        let tempTotalCount = 0
        let tempTotalPrice = 0
        res.data.message.forEach(item => {
          item.buycount = localGoods[item.id];

          tempObj[item.id] = item.buycount

          tempTotalCount+=item.buycount
          tempTotalPrice+=item.buycount * item.sell_price
        });
        this.totalCount = tempTotalCount
        this.totalPrice = tempTotalPrice

        //服务器需要的参数
        this.orderForm.goodsAmount = tempTotalPrice
        this.orderForm.cargoodsobj = tempObj

        this.goodsList = res.data.message;
      });
    },
    //下订单
    goToOrder(){
        this.$refs.orderForm.validate((valid) => {
          if (valid) {
            //发送请求之前，必须确保 orderForm 中的数据，满足后台的需要
            const url = `site/validate/order/setorder`

            this.$axios.post(url,this.orderForm).then(res=>{
                if(res.data.status !== 0){
                    this.$message.error(res.data.message);
                    return
                }

                //成功
                //1、跳转到支付组件中去 /pay?orderId=701
                this.$router.push({path:'pay',query:{orderId:res.data.message.orderid}})

                //2.清空已经结算的本地数据
                const ids = this.$route.query.ids.split(',')
                ids.forEach(id=>{
                    this.$store.commit(DELETEGOODSBYID,id)
                })
            })
          } else {
            this.$message.error('检查信息是否填写完整!');
          }
        });
    }
  }
};
</script>