<template>
  <div class="content">
    <div class="wrap">
      <form>
        <div class="box">
          <textarea name="content" v-model='content'></textarea>
        </div>
        <div class="publish">
          您的大名：
          <input type="text" autocomplete="off" v-model='username'>
          <button  class="W_btn" @click.prevent='send'>发布</button>
        </div>
      </form>
    </div>
    <div class="list">
      <ul>
        <li :key='index' v-for='(item, index) in info.list'>
          <img src="../assets/timg.jpg" alt="" class="pic">
          <div class="list_con">
            <div class="time">
              <strong>发表时间:  <i>{{item.date | formatDate('YYYY-MM-DD hh:mm:ss')}}</i></strong>
              <img src="images/lj.jpg" alt="">
            </div>
            <p><b>{{item.username}}：</b>{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="link">
      <a :key='index' :href="item.lurl" v-for='(item, index) in info.link'>{{item.lname}}</a>
    </div>
    <div class="weather">
      <div>天气：{{info.weather.wea}}</div>
      <div>温度：{{info.weather.temp}}</div>
    </div>
  </div>
</template>

<script>
// 导入apollo客户端相关api
import gql from 'graphql-tag';
const QueryListTag = gql`
  query info {
    info {
      list {
        username
        content
        date
      }
      link {
        lname
        lurl
      }
      weather {
        wea 
        temp
      }
    }
  }
`

export default {
  name: 'Comment',
  apollo: {
    info: {
      query: QueryListTag
    }
  },
  data () {
    return {
      // info表示服务端返回的数据
      info: {
        list: [],
        link: [],
        weather: {}
      },
      username: '',
      content: ''
    }
  },
  methods: {
    send: function() {
      // console.log(this.username, this.content)
      // 把表单的数据通过接口提交到服务器
      this.$apollo.mutate({
        mutation: gql`
          mutation createComment($commentInput: CommentInput) {
            createComment(commentInput: $commentInput) {
              username
              content
            }
          }
        `,
        variables: {
          commentInput: {
            username: this.username,
            content: this.content
          }
        },
        refetchQueries: [{
          query: QueryListTag
        }]
      })
    }
  }
}
</script>
