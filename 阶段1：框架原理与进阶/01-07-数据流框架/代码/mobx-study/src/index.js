import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { observable, action, computed, configure, runInAction, autorun, when, reaction } from 'mobx'
import { observer } from 'mobx-react'
// import './es6/decorator'

configure({
  enforceActions: 'observed'
})

// 1. 初始化 mobx 容器仓库
class Store {
  @observable count = 101
  @observable foo = 'bar'
  @action.bound increment () {
    this.count++
  }
  @observable price = 10
  @computed get totalPrice () {
    return this.price * this.count
  }

  @action.bound change () {
    this.count = 10
    this.foo = 'hello'
    this.foo = 'world'
  }

  @action.bound changeFoo () {
    this.foo = 'world'
  }

  @action.bound asyncChange (value) {
    setTimeout(() => {
      // this.count = 100
      // 1. 定义 action 函数
      // this.changeCount()
      // 2. 直接调用 action 函数
      // action('changeFoo', () => {
      //   this.foo = 'hello'
      // })()
      // 3. runInAction
      runInAction(() => {
        this.count = value
      })
    }, 100)
  }

  @action.bound changeCount (value = 20) {
    this.count = value
  }
}

const store = new Store()

// autotun 默认会执行一次
// 然后是当内部所依赖的被观测的数据发生改变的时候重新出发执行
autorun(() => {
  console.log('autorun => ', store.count)
})

store.changeCount()
store.changeFoo()

// 当 count > 100 的时候，只执行一次自定义逻辑
when(
  () => {
    return store.count > 100
  },
  () => {
    console.log('when => ', store.count)
  }
)

// 不同于 autorun 和 when
// reaction 只有当被观测的数据发生改变的时候，才会执行
reaction(
  () => {
    // 执行一些业务逻辑操作，返回数据给下一个函数使用
    return store.count
  },
  (data, reaction) => {
    console.log('reaction => ', data)

    // 手动停止当前 reaction 的监听
    reaction.dispose()
  }
)

store.changeCount(200)
store.changeCount(300)

// 2. 在组件中使用 mobx 容器状态
@observer
class App extends React.Component {
  render () {
    const { store } = this.props
    return (
      <div>
        <h1>App Component</h1>
        <p>{store.count}</p>
        <p>
          <button onClick={store.increment}>Increment</button>
        </p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
        <p>Total: {store.totalPrice}</p>
      </div>
    )
  }
}

// 3. 在组件中发起 action 修改容器状态

ReactDOM.render(<App store={new Store()} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
