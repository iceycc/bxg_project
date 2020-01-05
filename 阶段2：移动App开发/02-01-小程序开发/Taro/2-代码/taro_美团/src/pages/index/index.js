import Taro, { Component } from '@tarojs/taro'
import { View, Text,Navigator,Image } from '@tarojs/components'
import './index.less'
import jiangli from "../../imgs/jiangli.png";

import QQMapWX from "../../qqmap-wx-jssdk1.0/qqmap-wx-jssdk.js";
import MtLocation from "../../components/MtLocation/Index.jsx";
import MtSwiper from "../../components/MtSwiper/Index.jsx";
import MtNav from "../../components/MtNav/Index.jsx";
import MtGroup from "../../components/MtGroup/Index.jsx";
import MtAd from "../../components/MtAd/Index.jsx";
import MtShop from "../../components/MtShop/Index.jsx";

var demo = new QQMapWX({
  key: 'FQLBZ-474AU-DGTVG-2DOZU-STEE3-JQFL4' // 必填
});

export default class Index extends Component {
  constructor(props){
    super(props);
    // 初始化
    this.state={
      city:"",
      swiperArr:[],
      navArr:[],
      groupArr:[],
      adArr:[],
      shopArr:[]
    }
  }

  config = {
    navigationBarTitleText: '美团'
  }

  // 获取用户的地理位置信息
  async getLocation(){
    let point= await Taro.getLocation({});
    let latitude=point.latitude;
    let longitude=point.longitude;

    let city=(await this.reverseGeocoder({latitude,longitude})).result.address_component.city;
    
    this.setState({ city:city });

    // 获取商店信息
    let shopArr=(await this.getShopArr());

    // 商店的经纬度数组
    let shopArrDis=shopArr.map((v,i)=>{
      return {
        latitude:v.distance.lat,
         longitude:v.distance.lng
      }
    });

    let disObj={
      from:{latitude,longitude},
      to:shopArrDis
    };
    // 发送请求去计算距离
    let disArr=(await this.calculateDistance(disObj)).result.elements;
    // console.log(res);

    let newShopArr=shopArr.map((v,i)=>{
      v.dis=disArr[i].distance;
      return v;
    });

    this.setState({
      shopArr:newShopArr
    })
  }

  // 获取轮播图的数据
  async getSwiperArr(){
    let swiperArr=(await Taro.request({
      url:"https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/swiper"
    })).data.data;
    console.log(swiperArr);
    this.setState({
      swiperArr:swiperArr
    })
  }

  // 获取首页导航数据
  async getNavArr(){
    let navArr=(await Taro.request({
      url:"https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/entry"
    })).data.data;
    // console.log(res);
    this.setState({
      navArr:navArr
    });
  }
  // 获取拼团数据
  async getGroupArr(){
    
    let groupArr=(await Taro.request({
      url:"https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/pingtuan"
    })).data.data;
    // console.log(res);
    this.setState({
      groupArr:groupArr
    });
  }

  // 获取广告组数据
  async getAdArr(){
    let adArr=(await Taro.request({
      url:"https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/ad"
    })).data.data;

    // console.log(adArr);
    this.setState({
      adArr:adArr
    })
  }

  // 获取猜你喜欢数据 商品
  async getShopArr(){
    let shopArr=(await Taro.request({
      url:"https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3/index/like"
    })).data.data;
    // console.log(res);

    // this.setState({
    //   shopArr:shopArr
    // });
    return shopArr;
  }

  componentDidMount () { 
    this.getLocation();
    this.getSwiperArr();
    this.getNavArr();
    this.getGroupArr();
    this.getAdArr();
    // this.getShopArr();
  }

  reverseGeocoder(obj){
    return new Promise((r,j)=>{
      demo.reverseGeocoder({
        location: {
            latitude: obj.latitude,
            longitude: obj.longitude
        },
        success: function(res) {
           r(res);
        },
        fail: function(res) {
            j(res);
        }
    });
    }) 
  }

  calculateDistance(obj){
    return new Promise((r,j)=>{
      demo.calculateDistance({
        from:obj.from,
        to:obj.to,
        success: function(res) {
          r(res);
        },
        fail: function(res) {
           j(res);
        }
    });
    })
  }
  

  render () {
    return (
      <View className='index'>
       <MtLocation city={this.state.city} />
       <MtSwiper swiper_arr={this.state.swiperArr} />
       <MtNav navs={this.state.navArr} />
       <Navigator> <Image mode="widthFix" style="width:100%;"  src={jiangli}></Image> </Navigator>
       <MtGroup groupArr={this.groupArr} />
       <MtAd adArr={this.state.adArr} />
       <MtShop  shopArr={this.state.shopArr} />
      </View>
    )
  }
}

