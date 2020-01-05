/**
 * 按需导出，要加`{}`
 */
import {
    addLocalGoods,
    updateLocalGoods,
    deleteLocalGoodsById
} from '@/common/localStorageHelper'

//全部导入
import * as Types from './mutation-types'

export default {
  /**
   * 新增商品
   *
   * @param {*} state 指的就是核心概念state，必须是第一个参数
   * @param {*} goods 载荷
   */
  [Types.ADD_GOODS](state, goods) {
    state.buyCount = addLocalGoods(goods);
  },
  /**
   * 修改商品
   *
   * @param {*} state 指的就是核心概念state，必须是第一个参数
   * @param {*} goods 载荷
   */
  [Types.UPDATE_GOODS](state, goods) {
    state.buyCount = updateLocalGoods(goods);
  },
  /**
   * 删除商品
   *
   * @param {*} state 指的就是核心概念state，必须是第一个参数
   * @param {*} goods 载荷
   */
  [Types.DELETEGOODSBYID](state, goodsId) {
    state.buyCount = deleteLocalGoodsById(goodsId);
  }
};
