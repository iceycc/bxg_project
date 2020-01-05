import Taro,{ Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

class Index extends Component{
  // 开启全局样式的设置
  static options={
    addGlobalClass:true
  }
 
  constructor(props){
    super(props);
  }

  render(){
    return <View className="blue-font"  >
    组件的内容
    </View>
  }
}