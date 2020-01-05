import React, { Component } from 'react';
import './App.css';
import ProductsContainer from './containers/ProductsContainer'
import CartContainer from './containers/CartContainer'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Shopping Cart Example</h1>
        <hr/>
        <ProductsContainer></ProductsContainer>
        <hr/>
        <CartContainer></CartContainer>
      </div>
    );
  }
}

export default App;
