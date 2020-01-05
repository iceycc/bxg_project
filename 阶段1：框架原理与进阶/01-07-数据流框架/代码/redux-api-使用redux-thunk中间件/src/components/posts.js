import React, { Component } from 'react'

class Posts extends Component {
  render() {
    return (
      <div>
        <h2>Async Component</h2>
        <p>{this.props.state.posts.loading ? 'Loading...' : '加载完成'}</p>
        <ul>
        </ul>
      </div>
    )
  }
}

export default Posts
