import * as types from '../constants/ActionTypes'

const initialState = {
  all: []
}

const all = (state = initialState.all, action) => {
  switch (action.type) {
    case types.RECIVE_PRODUCTS:
      return action.products
    case types.ADD_TO_CART:
      const productId = action.product.id
      const product = state.find(item => item.id === productId)
      product.inventory--
      return [...state]
    default:
      return state
  }
}

export default (state = initialState, action) => {
  return {
    all: all(state.all, action)
  }
}
