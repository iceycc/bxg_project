// 负责保存用户选中的购物车中的课程数据
export default function selectedReducer(state = [
    {
        "shop_car_id": 0,
        "goods_id": 0,
        "title": "",
        "timeout": 0,
        "sell_price": 0,
        "img_url": ""
    }
], action) {

    switch(action.type){
        case 'SELECTED_COURSE':
        return {
            state:action.courseList
        }
        default:
        return state
    }
}