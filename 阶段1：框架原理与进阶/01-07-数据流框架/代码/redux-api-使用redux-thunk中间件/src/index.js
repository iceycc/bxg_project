import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const rootReducer = function (state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    default:
      return state
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

const Counter = (props) => {
  return (
    <div>
      <h1>{props.value}</h1>
      <p>
        <button onClick={props.increment}>Increment</button>
      </p>
      <p>
        <button onClick={props.asyncIncrement}>AsyncIncrement</button>
      </p>
    </div>
  )
}

render()

store.subscribe(() => {
  render()
})

function increment(value) {
  // if (value % 2 === 0) {
  //   return
  // }
  return {
    type: 'INCREMENT'
  }
}

function asyncIncrement(value) {
  return function (dispatch, getState) {
    const state = getState()
    if (state % 2 === 0) {
      return
    }
    setTimeout(function () {
      dispatch(increment())
    }, 1000)
  }
}

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      increment={() => store.dispatch(increment()) }
      asyncIncrement={() => store.dispatch(asyncIncrement(2))} />,
    document.getElementById('root')
  ) 
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
