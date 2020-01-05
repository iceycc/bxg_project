import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";



export default class Index14 extends Component {
  config = {
    navigationBarTitleText: "列表渲染"
  };
  constructor(props){
    super(props);

    // 初始化 水果数组
    this.state={
    arr:["苹果","香蕉","西瓜","哈密瓜"]
    }
  
  }

  render() {
    // 生成标签数组 map循环
    let elements=this.state.arr.map((v,i)=>{
      return (
        <View key={i} >{v} + {i} </View>  
      )
    });
    return (
      <View className="index">
   {elements}
      </View>
    );
  }
}
