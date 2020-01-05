import React from 'react'
import App, { Container } from 'next/app'
import MovieLayout from '../layouts/MovieLayout'

class Layout extends React.Component {
  render () {
    const {children} = this.props
    return (
      <MovieLayout>
        {children}
      </MovieLayout>
    )
  }
}

export default class MyApp extends App {
  render () {
    const {Component, pageProps} = this.props
    return <Container>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Container>
  }
}