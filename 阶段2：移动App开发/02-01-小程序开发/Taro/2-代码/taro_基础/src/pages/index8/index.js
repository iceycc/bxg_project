import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";


export default class Index8 extends Component {
  config = {
    navigationBarTitleText: "index8-setState异步"
  };
  constructor(props){
    super(props);

    // 初始化state
    this.state={
      count:0
    };
    // 修改count
    // this.setState({
    //   count:1
    // })
    // console.log(this.state.count);

    // setState 增加回调函数
    this.setState({
      count:100
    },()=>{
      // 成功获取到修改后的count值
      console.log(this.state.count);
    });
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {

    return (
      <View className="index">
  index8-setState异步
      </View>
    );
  }
}
