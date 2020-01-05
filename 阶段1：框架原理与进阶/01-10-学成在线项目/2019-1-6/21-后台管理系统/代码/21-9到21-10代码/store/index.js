// 1.0 导入redux中的两个函数
import {createStore,combineReducers} from 'redux'
// 集成redux-persist实现store持久化到localStorage的步骤
// 1.0.1、导入相关方法和storage对象
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// 1.0.2配置 storage对象的key
const config = {
    key:'xczxredux',
    storage
}

// 2.0 准备相关的reducer当前只有一个testReducer
import testReducer from '../reducers/testReducer.js'
import shopCarCountReducer from '../reducers/shopCarCountReducer.js'
import selectedReducer from '../reducers/selectedReducer.js'
import orderReducer from '../reducers/orderReducer.js'

// 3.0 利用redux中的combineReducers来编译成根reducer
const rootReducer = combineReducers({
    testReducer,shopCarCountReducer,selectedReducer,orderReducer
});


// 3.0.1、利用persistReducer将rootReducer重新包装后返回新对象pReducer
const pReducer = persistReducer(config,rootReducer)

// 4.0 调用 createStore创建好一个store对象
const store = createStore(pReducer)

// 5.0 定义一个函数将store对象返回，将来被_app.js中的withRedux去调用
export const initStore = ()=>{
    return store
}

// 6.0、(export)利用persistStore方法传入store对象创建出新的persistor对象,将来在_app.js中被PersistGate组件使用 
export const persistor = persistStore(store)