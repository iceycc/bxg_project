import Taro,{ Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.less";

class Index extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <View>
     {this.props.renderHeader}
     {this.props.children}
     {this.props.renderFooter}
    </View>
  }
}