import { observable, action } from 'mobx'
import * as shop from '../api/shop'

class ProductsStore {
  @observable all = []

  constructor (rootStore) {
    this.rootStore = rootStore
  }

  @action.bound getAllProducts () {
    shop.getAllProducts(products => {
      this.setAll(products)
    })
  }

  @action.bound setAll (products) {
    this.all = products
  }

  @action.bound decrementInventory (product) {
    const prod = this.all.find(item => item.id === product.id)
    prod.inventory--
  }
}

export default ProductsStore
