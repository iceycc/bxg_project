import Taro,{ Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

class Index extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <View>
      <View className="header">头部</View>
      <View className="main"> {this.props.children}  </View>
      <View className="footer">尾部 </View>
    </View>
  }
}