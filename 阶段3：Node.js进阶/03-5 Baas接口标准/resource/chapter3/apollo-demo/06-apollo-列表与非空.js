const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Course {
    cname: String
    score: Float
  }
  type Student {
    sname: String!
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
        // sname: 'lisi'
        age: 12,
        scores: [{
          cname: '数学',
          score: 99.5
        }, {
          cname: '语文',
          score: 89.5
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