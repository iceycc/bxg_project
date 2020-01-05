import React, { Component } from 'react'

class Products extends Component {
  render () {
    const { products, addToCart } = this.props
    return (
      <div>
        <h2>Products</h2>
        <ul>
          {products.map(item => (
            <li key={item.id}>
              <span>{item.title} - {item.price} * {item.inventory}</span>
              <br/>
              <button
                disabled={!item.inventory}
                onClick={() => addToCart(item)}>{item.inventory ? 'Add to cart' : 'Sold out'}</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  componentDidMount () {
    this.props.getAllProducts()
  }
}

export default Products
