const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  # 学生类型
  type Student {
    sname: String
    age: Int
  }
  # 查询类型
  type Query {
    hello: String
    # 参数可以指定默认值
    stu(n: Int = 11): Student
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    stu: (obj, args) => {
      console.log(args)
      if(args.n > 10) {
        return {
          sname: 'lisi',
          age: 12
        }
      } else {
        return {
          sname: 'lisi',
          age: 8
        }
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