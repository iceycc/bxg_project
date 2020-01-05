import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import Login from "../../components/Login/Index.jsx";


export default class Index13 extends Component {
  config = {
    navigationBarTitleText: "元素变量+if"
  };
  constructor(props){
    super(props);

    // 初始化
    this.state={
      isLogin:false
    }
  
  }

  componentDidMount(){
    // 2s过后 变成 已经登录
    setTimeout(() => {
      
      // 修改状态
      this.setState({
        isLogin:true
      })
    }, 2000);
  }

  render() {

    return (
      <View className="index">
   <Login isLogin={this.state.isLogin} />
      </View>
    );
  }
}
