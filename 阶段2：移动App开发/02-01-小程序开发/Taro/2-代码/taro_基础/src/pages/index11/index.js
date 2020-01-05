import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";


export default class Index11 extends Component {
  config = {
    navigationBarTitleText: "事件传递参数"
  };
  constructor(props){
    super(props);

  }

  clickHandle(param1,e){
    console.log(param1,e);

  }
  render() {

    return (
      <View className="index">
    <View onClick={this.clickHandle.bind(this,"猫")}>标签1</View>
    <View onClick={this.clickHandle.bind(this,"狗")}>标签2</View>
      </View>
    );
  }
}
