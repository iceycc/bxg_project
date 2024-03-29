import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/layout/layout'

// redux步骤1：导入store/index
import {initStore} from '../store/index.js'

// redux步骤2：从next-redux-wrapper中导入withRedux方法
import withRedux from 'next-redux-wrapper'

// redux步骤3：导入一个Provider 组件,将来作为layout的父附件
import {Provider} from 'react-redux'


 class MyApp extends App {
    // 获取到子组件中的prpos对象
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
        const { Component,store, ...pageProps } = this.props

        return (
            <Container>
                {/* redux步骤三：通过Provider拿到store传入到所有的子组件 */}
                <Provider store={store}>
                    {/* 改造成利用Layout组件替换此处的Component,将Component组件提取到layout组件中进行执行 */}                
                    <Layout Component={Component} {...pageProps}>

                    </Layout>
                </Provider>
            </Container>
        )
    }
}

// redux步骤4：包装MyApp，使得store能够绑定到myapp中的props上
export default withRedux(initStore)(MyApp)