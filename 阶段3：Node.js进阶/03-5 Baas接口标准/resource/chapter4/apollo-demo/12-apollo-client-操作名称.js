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
    addUser(userInfo: UserInfo): User
  }
  # 查询类型
  type Query {
    hello: String
    msg: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    msg: () => 'Hello msg!'
  },
  Mutation: {
    addUser: (obj, args) => {
      return {
        id: 123,
        uname: args.userInfo.uname,
        pwd: args.userInfo.pwd
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
query helloInfo {
  hello
}

query helloMsg {
  msg
}

mutation addUser {
  addUser(userInfo: {
    uname: "lisi",
    pwd: "abc"
  }){
    id
    uname
    pwd
  }
}
*/