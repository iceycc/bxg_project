const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    sname: String
    age: Int
    gender: Boolean
  }
  # 查询类型
  type Query {
    hello: String
    stu(id: Int, sname: String): Student
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    stu: (parent, args) => {
      let stu = null;
      if(args.id === 1 && args.sname === 'lisi') {
        stu = {
          sname: 'lisi',
          age: 12,
          gender: true
        }
      } else {
        stu = {
          sname: '---',
          age: 0,
          gender: false
        }
      }
      return stu;
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
query param {
  stu(id: 2, sname: "lisi") {
    sname
    age 
    gender
  }
}
*/
