const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const comment = require('./data-file.js');
const weather = require('./data-api.js');
const link = require('./data-db.js');

// 提供数据源操作的对象
const context = () => {
  return {
    comment,
    weather,
    link
  }
}

const typeDefs = gql`
  input CommentInput {
    username: String
    content: String
  }
  type Comment {
    username: String
    content: String
    date: String
  }
  type Link {
    lname: String 
    lurl: String
  }
  type Weather {
    wea: String 
    temp: String
  }
  type Data {
    list: [Comment]
    link: [Link]
    weather: Weather
  }
  type Query {
    info: Data
  }
  type Mutation {
    createComment(commentInput: CommentInput): Comment
  }
`;

const resolvers = {
  Mutation: {
    createComment: async (parent, args, context) => {
      // 接收客户端传递的数据，把数据保存在文件中
      let ret = await context.comment.setData(args.commentInput.username, args.commentInput.content);
      if(ret === 'success') {
        // 添加成功
        return {
          username: args.commentInput.username,
          content: args.commentInput.content
        }
      }
    }
  },
  Query: {
    info: async (parent, args, context) => {
      // 留言板列表数据
      let ret = await context.comment.getData();
      let list = JSON.parse(ret);
      // 友情链接数据
      let link = await context.link.getData();
      // 天气数据
      let weather = await context.weather.getData();
      return {
        list: list,
        link: link,
        weather: weather
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers, context });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('running...')
);