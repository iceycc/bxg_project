
// 负责改变头部组件中的购物车图标上的课程数量
export default function shopCarCountReducer(state = { count: 0 }, action) {

    // 如果是if结果，那么redux的数据在浏览器被刷新以后就会重置，换成switch即可
    // if(action.type == 'CHANGE_SHOP_CAR_COUNT'){
    //     return {
    //         ...state,
    //         count:action.count
    //     }
    // }else{
    //     return {
    //         ...state
    //     }
    // }

    switch (action.type) {
        case 'CHANGE_SHOP_CAR_COUNT':
            return {
                ...state,
                count: action.count
            }

        default:
            return state
    }

}