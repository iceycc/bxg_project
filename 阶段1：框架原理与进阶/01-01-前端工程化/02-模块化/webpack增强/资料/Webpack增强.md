### Webpack增强

#### 各个版本之间的对比

```
从1.x升级到2.x
	https://segmentfault.com/a/1190000008181955
	
从2.x升级到3.x
	整体语法层面差异不大
	性能有所提高
	
从3.x升级4.x
	趋向零配置
	mode
	splitChunks 替代 CommonsChunkPlugin
	mini-css-extract-plugin 替代 extract-text-webpack-plugin
```



####项目搭建（开发环境）

#####基于webpack3.x搭建Vue项目

```
步骤：
	1、创建必要的文件和文件夹
		项目名称
			|——src 源代码目录
				|--main.js 打包的入口文件
				|--App.vue 根组件
			|——package.json 项目的配置文件
			|--webpack.config.dev.js 开发阶段webpack的配置文件
	
	2、安装必要的包，并且编写main.js、App.vue、webpack.config.dev.js中的代码
		包：vue vue-loader vue-template-compiler style-loader
		
		webpack.config.dev.js配置如下
			entry
			output
			module
			plugins
		
	3、安装 webpack-dev-server2.x & webpack3.x + html-webpack-plugin 启动Vue项目
		3.1、在 webpack.config.dev.js 中配置html-webpack-plugin的代码
		3.2、在package.json的scripts标签中，增加一个脚本，脚本代码如下
			"dev": "webpack-dev-server --progress --config webpack.config.dev.js --hot"
			
	4、在项目根目录运行 npm run dev 启动项目，并实现热重载
```



##### 基于webpack4.x搭建Vue项目

```
步骤：
	1、创建必要的文件和文件夹
		项目名称
			|——src 源代码目录
				|--main.js 打包的入口文件
				|--App.vue 根组件
			|——package.json 项目的配置文件
			|--webpack.config.dev.js 开发阶段webpack的配置文件
	
	2、安装必要的包，并且编写main.js、App.vue、webpack.config.dev.js中的代码
		包：vue vue-loader vue-template-compiler style-loader
		
		webpack.config.dev.js配置如下
			entry
			output
			module
			plugins
		注意：相比较于webpack3.x，4.x中别忘记配置mode了
		
	3、安装 webpack-dev-server3.x & webpack4.x + html-webpack-plugin 启动Vue项目
		3.1、在 webpack.config.dev.js 中配置html-webpack-plugin的代码
		3.2、在package.json的scripts标签中，增加一个脚本，脚本代码如下
			"dev": "webpack-dev-server --progress --config webpack.config.dev.js --hot"
			
	4、在项目根目录运行 npm run dev 启动项目，并实现热重载
```



#####基于webpack3.x搭建React项目

```
步骤：
	1、创建必要的文件和文件夹
		项目名称
			|——src 源代码目录
				|--main.js 打包的入口文件
				|--App.js 根组件
			|——package.json 项目的配置文件
			|--webpack.config.dev.js 开发阶段webpack的配置文件
	
	2、安装必要的包，并且编写main.js、App.js、webpack.config.dev.js中的代码
		包：react react-dom 
		
		转换jsx需要的包
			babel-core babel-loader@7 babel-preset-env babel-preset-react
		
		webpack.config.dev.js配置如下
			entry
			output
			module
			plugins
		
	3、安装 webpack-dev-server2.x & webpack3.x + html-webpack-plugin 启动React项目
		3.1、在 webpack.config.dev.js 中配置html-webpack-plugin的代码
		3.2、在package.json的scripts标签中，增加一个脚本，脚本代码如下
			"dev": "webpack-dev-server --progress --config webpack.config.dev.js --hot"
			
	4、在项目根目录运行 npm run dev 启动项目，并实现热重载
	
	5、默认情况下，React是没有实现热更新的，需要使用一个第三方包react-hot-loader去实现
		https://github.com/gaearon/react-hot-loader
```



#####基于webpack4.x搭建React项目

```
步骤：
	1、创建必要的文件和文件夹
		项目名称
			|——src 源代码目录
				|--main.js 打包的入口文件
				|--App.js 根组件
			|——package.json 项目的配置文件
			|--webpack.config.dev.js 开发阶段webpack的配置文件
	
	2、安装必要的包，并且编写main.js、App.js、webpack.config.dev.js中的代码
		包：react react-dom
		
		转换jsx需要的包
			babel-core babel-loader@7 babel-preset-env babel-preset-react
		
		webpack.config.dev.js配置如下
			entry
			output
			module
			plugins
		注意：相比较于webpack3.x，4.x中别忘记配置mode了
		
	3、安装 webpack-dev-server3.x & webpack4.x + html-webpack-plugin 启动React项目
		3.1、在 webpack.config.dev.js 中配置html-webpack-plugin的代码
		3.2、在package.json的scripts标签中，增加一个脚本，脚本代码如下
			"dev": "webpack-dev-server --progress --config webpack.config.dev.js --hot"
			
	4、在项目根目录运行 npm run dev 启动项目，并实现热重载
	
	5、默认情况下，React是没有实现热更新的，需要使用一个第三方包react-hot-loader去实现
		https://github.com/gaearon/react-hot-loader
```



#### 项目打包和优化（生产环境）

##### 基于webpack3.x打包优化Vue项目

```
1、进行最基本的压缩打包bundle.js和html
	压缩打包js 
        1.1、利用babel进行es6转es5
        1.2、开启生产环境
        1.3、使用UglifyJsPlugin进行压缩

    压缩html
    	html-webpack-plugin

2、对bunble.js进行剥离
	2.1、对图片，字体文件等资源进行处理 url-loader
		limit
		name
	2.2、对第三方包进行处理，主要做的事情是，抽取公共模块
			CommonsChunkPlugin(更改入口，出口)
	2.3、对css进行抽取ExtractTextPlugin

3、vue-router可以进行路由懒加载
		babel-plugin-syntax-dynamic-import
```



#####基于webpack4.x打包优化Vue项目

```
1、进行最基本的压缩打包bundle.js和html
	压缩打包js 
        将mode设置为 'production'

    压缩html
    	html-webpack-plugin

2、对bunble.js进行剥离
	2.1、对图片，字体文件资源进行打包 url-loader
			limit
			name
	2.2、对第三方包进行处理，抽离第三方包SplitChunksPlugin
			入口(entry)
			出口(output)
			optimization
	2.3、使用 mini-css-extract-plugin 来抽取我们的样式

3、vue-router可以进行路由懒加载
		babel-plugin-syntax-dynamic-import
```



##### 基于webpack3.x打包优化React项目

```
1、进行最基本的压缩打包bundle.js和html
		压缩打包js 
			1.1、利用babel进行es6转es5
			1.2、开启生产环境
			1.3、使用UglifyJsPlugin进行压缩
			
		压缩html
			html-webpack-plugin
			
	2、对bunble.js进行剥离
		2.1、对图片，字体文件等资源进行处理 url-loader
			limit
			name
		2.2、对第三方包进行处理，主要做的事情是，抽取公共模块
			CommonsChunkPlugin(更改入口，出口)
		2.3、对css进行抽取ExtractTextPlugin
```



##### 基于webpack4.x打包优化项目

```
webpack4 朝向的目标就是简洁、高效

	基础打包:【压缩】
		1、在项目根目录创建一个webpack生产阶段的配置文件
			webpack.config.prod.js
			
		2、把开发阶段的配置文件，拷贝到生产阶段来，然后再改改
			2.1、把mode改成 "production"
			2.2、增加output
			2.3、去掉开发阶段的配置 devServer
			
		3、在package.json的scripts中增加一个prod脚本
			"build":"webpack --config webpack.config.prod.js --progress"
			
		4、配置html-webpack-plugin，压缩html
		
	升级打包:【对bundle.js瘦身】
		1、对图片，字体文件资源进行打包 url-loader
			limit
			name
		
		2、对第三方包进行处理，抽离第三方包SplitChunksPlugin
			入口(entry)
			出口(output)
			optimization
			
			注意点:已经按需加载了的UI框架/库，不要再抽离了，否则它的按需加载就不起作用了
		
		3、使用 mini-css-extract-plugin 来抽取我们的样式
			https://github.com/webpack-contrib/mini-css-extract-plugin
			
			注意点:默认是没有压缩的，压缩要自己写，参照：
				https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
		
	代码分割:【路由懒加载】
		https://reacttraining.com/react-router/web/guides/code-splitting
		1、安装 react-loadable @babel/plugin-syntax-dynamic-import 等包
		
		2、在.babelrc中，配置我们的插件 
			plugins:"@babel/plugin-syntax-dynamic-import"
```



