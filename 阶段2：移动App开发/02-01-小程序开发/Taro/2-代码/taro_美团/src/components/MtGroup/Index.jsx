import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input } from "@tarojs/components";
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
    let groupArr=this.props.groupArr;
    let elements=groupArr.map((v,i)=>{
      return (
        <Navigator key={i} className="mt_group_nav">
          <Image mode="widthFix" className="mt_goods_img" src={v.img_src} ></Image>
          <View className="goods_name">{v.brand_name}</View>
          <View className="price_row">
          <Text className="new_price">￥{v.price}</Text>
          <Text className="old_price">￥{v.old_price}</Text>
          </View>
        </Navigator>
      )
    })
    return (
      <View className="mt_group">
       <View className="mt_group_title">
       <Text className="mt_group_name1">好货拼团</Text>
       <Text className="mt_group_name2">全部</Text>
       </View>
       <View className="mt_group_content">
       {elements}
       </View>
      </View>
    );
  }
}
