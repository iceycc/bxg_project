
//注意点：_document.js文件名称是不能改变的，并且一定是要有一个继承与 Document的类导出
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  
  render() {
    return (
      <html>
        <Head>
            {/* 导入全局样式文件，使得所有的antd组件均能应用上样式 */}
            <link rel="stylesheet" href="/static/css/antd.css"/>
            <link rel="stylesheet" href="/static/css/base.css"/>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}