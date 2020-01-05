import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";

export default class Index5 extends Component {
  config = {
    navigationBarTitleText: "index5"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <View data-title={1 + 2 + 3}>加法运算</View>
        <View data-title="大头">大头</View>
        <View data-title={"大头"}>大头</View>
        <View hidden>显示</View>
        <View hidden={true}>显示</View>

        <View />

        <View />

        <View>{false}</View>

        <View>{null}</View>

        <View>{undefined}</View>

        <View>{true}</View>
      </View>
    );
  }
}
