import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import Dialog from "../../components/Dialog/Index.jsx";



export default class Index15 extends Component {
  config = {
    navigationBarTitleText: "children"
  };
  constructor(props){
    super(props);

  
  
  }

  render() {
   
    return (
      <View className="index">
  <Dialog>
    <View>父组件传递过来的标签</View>
  </Dialog>
      </View>
    );
  }
}
