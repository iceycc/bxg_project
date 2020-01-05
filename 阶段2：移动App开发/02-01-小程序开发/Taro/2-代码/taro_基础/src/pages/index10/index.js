import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";


export default class Index10 extends Component {
  config = {
    navigationBarTitleText: "阻止事件冒泡"
  };
  constructor(props){
    super(props);

  }
  // 父元素的click点击事件
  pClick(){
    console.log("父元素触发");
  }
  // 子元素的click点击事件
  sClick(e){
    // 阻止事件冒泡
    e.stopPropagation();
    console.log("子元素的触发");
  }
  render() {

    return (
      <View className="index">
      <View onClick={this.pClick} >
      父元素
      <View onClick={this.sClick}>子元素</View>
      </View>
      </View>
    );
  }
}
