import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";
import PropTypes from "prop-types";

class Index extends Component {
  constructor(props) {
    super(props);
    // 这样写虽然可以运行，但是不推荐 
    // this.props.name="大白";
  }

  render() {
    return (
      <View className="person">
        <View>{this.props.name}</View>
        <View>{this.props.height}</View>
        <View>{this.props.isMale}</View>
      </View>
    );
  }
}

// 对接收到的属性做了类型的约束
Index.PropTypes={
  name:PropTypes.string,
  height:PropTypes.number,
  isMale:PropTypes.bool
}
