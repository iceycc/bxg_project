import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import MyMain from "../../components/MyMain/Index.jsx";



export default class Index18 extends Component {
  config = {
    navigationBarTitleText: "全局样式类"
  };
  constructor(props){
    super(props);
  }

  render() {
   
    return (
      <View >
   <MyMain />
      </View>
    );
  }
}
