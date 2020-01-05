import Taro,{ Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

class Index extends Component{
  // 声明外部类
  static externalClasses=["my-class"];
  constructor(props){
    super(props);
  }

  render(){
    return <View className="my-class" >
     组件的尾部
    </View>
  }
}