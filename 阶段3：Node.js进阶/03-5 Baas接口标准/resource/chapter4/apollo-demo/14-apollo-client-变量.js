const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  # 课程类型
  type Course {
    cname: String
    score: Float
  }
  # 学生类型
  type Student {
    id: Int
    sname: String
    age: Int
    scores(num: Float): [Course]
  }
  # 查询类型
  type Query {
    hello: String
    stu(id: Int): Student
  }
`;

const resolvers = {
  Student: {
    scores: (parent, args) => {
      return parent.scores&&parent.scores.filter(item => {
        return item.score > args.num;
      });
    }
  },
  Query: {
    hello: () => 'Hello world!',
    stu: (parent, args) => {
      console.log(args)
      if(args.id === 1) {
        return {
          id: 1,
          sname: '张三',
          scores: [{
            cname: '数学',
            score: 99.5
          }, {
            cname: '英语',
            score: 98.5
          }]
        }
      } else {
        return {
          id: 0,
          sname: '---',
          score: null
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
query param($id: Int, $num: Float) {
  stu(id: $id) {
    sname
    scores(num: $num) {
      cname
      score
    }
  }
}

{
  "id": 1,
  "num": 95
}
*/