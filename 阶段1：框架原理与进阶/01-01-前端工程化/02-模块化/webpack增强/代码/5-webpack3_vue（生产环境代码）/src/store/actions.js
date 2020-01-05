import * as Types from './mutation-types'

export default {
    /**参数1
     * 结构出来的commit ，用来调用mutation
     */
    addGoodsAsync({commit},goods){
        setTimeout(() => {
            commit(Types.ADD_GOODS,goods)
        }, 1000);
    },
    //修改
    updateGoodsAsync({commit},goods){
        commit(Types.UPDATE_GOODS,goods)
    },
    //删除
    deleteGoodsByIdAsync({commit},goodsId){
        commit(Types.DELETEGOODSBYID,goodsId)
    }
}