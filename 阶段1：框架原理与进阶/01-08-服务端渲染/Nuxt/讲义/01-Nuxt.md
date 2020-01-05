## 1. Nuxt.js服务器端渲染

**学习目标**

- **了解Nuxt.js的作用**
- **掌握Nuxt.js中的路由**
- **掌握layouts、pages以及components的区别**
- **能够在Nuxt.js项目中使用element-ui**
- **掌握Nuxt.js中异步获取数据的方式**
- **完成豆瓣电影小案例**
- **掌握SEO的优化**

### 1.1 Nuxt.js入门

#### 1.1.1 什么是Nuxt.js

[Vue服务端渲染官网](https://cn.vuejs.org/v2/guide/ssr.html)

[Nuxt.js官网](https://zh.nuxtjs.org/guide)

Nuxt.js 是一个基于 Vue.js 的通用应用框架。

#### 1.1.2 第一个Nuxt应用程序

```bash
npm i create-nuxt-app -g
create-nuxt-app my-nuxt-demo
cd my-nuxt-demo
npm run dev
```

#### 1.1.3 文件结构分析

```
└─my-nuxt-demo
  ├─.nuxt               // Nuxt自动生成，临时的用于编辑的文件，build
  ├─assets              // 用于组织未编译的静态资源如LESS、SASS或JavaScript,对于不需要通过 Webpack 处理的静态资源文件，可以放置在 static 目录中
  ├─components          // 用于自己编写的Vue组件，比如日历组件、分页组件
  ├─layouts             // 布局目录，用于组织应用的布局组件，不可更改⭐
  ├─middleware          // 用于存放中间件
  ├─node_modules
  ├─pages               // 用于组织应用的路由及视图,Nuxt.js根据该目录结构自动生成对应的路由配置，文件名不可更改⭐
  ├─plugins             // 用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。
  ├─static              // 用于存放应用的静态文件，此类文件不会被 Nuxt.js 调用 Webpack 进行构建编译处理。 服务器启动的时候，该目录下的文件会映射至应用的根路径 / 下。文件夹名不可更改。⭐
  └─store               // 用于组织应用的Vuex 状态管理。文件夹名不可更改。⭐
  ├─.editorconfig       // 开发工具格式配置
  ├─.eslintrc.js        // ESLint的配置文件，用于检查代码格式
  ├─.gitignore          // 配置git忽略文件
  ├─nuxt.config.js      // 用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。文件名不可更改。⭐
  ├─package-lock.json   // npm自动生成，用于帮助package的统一设置的，yarn也有相同的操作
  ├─package.json        // npm 包管理配置文件
  ├─README.md
```

### 1.2 页面和路由

#### 1.2.1 基本路由

Nuxt.js 依据 `pages` 目录结构自动生成 vue-router 模块的路由配置。

假设 `pages` 的目录结构如下

```
└─pages
    ├─index.vue
    └─user
      ├─index.vue
      ├─one.vue
```

那么，Nuxt.js 自动生成的路由配置如下：

```js
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```

#### 1.2.2 页面跳转

1. 不要写成a标签，因为是重新获取一个新的页面，并不是SPA
2. `<nuxt-link to="/users"></nuxt-link>`
3. this.$router.push('/users')

#### 1.2.3 动态路由

- 在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的**以下划线作为前缀**的 Vue 文件 或 目录。
- 获取动态参数{{$route.params.id}}

#### 1.2.4 路由参数校验

Nuxt.js 可以让你在动态路由对应的页面组件中配置一个`validate`方法用于校验动态路由参数的有效性。该函数有一个布尔类型的返回值，如果返回true则表示校验通过，如果返回false则表示校验未通过。

```js
validate(data) {
  cosole.log(data)
  return true
}
```

#### 1.2.5 嵌套路由

1. 添加一个Vue文件，作为父组件
2. 添加一个与父组件同名的文件夹来存放子视图组件
3. 在父文件中，添加<nuxt-child></nuxt-child>组件，用于展示匹配到的子视图

### 1.3 layouts & pages & components

#### 1.3.1 创建layout

1. 去layouts文件夹下面新建一个新的layout组件，例如teachers.vue，并在这个组件中添加<nuxt />组件，这样，所有和teachers相关的页面都会有公共的layout
2. 给需要用到teachers.vue的组件添加layout属性，并指定需要使用的layout，例如：layout: 'teachers'

#### 1.3.2 创建特殊layout : error

layouts文件夹下面新建error.vue，error是关键字

#### 1.3.3 新建一个组件

在components文件夹下面新建一个Header.vue组件
引入组件，注意路径的~符号，表示根目录
layout中也能使用组件

#### 1.3.4 样式配置

nuxt.config.js中设置设置全局样式文件路径

### 1.4 ElementUI使用

1. 下载npm i element-ui -S

2. 在plugins文件夹下面，创建ElementUI.js文件

   ```js
   import Vue from 'vue'
   import ElementUI from 'element-ui'
   Vue.use(ElementUI)
   ```

3. 在nuxt.config.js中添加配置

   ```json
   css: [
     'element-ui/lib/theme-chalk/index.css'
   ],
   plugins: [
     {src: '~/plugins/ElementUI', ssr: true }
   ],
   build: {
     vendor: ['element-ui']
   }
   ```

### 1.5 异步数据

Nuxt.js 扩展了 Vue.js，增加了一个叫 `asyncData` 的方法，使得我们可以在设置组件的数据之前能异步获取或处理数据。`asyncData`方法会在组件（**限于页面组件**）每次加载之前被调用。它可以在服务端或路由更新之前被调用。所以需要注意这个函数中**不能**使用`this`

注意：常规写法如果在created钩子中写异步，是在客户端渲染的而不是在服务端

使用方法：`asyncData(context, callback) {callback(null, data)}`

`context.route.params.xxx`获取参数

`callback(new Error(), data)`渲染出错的页面

注意：这个方法在服务器端执行和在客户端执行的区别

### 1.6 axios的使用

安装`npm install --save axios`

使用

```js
import axios from 'axios'

asyncData(context, callback) {
  axios.get('http://localhost:3301/in_theaters')
    .then(res => {
      console.log(res);
      callback(null, {list: res.data})
    })
}
```

为防止重复打包，在nuxt.config.js中配置

```json
module.exports = {
  build: {
    vendor: ['axios']
  }
}
```

### 1.7 小案例(豆瓣电影列表)

**接口i**

获取电影列表：`http://localhost:3301/in_theaters`    （in_theaters可以替换为coming_soon及top250）

获取电影详情：`http://localhost:3301/in_theaters/1?_embed=details`

#### 1.7.1 豆瓣电影首页创建

#### 1.7.2 豆瓣电影列表页面创建

#### 1.7.3 电影详情页面

### 1.8 SEO优化

#### 1.8.1 全局

在nuxt.config.js配置文件中修改

```
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
```



#### 1.8.2 局部

```
    head(){
        return{
            title:'豆瓣电影',
            meta:[{
                'name':'keywords',
                'content': '电影、经典电影、热映、电视剧、美剧、影评、电影院、电影票、排行、推荐'
            }]
        }
    }
```

