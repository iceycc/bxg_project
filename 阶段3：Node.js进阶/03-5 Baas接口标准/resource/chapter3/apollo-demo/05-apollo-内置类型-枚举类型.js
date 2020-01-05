const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  enum Favour {
    SWIMMING
    DANCING
    CODING
  }
  # 查询类型
  type Query {
    hello: String
    info: Favour
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    info: () => {
      return 'abc'
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log('running...')
);