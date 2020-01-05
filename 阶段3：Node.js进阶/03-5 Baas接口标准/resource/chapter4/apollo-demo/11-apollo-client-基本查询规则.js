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
    age: Int
    scores: [Course!]!
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
      return {
        sname: '张三',
        scores: [{
          cname: '数学',
          score: 99
        }, {
          cname: '英语',
          score: 98.5
        }]
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('running...')
);

/*
// 客户端查询规则
{
  hello
  stu {
    sname
    scores {
      cname
      score
    }
  }
}
*/