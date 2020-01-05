const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  # 输入类型
  input UserInfo {
    uname: String
    pwd: String
  }
  # 用户类型
  type User {
    id: ID
    uname: String
    pwd: String
  }
  # 变更类型
  type Mutation {
    addUserByInput(userInput: UserInfo): User
    addUserByParam(uname: String, pwd: String): User
  }
  # 查询类型
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
  Mutation: {
    addUserByParam: (obj, args) => {
      return {
        id: 123,
        uname: args.uname,
        pwd: args.pwd
      }
    },
    addUserByInput: (obj, args) => {
      return {
        id: 456,
        uname: args.userInput.uname,
        pwd: args.userInput.pwd
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
mutation addUserByParam {
  addUserByParam(uname: "lisi", pwd: "abc") {
    id
    uname
    pwd
  }
}
mutation addUserByInput($userInput: UserInfo) {
  addUserByInput(userInput: $userInput) {
    id
    uname
    pwd
  }
}
{
  "userInput": {
    "uname": "zhangsan",
    "pwd": "hello"
  }
}
*/