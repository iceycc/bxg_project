// 1、导入相关的依赖包
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// 2、定义数据类型
// Query类型是默认客户端查询的类型，并且该类型在服务端必须存在并且是唯一的
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// 3、解析数据类型对应的具体数据
const resolvers = {
  Query: {
    hello: () => 'Hello World'
  }
}

// 4、整合apollo-server和express
// typeDefs和resolvers两个属性名称是固定的
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
const app = express();
server.applyMiddleware({app});

// 5、启动监听
app.listen({port: 4000}, () => {
  console.log('running...');
});