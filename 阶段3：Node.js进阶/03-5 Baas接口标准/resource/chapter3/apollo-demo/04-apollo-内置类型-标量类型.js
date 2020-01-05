const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
// uuid
const uuid = require('uuid');

const typeDefs = gql`
  type Student {
    id: ID
    sname: String
    age: Int 
    gender: Boolean 
    score: Float
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
        sname: 123,
        age: 12,
        gender: true,
        score: 99.5,
        id: uuid()
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