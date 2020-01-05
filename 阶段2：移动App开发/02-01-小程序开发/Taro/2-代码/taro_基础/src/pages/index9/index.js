import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";


export default class Index9 extends Component {
  config = {
    navigationBarTitleText: "事件的绑定和触发"
  };
  constructor(props){
    super(props);

    // 绑定this 在taro中不需要绑定 this直接使用了。
    // this.clickHandle=this.clickHandle.bind(this);
  }
  // click事件的触发
  clickHandle(){
    console.log("点击触发了");
  }
  render() {

    return (
      <View className="index">
      <View onClick={this.clickHandle} >点我点我</View>
      </View>
    );
  }
}
