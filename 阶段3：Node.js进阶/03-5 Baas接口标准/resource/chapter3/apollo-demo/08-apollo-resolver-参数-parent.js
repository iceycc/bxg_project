const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    sname: String
    age: Int 
    favour: String
  }
  # 查询类型
  type Query {
    hello: String
    stu: Student
  }
`;

const resolvers = {
  Student: {
    sname: (parent) => {
      console.log(parent)
      // return 'zhangsan';
      return parent.sname;
    },
    favour: (parent) => {
      if(parent.favour === 'swimming') {
        return '游泳';
      } else {
        return parent.favour;
      }
    }
  },
  Query: {
    hello: () => 'Hello world!',
    stu: (parent) => {
      console.log(parent)
      return {
        sname: 'lisi',
        age: 12,
        favour: 'coding'
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