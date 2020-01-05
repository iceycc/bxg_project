<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orderInfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderInfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderInfo.area}}{{orderInfo.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orderInfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderInfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                            <dd>{{orderInfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                               <img id="imgLogo" src="../../statics/site/images/alipay.png" hidden>
                                <div id="container2">
                                    <canvas width="300" height="300"></canvas>
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
//导入js
import "../../statics/site/js/jqueryplugins/qrcode/qrcode";

import Vue from 'vue'

export default {
  data() {
    return {
      orderInfo: {},
      interval: 0
    };
  },
  created() {
    this.getOrderInfoData();
    this.cycleGetPayStatus();
  },
  methods: {
    getOrderInfoData() {
      const url = `site/validate/order/getorder/${this.$route.query.orderId}`;

      this.$axios.get(url).then(res => {
        const orderInfo = res.data.message[0];
        if (orderInfo.status === 2) {
          this.$router.push("paySuccess");
        } else {
          this.orderInfo = orderInfo;
        }
      });
    },
    cycleGetPayStatus() {
      this.interval = setInterval(() => {
        const url = `site/validate/order/getorder/${this.$route.query.orderId}`;

        this.$axios.get(url).then(res => {
          const orderInfo = res.data.message[0];

          if (orderInfo.status === 2) {
            this.$router.push("paySuccess");
          }
        });
      }, 3000);
    }
  },
  mounted() {
    //图片logo
    setTimeout(() => {
      $("#container2").erweima({
        text: "https://www.baidu.com",
        mode: 4,
        mSize: 30,
        image: $("#imgLogo")[0]
      });
    }, 0);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  }
};
</script>
