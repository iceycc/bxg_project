import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Index2 extends Component {

  config = {
    navigationBarTitleText: 'index2'
  }

  componentWillMount () { }

  componentDidMount () { 
    // console.log('onReady');
    setTimeout(() => {
      Taro.navigateTo({
        url:"../index/index?id=pageindex2"
      })
    }, 2000);
  
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}

