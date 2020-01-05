import Taro,{ Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

class Index extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <View className="my_header">
      组件中的文字
    </View>
  }
}