<template>
  <div>
    <h2>Foo 组件</h2>
    <p>Foo 的 a：{{ a }}</p>
    <!-- <p>Foo 的 a：{{ $store.getters['foo/abc'] }}</p> -->
    <!-- <p>Foo 的 a：{{ $store.getters['abc'] }}</p> -->
    <p>Foo 的 abc：{{ abc }}</p>
    <p>{{ count }}</p>
    <p>{{ message }}</p>
    <p>剩余任务数量：{{ remaining }}</p>
    <p>{{ getTodoById(1).text }}</p>
    <button @click="increment">自增</button>
    <br>
    <button @click="asyncIncrement">异步自增</button>
    <button @click="changeMessage">改变 message</button>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {
    created () {
      console.log(this.$store)
    },
    methods: {
      increment () {
        // this.count++
        // 不要在组件中直接修改容器中的数据
        // 为什么：因为无法被调试工具记录到
        // this.$store.state.count++
        // this.$store.commit('increment', 2)
        this.$store.commit({
          type: 'increment',
          num: 2
        })
      },
      asyncIncrement () {
        this.$store.dispatch('increment', {
          num: 2
        })
      },
      // 把 SOME_MUTATION 映射为了组件的一个 method
      // ...mapMutations(['SOME_MUTATION'])
      ...mapMutations({
        changeMessage: 'SOME_MUTATION'
      })
    },
    computed: {
      // 默认访问全局成员
      ...mapState({
        count: 'count',
        message: 'message',
      }),
      // 访问模块成员
      ...mapState('foo', {
        a: 'a'
      }),
      ...mapGetters(['remaining', 'getTodoById']),
      ...mapGetters('foo', ['abc'])
    }
    // computed: {
    //   count () {
    //     return this.$store.state.count
    //   },
    //   message () {
    //     return this.$store.state.message
    //   }
    // }
  }
</script>

<style></style>
