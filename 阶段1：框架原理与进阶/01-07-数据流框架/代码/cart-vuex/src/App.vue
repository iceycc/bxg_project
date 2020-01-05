<template>
  <div id="app">
    <products></products>
    <hr>
    <cart></cart>
  </div>
</template>

<script>
import Products from './components/Products'
import Cart from './components/Cart'

export default {
  name: 'app',
  components: {
    Products,
    Cart
  }
}
</script>

<style>
</style>
