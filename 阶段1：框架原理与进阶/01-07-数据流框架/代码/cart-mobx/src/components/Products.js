import React, { Component } from 'react'
import { observer ,inject } from 'mobx-react'

@inject('productsStore', 'cartStore')
@observer
class Products extends Component {
  render () {
    const { productsStore, cartStore } = this.props
    return (
      <div>
        <h2>Products</h2>
        <ul>
          {productsStore.all.map(item => (
            <li key={item.id}>
              {item.title} - {item.price} * {item.inventory}
              <br/>
              <button
                disabled={!item.inventory}
                onClick={() => cartStore.addToCart(item)}>{item.inventory ? 'Add to cart' : 'Sold Out'}</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  componentDidMount () {
    this.props.productsStore.getAllProducts()
  }
}

export default Products
