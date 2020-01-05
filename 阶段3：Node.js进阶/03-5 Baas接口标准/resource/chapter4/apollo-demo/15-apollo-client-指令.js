const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  # 学生类型
  type Student {
    id: Int
    sname: String
    gender: Boolean
  }
  # 查询类型
  type Query {
    hello: String
    stu(id: Int): Student
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    stu: (parent, args) => {
      if(args.id === 1) {
        return {
          id: 123,
          sname: '张三',
          gender: true
        }
      } else {
        return {
          id: 0,
          sname: '---',
          gender: false
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

/*
query directive($id: Int, $gender: Boolean!) {
  stu(id: $id) {
    id 
    sname 
    gender @include(if: $gender)
  }
}

query directive($id: Int, $gender: Boolean!) {
  stu(id: $id) {
    id 
    sname 
    gender @skip(if: $gender)
  }
}

{
  "id": 1,
  "gender": true
}
*/