# Flow小结

## Flow是什么？
Static Type Checker For JavaScript

静态类型检查工具

## Flow能做什么？

Flow能够给JavaScript提供静态类型检查的能力，其实就是为javascript添加了一个编译过程。


## Flow的使用
1. 安装Flow
```
npm i flow-bin -D
```
2. 需要编写Flow代码
   * 通过注释的方式为代码添加类型 （不会对js代码产生任何更改，影响）
   * 通过直接在js代码中书写类型 （改变了js代码的结构，需要通过babel进行转码之后，才能够正常的运行）

```js
// 文件中需要添加一个标记 告诉flow当前文件需要进行类型检查！
// @flow 

var 变量 /*: 类型*/ = 数据

var 变量: 类型 = 数据
```

3. 如果使用的是第二种方式，则需要配合babel使用
```
npm install babel-cli babel-preset-flow -D

// 通过babel进行转码之后，代码就可以正常运行
```
