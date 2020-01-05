## 3. Angular服务端渲染

**学习目标**

- **Angular Universal概念**
- **组件的创建及使用**
- **数据绑定**
- **常用指令**
- **路由**
- **HTTP请求**
- **豆瓣电影案例**
- **Angular Universal配置**

注意：本课程需要你已经掌握以下知识点

- TypeScript（请同学们自行学习，本课程内不会讲述）
- Angular7（基础知识点会在本课程中有所讲述，要获取更深入的教学，请移步博学谷Angular系列课程学习）

### 3.1 Angular Universal

Angular在服务端渲染方面提供一套前后端同构解决方案，它就是 Angular Universal（统一平台），一项在服务端运行 Angular 应用的技术。

标准的 Angular 应用会执行在浏览器中，它会在 DOM 中渲染页面，以响应用户的操作。

而 Angular Universal 会在服务端通过一个被称为服务端渲染（server-side rendering - SSR）的过程生成静态的应用页面。

它可以生成这些页面，并在浏览器请求时直接用它们给出响应。 它也可以把页面预先生成为 HTML 文件，然后把它们作为静态文件供服务端使用。

**为什么使用服务端渲染**

1. 有利于SEO
2. 提升在手机及低性能设备上的性能
3. 快速展示首页

### 3.2 基于 Angular CLI 新建项目

#### 3.2.1 安装Angular CLI

- 安装Angular CLI
  `npm install -g @angular/cli`
- 检测是否安装成功
  `ng --version`

#### 3.2.2 使用Angular CLI

- 初始化项目模板
  `ng new my-app`
- 启动开发服务
  `cd my-app`
  `ng serve --open`

#### 3.2.3 目录结构分析

![](.\imgs\目录结构.png)

### 3.3 创建组件及使用组件

使用命令创建组件

`ng generate component xxx` 或者 `ng g c xxx`

组件样式修改（全局和局部）



### 3.4 数据绑定

#### 插值表达式

语法: {{data}}

#### 属性绑定

语法: [property]="data"

#### 事件绑定

语法: (event) = "expression"

#### 双向数据绑定

语法: [(ngModel)] = "data"



### 3.5 指令

- NgIf

作用：根据 `expression` 表达式的值，有条件的包含某个模板。

通过else显示另一个模板

如果 `expression` 为假时有必要显示一个模板，就可以用上述的 `else` 模板来进行绑定。 注意，`else` 绑定指向的是一个带有 `#elseBlock` 标签的 `<ng-template>` 元素。 该模板可以定义在此组件视图中的任何地方，但为了提高可读性，通常会放在 `ngIf` 的紧下方。

- NgForOf

作用：`NgForOf` 指令会为可迭代对象中的每一个条目实例化一个模板。实例化时的上下文环境来自其外部环境，它以当前正在迭代的条目作为循环变量。

- NgStyle

作用：修改 HTML 元素的样式。

- NgClass

作用：从 HTML 元素上添加和移除 CSS 类。

### 3.6 路由

#### 3.6.1 路由初体验

- 首先引入Routes 及 RouterModule类；其中RouterModule用于添加路由器指令和服务提供商；Routes是一个表示路由配置的数组。

`import {Routes, RouterModule} from '@angular/router'`

- 添加路由定义。路由定义 会告诉路由器，当用户点击某个链接或者在浏览器地址栏中输入某个 URL 时，要显示哪个视图。

典型的 Angular 路由有两个属性：

1. `path`：一个用于匹配浏览器地址栏中 URL 的字符串。
2. `component`：当导航到此路由时，路由器应该创建哪个组件

```typescript
const routes: Routes = [
  { path: 'home', component: HomeComponent }
];
```

- 初始化路由器

把 `RouterModule` 添加到 `@NgModule.imports` 数组中，并用 `routes` 来配置它。你只要调用 `imports` 数组中的`RouterModule.forRoot()` 函数就行了。这个方法之所以叫 `forRoot()`，是因为你要在应用的顶级配置这个路由器。 `forRoot()` 方法会提供路由所需的服务提供商和指令，还会基于浏览器的当前 URL 执行首次导航。

```typescript
imports: [ RouterModule.forRoot(routes) ],
```

- 添加路由出口

通过RouterOutlet指令创建路由出口，它的用法类似于组件。 它扮演一个占位符的角色，用于在模板中标出一个位置，路由器将会把要显示在这个出口处的组件显示在这里。

#### 3.6.2 路由跳转

1. 方式一：通过routerLink指令跳转

routerLink 指令绑定一个字符串，字符串是path路径中配置的字符串，它将告诉路由器，当用户点击这个链接时，应该导航到哪里；routerLink还可以绑定一个数组

```html
<a routerLink='/users'>users</a>

<a [routerLink]="['/users']">users</a>
```
需要让用户知道哪个路由处于激活状态，通常情况下我们通过向激活的链接添加一个 class 来实现该功能,此时需要添加一个routerLinkActive指令


2. 方式二：通过Router的navigate方法跳转

```typescript
this.router.navigate(['/users'])
```

#### 3.6.3 路由传参

- 首先在Routes数组中添加路由定义时定义参数；例如`{path: 'users/:id', component: UserComponent}`

`path` 中的冒号（`:`）表示 `:id` 是一个占位符

- 传递参数：`<a [routerLink]="[ '/users', 1]">Neil</a>` 或者 `this.router.navigate(['/users', 1])`

路由参数的获取，借助于模块`@angular/router`中提供的接口`ActivatedRoute`来获取参数（路由订阅还需要Params）。`ActivatedRoute`中包含与当前组件相关的路由信息。获取方式如下：
1. 使用路由快照。`this.route.snapshot.params['id']`。其中`snapshot`是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。
2. 使用路由订阅。`this.route.params.subscribe((params: Params) => { })`

#### 3.6.4 子路由

在路由规则中通过children属性添加子路由规则

### 3.7 HTTP请求

1. 准备好相应接口
2. 在根组件 app.components.ts 中引入 HttpClientModule 模块

```typescript
import {HttpClientModule} from "@angular/common/http"; //引入HttpClientModule 模块
imports: [
 HttpClientModule //声明HTTP模块
],
```

3. 在组件中使用HTTP模块向远程服务器请求数据

```typescript
import { HttpClient } from "@angular/common/http" //这里是HttpClient
```

4. 在组件的构造函数中实例化 HttpClient

```typescript
constructor(private http:HttpClient){}
```

5. 创建用来接收变量的数据

```typescript
public movieList:any
```

6. 通过HTTP的get方法请求数据

```typescript
ngOnInit() {
 this.http.get("http://localhost:3000/in_theaters")
   .subscribe(res=>{ this.movieList = res })
}
// get方法中接收的是一个接口文件的地址，它会接收接口传递过来的数据，并默认处理为json数据。
// subscribe方法是对get接收的数据进行处理。参数 res 就是接收过来的数据对象。然后把 res 对象赋值给anyList变量。

```

### 3.8 豆瓣电影案例

**接口**

获取电影列表：`http://localhost:3301/in_theaters`    （in_theaters可以替换为coming_soon及top250）

获取电影详情：`http://localhost:3301/in_theaters/1?_embed=details`

#### 3.8.1 豆瓣电影首页

```scss
.movie-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px 0;
  background-color: #1e2736;
  margin: 0;
}
li {
  list-style: none;
  line-height: 30px;
  height: 30px;
}
li a {
  color: white;
  text-decoration: none;
}
li a:hover {
  color: red;
}
```
#### 3.8.2 豆瓣电影列表页

```scss
.movie-type {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
}
.movie-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  padding: 10px 0;
  width: 40%;
  box-shadow: 0 0 10px #bbb;
  
}
.movie-box:hover {
  box-shadow: rgba(0,0,0,0.3) 0px 19px 60px;
}
```

#### 3.8.3 豆瓣电影详情页

```scss
.detail {
  width: 40%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 0 10px #bbb;
  margin-top: 60px;
}
.detail-box {
  text-align: center;
}
```

### 3.9 [Angular Universal](https://angular.io/guide/universal)

#### 3.9.1 安装依赖

`npm install --save @angular/platform-server @nguniversal/module-map-ngfactory-loader express`

`npm install --save-dev ts-loader webpack-cli`

#### 3.9.2 准备服务端渲染

要想让你的 `AppModule` 与 Universal 兼容，就要在 `src/app/app.module.ts` 中导入时 `BrowserModule` 添加一个 `.withServerTransition()` 并带上应用的 ID。

**src/app/app.module.ts:**

```typescript
@NgModule({
  bootstrap: [AppComponent],
  imports: [
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    BrowserModule.withServerTransition({appId: 'my-app'}),
    ...
  ],

})
export class AppModule {}
```

#### 3.9.3 创建服务端根模块

**src/app/app.server.module.ts**

```typescript
import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import {AppComponent} from './app.component';

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ModuleMapLoaderModule // <-- *Important* to have lazy-loaded routes work
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule {}
```

#### 3.9.4 创建一个 main 文件，导出 AppServerModule

**src/main.server.ts**

```typescript
export { AppServerModule } from './app/app.server.module';
```

#### 3.9.5 为 AppServerModule 创建配置文件

**src/tsconfig.server.json**

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "outDir": "../out-tsc/app",
    "baseUrl": "./",
    // Set the module format to "commonjs":
    "module": "commonjs",
    "types": []
  },
  "exclude": [
    "test.ts",
    "**/*.spec.ts"
  ],
  // Add "angularCompilerOptions" with the AppServerModule you wrote
  // set as the "entryModule".
  "angularCompilerOptions": {
    "entryModule": "app/app.server.module#AppServerModule"
  }
}
```

#### 3.9.6 创建新的构建目标，并打包

打开本项目的 Angular 配置文件 `angular.json`，并在 `"architect"` 节下添加一个新的目标。下面的例子中把这个新目标命名为 `"server"`。

```json
"architect": {
  "build": { ... }
  "server": {
    "builder": "@angular-devkit/build-angular:server",
    "options": {
      "outputPath": "dist/my-universal-demo-server",
      "main": "src/main.server.ts",
      "tsConfig": "src/tsconfig.server.json"
    }
  }
}
```

```
// 此时可能提示需要安装@angular/http
ng run my-universal-demo:server
```

#### 3.9.7 设置Express服务器环境，以运行 Universal 包

在应用的根目录下，紧挨着 `package.json`，创建一个名叫 `server.ts` 的文件，并添加如下内容。

**./server.ts (root project level)**

```typescript
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'my-universal-demo', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/my-universal-demo-server/main');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'my-universal-demo'));

// Server static files from /my-universal-demo
app.get('*.*', express.static(join(DIST_FOLDER, 'my-universal-demo')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'my-universal-demo', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
```

#### 3.9.8 打包并在服务器上运行此应用

设置 webpack 配置，以处理 Node Express 的 `server.ts` 文件，并启动应用服务器。

在应用的根目录下，创建一个 Webpack 配置文件 `webpack.server.config.js`，它会把 `server.ts` 及其依赖编译到 `dist/server.js` 中。

**./webpack.server.config.js (root project level)**

```typescript
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'none',
  entry: {
    server: './server.ts',
  },
  target: 'node',
  resolve: { extensions: ['.ts', '.js'] },
  optimization: {
    minimize: false
  },
  output: {
    // Puts the output at the root of the dist folder
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /(\\|\/)@angular(\\|\/)core(\\|\/).+\.js$/,
        parser: { system: true },
      },
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      // fixes WARNING Critical dependency: the request of a dependency is an expression
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    )
  ]
}
```

#### 3.9.9 创建脚本

修改package.json文件

```json
"scripts": {
  // These will be your common scripts
  "build:ssr": "npm run build:client-and-server-bundles && npm run webpack:server",
  "serve:ssr": "node dist/server.js",

  // Helpers for the above scripts
  "build:client-and-server-bundles": "ng build --prod && ng run my-universal-demo:server",
  "webpack:server": "webpack --config webpack.server.config.js --progress --colors"
}
```

要想在本地系统上使用 Universal 运行应用的生产版本，请使用如下命令：

```
npm run build:ssr && npm run serve:ssr
```