import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Index3 extends Component {

  config = {
    navigationBarTitleText: 'index3'
  }

  componentWillMount () { }

  componentDidMount () { 
  
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    // 2px:1rpx
    // 100px:50rpx
    let fs=Taro.pxTransform(100);
    // console.log(fs);
    return (
      <View className='index'>
        <Text style={{fontSize:fs}}>Hello world!</Text>
      </View>
    )
  }
}

