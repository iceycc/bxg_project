import Taro, { Component } from "@tarojs/taro";
import { View, Text, Navigator,Image } from "@tarojs/components";
import "./index.less";

class Index extends Component {
  // 开启全局样式类
  static options = {
    addGlobalClass: true
  };
  constructor(props) {
    super(props);
  }

  render() {
    // 接收数据
    let shopArr=this.props.shopArr;
    // 生成标签
    let elements=shopArr.map((v,i)=>{
      return (
        <Navigator key={i} className="item_nav">
        <View className="item_left"> <Image mode="widthFix" src={v.img_src} className="item_img"></Image> </View>
        <View className="item_right">
        <View className="item_info1"> 
        <Text className="shop_name"> {v.brand_name} </Text>
        <Text className="shop_dis">{v.dis}m</Text>
        </View>
        <View className="item_info2">
        <Text className="goods_name">{v.desc}</Text>
        </View>
        <View className="item_info3">
        <Text className="goods_price">￥{v.price}</Text>
        <Text className="goods_sell">已售{v.count}</Text>
        </View>
        <View className="item_info4">
        <Text className="goods_discount">{v.discount}</Text>

        </View>
        </View>
        </Navigator>
      )
    })
    return (
      <View className="mt_shop">
       <View className="mt_shop_title"> —— 猜你喜欢 —— </View>
       <View className="mt_shop_content">
       {elements}
       </View>
      </View>
    );
  }
}
