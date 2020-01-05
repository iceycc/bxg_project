<template>
  <div>
    <h2>Products</h2>
    <p>
      <input type="text" v-model="foo">
    </p>
    <p>{{ foo }}</p>
    <ul>
      <li
        v-for="item in products"
        v-bind:key="item.id">
        <span>{{ item.title }}</span>
        -
        <span>{{ item.price }}</span>
        <br>
        <button
          :disabled="!item.inventory"
          @click="addProductToCart(item)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapState('products', {
        products: 'all'
      }),
      foo: {
        get () {
          return this.$store.state.foo
        },
        set (value) {
          this.$store.commit('setFoo', value)
        }
      }
    },
    methods: {
      ...mapActions('cart', ['addProductToCart'])
    },
    created () {
      this.$store.dispatch('products/getAllProducts')
    }
  }
</script>

<style></style>
