import Taro, { Component } from "@tarojs/taro";
import { View, Text, Input, Swiper,SwiperItem,Navigator,Image } from "@tarojs/components";
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
    // 循环生成标签
    let swiperArr=this.props.swiper_arr;
    let elements=swiperArr.map((v,i)=>{
      return (
        <SwiperItem className="mt_swiper_item" key={i}>
          <Navigator className="mt_swiper_nav">
            <Image className="mt_swiper_img" src={v.img_src}></Image>
          </Navigator>
        </SwiperItem>
      )
    })
    return (
      <View className="mt_swiper">
       <Swiper autoplay={true} indicator-dots={true}>
      {elements}
       </Swiper>
      </View>
    );
  }
}
