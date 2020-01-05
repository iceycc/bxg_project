# TypeScript小结

## 是什么？
是微软开发的一款编程语言，是JavaScript超集！

## 能做什么？
TypeScript提供了类型系统

## 怎么用？
因为typescript是一个编程语言，它最终会被转换成javaScript代码运行，tsc就是用来进行转换的工具

1. 安装 tsc
npm i typescript -g

2. 编写TS代码

3. 利用tsc命令对文件进行编译 ts->js

## ts的配置文件
1. 创建配置文件 .tsconfig.json
`tsc --init`

2. 常见配置属性
    * target: 转换成的js代码的目标版本 ES  ES3 ES5 ES6
    * module: 转换成的js代码的模块化方式
    * rootDir: ts代码存放的路径，要被转码的ts文件存放的路径
    * outDir: 最终转换好的js文件的存储路径
    * strict: 是否要转换成严格模式的代码