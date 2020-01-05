<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input type="text" v-model="name" placeholder="请输入姓名">
    <label for="gender1">
      <input type="radio"
             name="gender"
             v-model="gender"
             value="0"
             id="gender1">
             <span>男</span>
    </label>
    <label for="gender2">
            <input type="radio"
             name="gender"
             v-model="gender"
             value="1"
             id="gender2">
             <span>女</span>
    </label>
    <input type="text" v-model="email" placeholder="请输入邮箱">
    <button type="button" @click.prevent="submit()">请求</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      name: '',
      gender: 0,
      email: ''
    }
  },
  methods: {
    submit () {
      axios.get('/', {
        params: {
          name: this.name,
          gender: this.gender,
          email: this.email
        }
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
