import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'
import MyHeader from "../../components/MyHeader/Index.jsx";

export default class Index4 extends Component {

  config = {
    navigationBarTitleText: 'index4'
  }

  componentWillMount () { }

  componentDidMount () { 
  
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    return (
      <View className='index'>
      <MyHeader />
      </View>
    )
  }
}

