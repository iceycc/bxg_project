import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import MyFooter from "../../components/MyFooter/Index.jsx";



export default class Index17 extends Component {
  config = {
    navigationBarTitleText: "外部 样式"
  };
  constructor(props){
    super(props);
  }

  render() {
   
    return (
      <View className="index">
    <MyFooter my-class="red-font" />
      </View>
    );
  }
}
