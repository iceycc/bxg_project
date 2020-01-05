import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import BlueCom from "../../components/BlueCom/Index.jsx";
import RedCom from "../../components/RedCom/Index.jsx";


export default class Index12 extends Component {
  config = {
    navigationBarTitleText: "事件的传递"
  };
  constructor(props){
    super(props);

    // 初始化state
    this.state={
      bgColor:"pink"
    }
  }
  clickHd(bgColor){
    // console.log(bgColor);
    // 赋值
    this.setState({
      bgColor:bgColor
    })
  }
  render() {

    return (
      <View style={{backgroundColor:this.state.bgColor}} className="index">
      {/* 组件直接写onclick只是做了事件的传递 不会触发事件 */}
    <BlueCom onClick={this.clickHd} />
    <RedCom onClick={this.clickHd} />
      </View>
    );
  }
}
