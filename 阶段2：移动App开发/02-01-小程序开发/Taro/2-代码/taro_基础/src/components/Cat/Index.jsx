import Taro,{ Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

class Index extends Component{
  constructor(props){
    super(props);
    // 初始化state
    this.state={
      // msg:"猫叫"
      msg:this.props.say
    }
  }
  componentDidMount(){
    // 等待到标签都渲染完成了 就会触发
    setTimeout(() => {
      // 修改state的数据
      // 错误！！！
      // this.state.msg="猫猫猫叫";
      // 正确
      this.setState({
        msg:"猫猫猫叫"
      });
    }, 2000);
  }

  render(){
    return <View className="cat">
      {msg}
    </View>
  }
}