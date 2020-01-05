
export default function orderReducer(state={
    "order_id": 0,  //订单号
    "order_no": "",  //订单交易号
    "amount": "",  // 金额
    "remark":""
},action){

    switch(action.type){
        case 'SET_ORDER':
        return {
            state : action.orderinfo
        }
        default:
        return state
    }
}