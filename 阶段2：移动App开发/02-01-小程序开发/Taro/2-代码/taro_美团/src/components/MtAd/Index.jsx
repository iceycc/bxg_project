import Taro, { Component } from "@tarojs/taro";
import { View,  Navigator,Image } from "@tarojs/components";
import "./index.less";

class Index extends Component {
  // 开启全局样式类
  static options = {
    addGlobalClass: true
  };
  constructor(props) {
    super(props);
  }

  render() {
    // 接收数据
    let adArr=this.props.adArr;
    let elements=adArr.map((v,i)=>{
      return (
        <Navigator className="ad_nav" key={i}>
          <Image mode="widthFix" className="ad_img" src={v.img} ></Image>
        </Navigator>
      )
    })
    return (
      <View className="mt_ad">
      {elements}
      </View>
    );
  }
}
