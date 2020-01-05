# angular

## 文档

- [官网](https://angular.io/)
- [中文文档](https://www.angular.cn/)

## 使用 Angular CLI 创建项目

- 1 安装脚手架：`npm i -g @angular/cli`
- 2 初始化项目：`ng new my-app`
  - my-app 是项目名称，可以修改为自己喜欢的名称
- 3 进入目录：`cd my-app`
- 4 启动项目：`ng serve --open`

## 项目目录结构介绍

- [项目文档结构](https://www.angular.cn/guide/quickstart#the-codesrccode-folder)

```html
.
├── e2e                 端到端测试目录
├── src                 源文件（开发目录）
├── .editorconfig       编辑器统一风格工具配置文件
├── .gitignore          git忽略文件
├── angular.json        Angular CLI 脚手架配置
├── README.md           说明文件
├── package.json        npm配置文件
├── tsconfig.json       TypeScript编译器配置
└── tslint.json         TypeScript语法检查器配置

.
├── src
│   ├── app                 项目源文件( 重点 )
│   ├── assets              存放图片等资源文件
│   ├── browserslist        浏览器支持列表
│   ├── environments        运行环境配置：开发 or 生产
│   ├── favicon.ico         出现在浏览器标签上的应用图标。
│   ├── index.html          项目首页
│   ├── karma.conf.js       karma 测试运行器的配置
│   ├── main.ts             项目入口
│   ├── polyfills.ts        导入JS，兼容老版本浏览器
│   ├── styles.css          全局样式
│   ├── test.ts             测试入口
│   ├── tsconfig.app.json   TypeScript编译器配置
│   ├── tsconfig.spec.json  单元测试文件
│   └── tslint.json         额外的 TypeScript 语法检查器配置

.
├── app
│   ├── app.component.css       app组件样式
│   ├── app.component.html      app组件模板
│   ├── app.component.spec.css  app组件单元测试
│   ├── app.component.ts        app组件JS（TS）代码
│   ├── app.module.ts           根模块
```

## tslint 的配置

- 目的：修改为自己的代码风格
- 1 在 `/tslint.json` 中找到要修改的配置文件
- 2 将其添加到 `src/tslint.json` 文件中（或者直接在 `/tslint.json` 中修改）

## 组件的使用

### 组件的组成部分

- 1 [组件名称].component.html
- 2 [组件名称].component.css
- 3 [组件名称].component.ts
- 单元测试文件（可选）[组件名称].component.spec.ts

## 使用 json-server 提供接口

> Get a full fake REST API with zero coding in less than 30 seconds (seriously)

- [json-server](https://github.com/typicode/json-server)
- 1 安装：`npm i -g json-server`
- 2 新建一个 json 文件：`db.json`
- 3 运行 json-server：`json-server db.json`

```html
请求接口如下：

GET    /posts
POST   /posts
PATCH  /posts/1
DELETE /posts/1
```

## Ant Design of Angular（NG-ZORRO）

- 安装：`ng add ng-zorro-antd`

## HMR 接口文档说明

### 使用说明

- 1 `npm i`
- 2 `npm run dev`
- [接口地址](http://localhost:2080/)

### JWT Authorization

> with [jsonwebtoken](http://jwt.io)

```bash
# LOGIN：create token
POST /tokens
{ username: 'zqran', password: '123456' }

# check token
GET /tokens
{
  header: { Authorization: 'Bearer <jsonwebtoken>' }
}

# LOGOUT：revoke token
DELETE /tokens
{
  header: { Authorization: 'Bearer <jsonwebtoken>' }
}
```

### 员工管理

- 注意：所有接口都需要添加 `Authorization` 请求头

```bash
# 查询
GET /employees

# 添加
POST /employees

# 删除
DELETE /employees/1

# 修改
PATCH /employees/2
```
