import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/layout/layout'
import AdminLayout from '../components/admin/layout.js'
// redux步骤1：导入store/index  其中persistor是store持久化使用
import {initStore,persistor} from '../store/index.js'

// store持久化步骤2导入PersistGate组件
import {PersistGate} from 'redux-persist/integration/react'

// redux步骤2：从next-redux-wrapper中导入withRedux方法
import withRedux from 'next-redux-wrapper'

// redux步骤3：导入一个Provider 组件,将来作为layout的父附件
import {Provider} from 'react-redux'

// 1.0 低版本浏览器中可以正常使用promise兼容性处理
require('es6-promise').polyfill();  
/*
Next.js项目中有一种数据请求是会在组件的await async getInitialProps()方法中去请求数据，而getInitialProps方法会在nodejs服务器执行，不会在浏览器中执行
保证在nodejs环境中也能利用isomorphic-fetch请求数据服务api，需要全局导入一下
*/
import 'isomorphic-fetch'

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
                {/* // store持久化步骤3 将PersistGate组件当做layout的根组件 */}
                <PersistGate persistor={persistor}>
                    {/* 改造成利用Layout组件替换此处的Component,将Component组件提取到layout组件中进行执行 */} 
                    {
                        this.props.pageProps && this.props.pageProps.isadmin?
                        <AdminLayout Component={Component} {...pageProps}></AdminLayout>
                        :
                         <Layout Component={Component} {...pageProps}></Layout>
                    }  
                 </PersistGate>
                </Provider>
            </Container>
        )
    }
}

// redux步骤4：包装MyApp，使得store能够绑定到myapp中的props上
export default withRedux(initStore)(MyApp)