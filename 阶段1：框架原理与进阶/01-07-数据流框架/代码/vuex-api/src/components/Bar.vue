<template>
  <div>
    <h2>Bar 组件</h2>
    <p>{{ count }}</p>
    <p>{{ message }}</p>
    <p>剩余任务数量：{{ remaining }}</p>
    <button @click="increment">自增</button>
    <br>
    <button @click="asyncIncrement({ num: 3 })">异步自增</button>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions({
        asyncIncrement: 'increment'
      }),
      increment () {
        this.$store.commit({
          type: 'increment'
        })
      }
    },
    computed: {
      message () {
        return 'hello'
      },
      ...mapState({
        count: 'count',
        message: 'message'
      }),
      ...mapGetters({
        remaining: 'remaining'
      })
    }
  }
</script>

<style></style>
