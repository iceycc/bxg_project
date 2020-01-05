import React from 'react'
import App, { Container } from 'next/app'
import Layout from '../components/layout/layout'

export default class MyApp extends App {
    // 获取到子组件中的prpos对象
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
        const { Component, ...pageProps } = this.props

        return (
            <Container>
                {/* 改造成利用Layout组件替换此处的Component,将Component组件提取到layout组件中进行执行 */}                
                <Layout Component={Component} {...pageProps}>

                </Layout>
                
            </Container>
        )
    }
}