const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  # 查询类型
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => {
      // 这里获取到操作数据源对象之后就可以非常方便的获取需要的数据，从而返回客户端
      return context.db;
    }
  }
};

const context = () => {
  return {
    db: 'dbObj'
  }
}

const server = new ApolloServer({ typeDefs, resolvers, context });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('running...')
);