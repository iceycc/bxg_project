import ProductsStore from './products'
import CartStore from './cart'

class RootStore {
  constructor () {
    this.productsStore = new ProductsStore(this)
    this.cartStore = new CartStore(this)
  }
}

export default RootStore
