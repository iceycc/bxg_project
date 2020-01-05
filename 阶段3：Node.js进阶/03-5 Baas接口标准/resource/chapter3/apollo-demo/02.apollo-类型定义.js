const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  # 课程类型
  type Course {
    cname: String
    score: Float
  }
  # 学生类型
  type Student {
    sname: String
    scores: [Course]
  }
  # 查询类型
  type Query {
    hello: String
    stu: Student
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    stu: () => {
      // 这里提供学生相关的数据
      let data = [{
        cname: '数学',
        score: 100
      }, {
        cname: '英语',
        score: 99
      }];
      return {
        sname: '张三',
        scores: data
      }
    }
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('running...')
);