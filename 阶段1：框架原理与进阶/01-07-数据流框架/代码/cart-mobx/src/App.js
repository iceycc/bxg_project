import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Products from './components/Products'
import Cart from './components/Cart'

class App extends Component {
  render() {
    return (
      <div>
        <h1>Shopping Cart Example</h1>
        <hr/>
        <Products />
        <hr/>
        <Cart />
      </div>
    )
  }
}

export default App;
