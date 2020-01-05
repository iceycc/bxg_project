
// 1.0 导入头部和底部组件对象
import Head from './head'
import Bottom from './bottom'

export default class layout extends React.Component {
    render() {
        // 接收_app.js中传入的component和pageProps这两个对象
        const { Component, ...pageProps } = this.props

         return (<div>
            {/* 1.0 头部 */}
            <Head></Head>
          
            {/* 2.0 根据不同请求产生这个请求对应组件中的内容 */}
            <Component {...pageProps} />
            {/* 3.0 底部 */}
            <Bottom></Bottom>
        </div>)
    }
}