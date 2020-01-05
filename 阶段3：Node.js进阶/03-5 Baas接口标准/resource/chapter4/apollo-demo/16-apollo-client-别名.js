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
    scores(cname: String): [Course]
  }
  # 查询类型
  type Query {
    hello: String
    stu: Student
  }
`;

const resolvers = {
  Student: {
    scores: (parent, args) => {
      if(args.cname === '数学' || args.cname === '英语') {
        return parent.scores.filter(item => {
          return item.cname === args.cname;
        });
      } else {
        return parent.scores;
      }
    }
  },
  Query: {
    hello: () => 'Hello world!',
    stu: (parent, args) => {
      return {
        id: 1,
        sname: '张三',
        scores: [{
          cname: '数学',
          score: 99.5
        }, {
          cname: '英语',
          score: 98.5
        }, {
          cname: '语文',
          score: 97.5
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

/*
query alias {
  stu {
    sname 
    math: scores(cname: "数学") {
      cname
      score
    }
    english: scores(cname: "英语") {
      cname
      score
    }
  }
}
*/