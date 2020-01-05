import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.less";
import Person from "../../components/Person/Index.jsx";

export default class Index6 extends Component {
  config = {
    navigationBarTitleText: "index6"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    // let p={
    //   name:"小红",
    //   height:150,
    //   isMale:false
    // };
    return (
      <View className="index">
      {/* 不支持。。。 延展运算符 */}
      {/* <Person ...p></Person> */}
      <Person name='小红' height={150} isMale={false}  />
      <Person name='小蓝' height={250} isMale={true}  />
      </View>
    );
  }
}
