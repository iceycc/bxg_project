// 引入SDK核心类
var QQMapWX = require('../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js');

// 实例化API核心类
var demo = new QQMapWX({
  key: 'FQLBZ-474AU-DGTVG-2DOZU-STEE3-JQFL4' // 必填
});



// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "获取中",
    // 轮播图
    swiperArr: [],
    // 首页导航数据
    navArr: [],
    // 拼团
    bookArr: [],
    // 广告数组
    advArr: [],
    // 猜你喜欢
    guessArr: []

  },
  // 获取地理位置
  getLocation() {
    let page = this;
    // 1 先通过微信小程序的api获取当前的经纬度
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        const latitude = res.latitude;
        const longitude = res.longitude;
        // 2 把经纬度转成广州 北京。。 要通过腾讯地图来实现
        // 调用接口
        demo.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (ret) {
            // console.log(ret);
            if (ret.status == 0) {
              let city = ret.result.address_component.city;
              page.setData({
                city: city
              })
            }
          },
          fail: function (ret) {
            console.log(ret);
          },
          complete: function (ret) {
            // console.log(res);
          }
        });

        // 获取猜你喜欢的数据
        page.getGuessArr(latitude,longitude);

      }
    })

  },
  // 获取轮播图
  getSwiperArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/swiper",
      success(res) {

        // console.log(res);
        if (res.statusCode == 200) {
          page.setData({
            swiperArr: res.data
          });
        }
      }
    })
  },
  // 获取导航数据
  getNavArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/entry",
      success(res) {

        console.log(res);
        if (res.statusCode == 200) {
          page.setData({
            navArr: res.data
          });
        }
      }
    })
  },
  // 获取拼团
  getBookArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/pingtuan",
      success(res) {

        console.log(res);
        if (res.statusCode == 200) {
          page.setData({
            bookArr: res.data
          });
        }
      }
    })
  },
  // 获取广告
  getAdvArr() {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/ad",
      success(res) {

        console.log(res);
        if (res.statusCode == 200) {
          page.setData({
            advArr: res.data
          });
        }
      }
    })
  },
  // 获取猜你喜欢
  getGuessArr(latitude,longitude) {
    let page = this;
    // 发送请求获取数据 
    wx.request({
      url: "http://api.meituan.com/index/like",
      success(res) {

        console.log(res);
        if (res.statusCode == 200) {
          // 添加一个新的属性 距离 dis = 人和商店的距离

          // 获取经纬度数组 从 guessArr 获取
          let disArr=res.data.map((v)=>{
            return {latitude:v.distance.lat,longitude:v.distance.lng};
          });

          // 调用腾讯地图的接口 来计算距离
          demo.calculateDistance({
            from:{
              latitude: latitude,
              longitude: longitude
            },
            to:disArr,
            success: function(result) {
                // console.log(result);
                if(result.status==0){
                  // guessArr 进行处理
                  let guessArr=res.data.map((v,i)=>{
                    v.dis=result.result.elements[i].distance;
                    return v;
                  });

                  page.setData({
                    guessArr:guessArr
                  })
                }


            },
            fail: function(result) {
                console.log(result);
            }
        });
        


          // page.setData({
          //   guessArr: res.data
          // });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation();
    this.getSwiperArr();
    this.getNavArr();
    this.getBookArr();
    this.getAdvArr();
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})