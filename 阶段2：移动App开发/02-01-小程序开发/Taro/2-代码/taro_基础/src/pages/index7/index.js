import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import Cat from "../../components/Cat/Index.jsx";

export default class Index7 extends Component {
  config = {
    navigationBarTitleText: "index7"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {

    return (
      <View className="index">
    <Cat say="猫叫" />
    <Cat say="超级猫叫" />
      </View>
    );
  }
}
