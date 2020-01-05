import * as shop from '../api/shop'
import * as types from '../constants/ActionTypes'

export const reciveProducts = products => ({
  type: types.RECIVE_PRODUCTS,
  products
})

export const getAllProducts = () => dispatch => {
  shop.getAllProducts(products => {
    dispatch(reciveProducts(products))
  })
}

export const addToCart = product => ({
  type: types.ADD_TO_CART,
  product
})

export const setCheckoutStatus = status => ({
  type: types.SET_CHECKOUT_STATUS,
  status
})

export const setCartItems = items => ({
  type: types.SET_ITEMS,
  items
})

export const checkout = products => dispatch => {
  // 1. 备份购物车数据
  const savedCartProducts = [...products]
  // 2. 清空结算状态
  dispatch(setCheckoutStatus(null))
  // 3. 清空购物车
  dispatch(setCartItems([]))
  // 4. 执行结算操作
  shop.buyProducts(
    products,
    () => dispatch(setCheckoutStatus('successful')), // 成功 设置结算状态成功
    () => { // 失败 设置结算状态失败，还原购物车数据
      dispatch(setCheckoutStatus('failed'))
      dispatch(setCartItems(savedCartProducts))
    }
  )
}
