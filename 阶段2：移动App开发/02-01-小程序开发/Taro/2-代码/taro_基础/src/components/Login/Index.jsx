import Taro,{ Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

class Index extends Component{
  constructor(props){
    super(props);
  }
 

  render(){
   
    let isLogin=this.props.isLogin;

    return <View className="login">
    {/* && */}
    {/* {isLogin&&<Text>已经登录 组件</Text>}
    {!isLogin&&<Text>未登录 组件</Text>} */}

    {/* 三元运算符 */}
    {isLogin?<Text>已经登录</Text>:<Text>未登录</Text>    }
    </View>
  }

  // render(){
  //   // 要渲染的标签 
  //   let element=null;
  //   // 判断是否已经登录
  //   if(this.props.isLogin){
  //     element=<View>已经登录</View>
  //   }else{
  //     element=<View>未登录</View>
  //   }
  //   return <View className="login">
  //   {element}
  //   </View>
  // }
}