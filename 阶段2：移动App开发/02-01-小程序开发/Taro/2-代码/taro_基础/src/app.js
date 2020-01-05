import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index18/index',
      'pages/index17/index',
      'pages/index16/index',
      'pages/index15/index',
      'pages/index14/index',
      'pages/index13/index',
      'pages/index12/index',
      'pages/index11/index',
      'pages/index10/index',
      'pages/index9/index',
      'pages/index8/index',
      'pages/index7/index',
      'pages/index6/index',
      'pages/index5/index',
      'pages/index4/index',
      'pages/index3/index',
      'pages/index2/index',
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#0094ff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    // console.log('onLaunch');
    // console.log(this.$router.params);
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
