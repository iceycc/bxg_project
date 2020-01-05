// 1.0 导入redux中的两个函数
import {createStore,combineReducers} from 'redux'

// 2.0 准备相关的reducer当前只有一个testReducer
import testReducer from '../reducers/testReducer.js'

// 3.0 利用redux中的combineReducers来编译成根reducer
const rootReducer = combineReducers({
    testReducer
});

// 4.0 调用 createStore创建好一个store对象
const store = createStore(rootReducer)

// 5.0 定义一个函数将store对象返回，将来被_app.js中的withRedux去调用
export const initStore = ()=>{
    return store
}
