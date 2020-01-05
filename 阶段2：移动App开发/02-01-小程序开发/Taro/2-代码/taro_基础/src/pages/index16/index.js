import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import Dialog2 from "../../components/Dialog2/Index.jsx";



export default class Index16 extends Component {
  config = {
    navigationBarTitleText: "组合"
  };
  constructor(props){
    super(props);
  }

  render() {
   
    return (
      <View className="index">
     <Dialog2
      renderHeader={ <View className="header">组合的头部</View> }
      renderFooter={ <View className="footer">组合的尾部</View> }
      >
      
      <View>组合的内部</View>
      
      </Dialog2>
      </View>
    );
  }
}
