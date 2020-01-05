const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const db = require('./db.js');

const typeDefs = gql`
  type Student {
    sname: String
    age: Int
  }
  # 查询类型
  type Query {
    hello: [Student!]!
  }
`;

const resolvers = {
  Query: {
    hello: async (parent, args, context) => {
      // 这里获取到操作数据源对象之后就可以非常方便的获取需要的数据，从而返回客户端
      let ret = await context.db.getData();
      let obj = JSON.parse(ret);
      return obj;
    }
  }
};

const context = () => {
  return {
    db: db
  }
}

const server = new ApolloServer({ typeDefs, resolvers, context });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('running...')
);