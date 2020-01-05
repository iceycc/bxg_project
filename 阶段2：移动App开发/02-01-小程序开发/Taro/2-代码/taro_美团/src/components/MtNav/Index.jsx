import Taro, { Component } from "@tarojs/taro";
import { View, Text,Navigator } from "@tarojs/components";
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
    // 接收数组
    let navs=this.props.navs;
    let elements=navs.map((v,i)=>{
      return (
        <Navigator key={i} className="mt_navigator">
          <Text className={"iconfont icon "+v.icon } ></Text>
          <View className="mt_nav_text">{v.text}</View>
        </Navigator>
      )
    })

    return (
      <View className="mt_nav">
      {elements}
      </View>
    );
  }
}
