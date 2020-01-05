# TypeScript

## 是什么？

TypeScript是微软公司开发的一款开源的JavaScript超集语言！

JavaScript超集： 当前任何JavaScript都是合法的TypeScript代码！

TypeScript主要为JavaScript提供了类型系统和ES6语法的支持！


Flow是一个类型检查工具，TypeScript是一种开发语言！

TypeScript有自己的编译工具，我们写好的TypeScript代码最终会通过编译器编译成JavaScript代码进行运行！

## 如何使用

### 安装
TypeScript命令行工具的安装（TS编译器）
```
npm i typescript -g
```

安装好了之后，全局会提供一个`tsc`命令给我们使用！

### 编写TypeScript代码


### 通过tsc进行编译，最终运行


## ts配置文件的说明
1. 创建配置文件
```
tsc --init
```

2. 设置配置项
   * target: 指的就是将ts代码要转换成哪个版本的js代码 es5 es3
   * module: 指的就是将ts代码转换成js代码之后，使用的模块化的标准是什么
   * outDir: 指的就是将ts代码转换成js代码之后，js代码存放的文件夹路径
   * rootDir: 指的就是要将哪个目录中的ts代码进型转换，ts代码的存放路径
   * strict: 是否要将ts代码转换为严格模式的js代码！
  
3. 使用配置文件
```
tsc -p ./tsconfig.json
```