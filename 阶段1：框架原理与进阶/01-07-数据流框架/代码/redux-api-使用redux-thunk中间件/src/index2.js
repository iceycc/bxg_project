import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'

// 1. 定义 reducer（用以创建容器使用）
//    第1个参数 state 就是容器的初始状态
//    第2参数 action 是修改 state 的行为类型
//       type 行为类型
//       payload（可选的） 其他数据
function Reducer(state = 0, action) {
  const { type } = action
  if (type === 'INCREMENT') {
    return state + 1
  } else if (type === 'DECREMENT') {
    return state - 1
  } else {
    return state
  }
}

// 2. 基于 reducer 创建 Store
const store = createStore(Reducer, 10)

// 3. 获取 store 的状态
console.log(store.getState())

// 4. 更新 store 的状态
//    store.dispatch({ type: 行为类型, 额外参数... })
setTimeout(function () {
  // 发起 dispatch 就是在调用 reducer
  // dispatch 接收的参数叫做 action
  store.dispatch({
    type: 'INCREMENT'
  })
}, 1000)

// 5. 监测 store 中 state 的变化，驱动视图更新
store.subscribe(() => {
  render()
})

const Counter = (props) => {
  return (
    <div>
      <h1>{props.value}</h1>
      <button>Increment</button>
      <button>Decrement</button>
    </div>
  )
}

render()

function render() {
  ReactDOM.render(<Counter value={store.getState()} />, document.getElementById('root')); 
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
