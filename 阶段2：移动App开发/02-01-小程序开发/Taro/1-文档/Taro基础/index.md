# 1. Taro

## 1.1. 介绍

[官网](https://taro.js.org/)

[开发文档](https://nervjs.github.io/taro/docs/README.html)

[**Taro**](https://nervjs.github.io/taro/docs/README.html) 是一套遵循 [React](https://reactjs.org/) 语法规范的 **多端开发** 解决方案。由京东的凹凸实验室团队于 2018-09-18 历时 3 个月正式发布。taro 的目标是使用一套代码达到多端统一。

多端：

- 微信小程序

- H5

- React Native

- 支付宝小程序

- 百度智能小程序

- > 快应用 适配中

## 1.2. 注意

虽然 Taro 拥有多端编译的能力，但是为了让我们的学习有一条比较完整的路线，本章课程是优先以微信小程序的开发为主线来介绍 Taro。

# 2. 运行项目

## 2.1. 安装脚手架工具@tarojs/cli

```sh
npm install -g @tarojs/cli
```

## 2.2. 创建项目

```sh
taro init myApp
```

## 2.3. 打包编译

### 2.3.1. 发布

- 微信小程序

  ```sh
  npm run build:weapp
  ```

- H5

  ```sh
  npm run build:h5
  ```

- 百度智能小程序

  ```sh
  npm run build:swan
  ```

- 支付宝小程序

  ```sh
  npm run build:alipay
  ```

- React Native

  ```sh
  npm run build:rn
  ```

### 2.3.2. 监控

- 微信小程序

  ```bash
  npm run dev:weapp
  ```

- H5

  ```
  npm run dev:h5
  ```

- 百度智能小程序

  ```sh
  npm run dev:swan
  ```

- 支付宝小程序

  ```sh
  npm run dev:alipay
  ```

- React Native

  ```sh
  npm run dev:rn
  ```

# 3. 项目结构

## 3.1. 基本目录

所有项目源代码请放在项目根目录 `src` 目录下，项目所需最基本的文件包括 **入口文件** 以及 **页面文件**

- 入口文件为 `app.js`
- 页面文件建议放置在 `src/pages` 目录下

一个可靠的 Taro 项目可以按照如下方式进行组织

```
├── config                 配置目录
|   ├── dev.js             开发时配置
|   ├── index.js           默认配置
|   └── prod.js            打包时配置
├── src                    源码目录
|   ├── components         公共组件目录
|   ├── pages              页面文件目录
|   |   ├── index          index 页面目录
|   |   |   ├── banner     页面 index 私有组件
|   |   |   ├── index.js   index 页面逻辑
|   |   |   └── index.css  index 页面样式
|   ├── utils              公共方法库
|   ├── app.css            项目总通用样式
|   └── app.js             项目入口文件
└── package.json
```

## 3.2. 文件命名

Taro 中普通 JS/TS 文件以小写字母命名，多个单词以下划线连接，例如 `util.js`、`util_helper.js`

Taro 组件文件命名遵循 Pascal 命名法，例如 `ReservationCard.jsx`

## 3.3. 其他规范

taro 做了更加详细的编码规范描述。[参考](https://nervjs.github.io/taro/docs/spec-for-taro.html#javascript-书写规范)

# 4. 项目配置

通过 Taro 模板创建的项目都会默认拥有 `project.config.json` 这一项目配置文件，这个文件 **只能用于微信小程序**，若要兼容到其他小程序平台，请按如下对应规则来增加相应平台的配置文件，其配置与各自小程序平台要求的一致

各类小程序平台均有自己的项目配置文件，例如

- 微信小程序，[project.config.json](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html?search-key=%E9%A1%B9%E7%9B%AE%E9%85%8D%E7%BD%AE)
- 百度智能小程序，[project.swan.json](https://smartprogram.baidu.com/docs/develop/devtools/projectconfig/)
- 头条小程序， project.tt.json，文档暂无，大部分字段与微信小程序一致
- 支付宝小程序，暂无发现

## 4.1. 微信小程序全局配置

小程序的全局配置文件在`app.js`文件中的 `config`字段中

[小程序全局配置](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html)

```javascript
class App extends Component {
  // 小程序的全局配置
  config = {
    pages: ["pages/index/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    }
  };
  render() {
    return <Index />;
  }
}
```

### 4.1.1. 生命周期对应关系

而且由于入口文件继承自 `Component` 组件基类，它同样拥有组件生命周期，但因为入口文件的特殊性，他的生命周期并不完整，如下

| 生命周期方法           | 作用               | 说明                                                                                 |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------ |
| componentWillMount     | 程序被载入         | 在微信小程序中这一生命周期方法对应 app 的 `onLaunch`                                 |
| componentDidMount      | 程序被载入         | 在微信小程序中这一生命周期方法对应 app 的 `onLaunch`，在 `componentWillMount` 后执行 |
| componentDidShow       | 程序展示出来       | 在微信小程序中这一生命周期方法对应 `onShow`，在 H5 中同样实现                        |
| componentDidHide       | 程序被隐藏         | 在微信小程序中这一生命周期方法对应 `onHide`，在 H5 中同样实现                        |
| componentDidCatchError | 错误监听函数       | 在微信小程序中这一生命周期方法对应 `onError`                                         |
| componentDidNotFound   | 页面不存在监听函数 | 在微信小程序中这一生命周期方法对应 `onPageNotFound`                                  |

> 微信小程序中 `onLaunch` 通常带有一个参数 `options`，在 Taro 中你可以在所有生命周期和普通事件方法中通过 `this.$router.params` 访问到，在其他端也适用

入口文件需要包含一个 `render` 方法，一般返回程序的第一个页面，但值得注意的是不要在入口文件中的 `render` 方法里写逻辑及引用其他页面、组件，因为编译时 `render` 方法的内容会被直接替换掉，你的逻辑代码不会起作用。

## 4.2. 微信小程序页面配置

小程序的页面配置文件存在于 **pages**文件夹内的 `index.js` `config` 字段中

[小程序页面配置](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#页面配置)

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  // 页面配置
  config = {
    navigationBarTitleText: "首页"
  };
  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
      </View>
    );
  }
}
```

### 4.2.1. 生命周期对应关系

由于页面 JS 也继承自 `Component` 组件基类，所以页面同样拥有生命周期，页面的生命周期方法如下：

| 生命周期方法          | 作用             | 说明                                                          |
| --------------------- | ---------------- | ------------------------------------------------------------- |
| componentWillMount    | 页面被载入       | 在微信小程序中这一生命周期方法对应 `onLoad`                   |
| componentDidMount     | 页面渲染完成     | 在微信小程序中这一生命周期方法对应 `onReady`                  |
| shouldComponentUpdate | 页面是否需要更新 |                                                               |
| componentWillUpdate   | 页面即将更新     |                                                               |
| componentDidUpdate    | 页面更新完毕     |                                                               |
| componentWillUnmount  | 页面退出         | 在微信小程序中这一生命周期方法对应 `onUnload`                 |
| componentDidShow      | 页面展示出来     | 在微信小程序中这一生命周期方法对应 `onShow`，在 H5 中同样实现 |
| componentDidHide      | 页面被隐藏       | 在微信小程序中这一生命周期方法对应 `onHide`，在 H5 中同样实现 |

> 微信小程序中 `onLoad` 通常带有一个参数 `options`，在 Taro 中你可以在所有生命周期和普通事件方法中通过 `this.$router.params` 访问到，在其他端也适用

在小程序中，页面还有在一些专属的方法成员，如下

| 方法                 | 作用                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| onPullDownRefresh    | 页面相关事件处理函数--监听用户下拉动作                                                           |
| onReachBottom        | 页面上拉触底事件的处理函数                                                                       |
| onShareAppMessage    | 用户点击右上角转发                                                                               |
| onPageScroll         | 页面滚动触发事件的处理函数                                                                       |
| onTabItemTap         | 当前是 tab 页时，点击 tab 时触发                                                                 |
| componentWillPreload | [预加载](https://nervjs.github.io/taro/docs/best-practice.html#预加载)，只在**微信小程序**中可用 |

## 4.3. 路由功能

### 4.3.1. 路由 API 说明

在 **Taro** 中，路由功能是默认自带的，不需要开发者进行额外的路由配置。

我们只需要在入口文件的 `config` 配置中指定好 `pages`，然后就可以在代码中通过 **Taro** 提供的 API 来跳转到目的页面，例如：

```javascript
// 跳转到目的页面，打开新页面
Taro.navigateTo({
  url: "/pages/page/path/name"
});
```

具体 API 说明，请查看[导航](https://nervjs.github.io/taro/docs/native-api.html#导航)部分说明。

### 4.3.2. 路由传参

我们可以通过在所有跳转的 `url` 后面添加查询字符串参数进行跳转传参，例如

```javascript
// 传入参数 id=2&type=test
Taro.navigateTo({
  url: "/pages/page/path/name?id=2&type=test"
});
```

这样的话，在跳转成功的目标页的**生命周期**方法里就能通过 `this.$router.params` 获取到传入的参数，例如上述跳转，在目标页的 `componentWillMount` 生命周期里获取入参数

```javascript
class C extends Taro.Component {
  componentWillMount() {
    console.log(this.$router.params); // 输出 { id: 2, type: 'test' }
  }
}
```

## 4.4. 设计稿及尺寸单位

在 Taro 中尺寸单位建议使用 `px`、 `百分比 %`，Taro 默认会对所有单位进行转换。

Taro 默认以 `750px` 作为换算尺寸标准，如果设计稿不是以 `750px` 为标准，则需要在项目配置 `config/index.js` 中进行设置。

```javascript
const config = {
  projectName: 'myApp',
  date: '2018-12-6',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
    ....
  }
}
```

### 4.4.1. 注意

#### 4.4.1.1. 行内样式无法自动转换

但是如果是在 JS 中书写了行内样式，那么编译时就无法做替换了，针对这种情况，Taro 提供了 API `Taro.pxTransform` 来做运行时的尺寸转换。

```javascript
let fontsize = Taro.pxTransform(10); // 小程序：rpx，H5：rem
```

#### 4.4.1.2. 忽略转换

默认配置会对所有的 `px` 单位进行转换，有大写字母的 `Px` 或 `PX` 则会被忽略

# 5. taro 中的 JSX

在 Taro 中， `JSX` 是一种看起来很像 XML 的 JavaScript 语法扩展，比起模板语言

它具有以下优点：

1. 各大编辑器和 IDE 都能提供非常良好的支持；
2. 可以做到类型安全，在编译期就能发现错误；
3. 提供语义化并且可以移动的标签；
4. 背后的社区支持非常强力；

## 5.1. 小规范

为了更好的使用 jsx 实现功能，我们先简单的总结一下 Taro 中的 jsx 的规范。

请观察以下代码：

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

class Home extends Component {
  render() {
    return <View>Hello World!</View>;
  }
}
```

### 5.1.1. 必须声明 `Taro` 和组件

- 变量 `Taro` 也是一个必须引入声明的变量，因为我们在编译期和运行时会依赖这个变量做一些特殊处理。
- 变量 `View` 看起来并没有被调用，但也必须从 `@tarojs/components` 中引入声明
- [组件](https://nervjs.github.io/taro/docs/components-desc.html)
### 5.1.2. 首字母大写与驼峰式命名

在 Taro 中，所有组件都应当首字母大写并且使用大驼峰式命名法（Camel-Case）。

如：

```javascript
import Taro, { Component } from "@tarojs/taro";
// 引入一个自定义组件组件
import HomePage from "./HomePage";

class App extends Component {
  render() {
    return <HomePage message="Hello World!" />;
  }
}
```

## 5.2. 组件初体验

### 5.2.1. 新建组件 HelloWorld

在**src**目录下，新建组件文件夹`components` 和 组件 `HelloWorld.jsx` 或者 `HelloWorld.js`。 输入内容:

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
class HelloWorld extends Component {
  render() {
    return <View>组件 hello world</View>;
  }
}
```

### 5.2.2. 使用组件 HelloWorld

在 `src/pages/index.js` 中 ，引入组件并渲染

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import HelloWorld from "../../components/HelloWorld.jsx";
import "./index.scss";
export default class Index extends Component {
  config = {
    navigationBarTitleText: "taro-index"
  };
  // 要声明构造函数，否则 发布容易失败！
  constructor(props) {
    // 显式调用，否则  this.props将会是未定义
    super(props);
  }
  render() {
    return (
      <View>
        <HelloWorld />
      </View>
    );
  }
}
```

## 5.3. 属性

在 JSX 中有几种不同的方式来指定属性。

### 5.3.1. 使用 JavaScript 表达式

你可以任意地在 JSX 当中使用 [JavaScript 表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#%E8%A1%A8%E8%BE%BE%E5%BC%8F)，在 JSX 当中的表达式要包含在大括号里。例如，在这个 JSX 中：

```html
<Text data-title={ 1 + 2 + 3 + 4}> </Text>
```

**if** 语句和 **for** 循环在 JavaScript 中不是表达式，因此它们不能直接在 JSX 中使用。

错误的演示:

```html
<Text data-title="{" if(true) { 1 } }> 错误演示 </Text>
```

### 5.3.2. 字符串常量

你可以将字符串常量作为属性值传递。下面这两个 JSX 表达式是等价的：

```html
<MyComponent message='hello world' />

<MyComponent message={'hello world'} />
```

### 5.3.3. 默认为 True

如果你没有给属性传值，它默认为 true。因此下面两个 JSX 是等价的：

```html
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

### 5.3.4. 布尔值、Null 和 Undefined 被忽略

false、null、undefined 和 true 都是有效的 children，但它们不会直接被渲染。下面的表达式是等价的：

> 在小程序中，true和false是会直接编译出来的

```html
<View />

<View></View>

<View>{false}</View>

<View>{null}</View>

<View>{undefined}</View>

<View>{true}</View>
```

这在根据条件来确定是否渲染 元素时非常有用。以下的 JSX 只会在 showHeader 为 true 时渲染

组件。

```html
<View>
  {showHeader && <Header />}
  <Content />
</View>
```

### 5.3.5. 注意

React 可以使用 `...` 拓展操作符来传递属性，但在 Taro 中你**不能**这么做。例如：

**错误的写法**

```javascript
const props = { firstName: "Plus", lastName: "Second" };
return <Greeting {...props} />;
```

这样的操作会报错。你只能手动地把所有需要引用的 props 写上去:

**正确的写法**

```javascript
<Greeting firstName="Plus" lastName="Second" />
```

# 6. props & state

## 6.1. props

props 含义为属性，属性不可变。

当我们需要在父组件上传递数据给子组件时，可以使用`props` 技术。

### 6.1.1. 新建 Person.jsx

`person`组件中的 `name`、`height`、`isMale`都是从外部接收的。

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

class Person extends Component {
  constructor(props) {
    //  显式调用，否则  this.props容易出现未定义
    super(props);
  }
  render() {
    return (
      <View>
        <View>{this.props.name}</View>
        <View>{this.props.height}</View>
        <View>{this.props.isMale}</View>
      </View>
    );
  }
}
```

### 6.1.2. 页面 index.js

在页面`index.js`中，通过属性的方式动态给 Person 传入不同的 `name`、`height`、`gender`

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Person from "../../components/Person.jsx";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "taro-index"
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Person name="小红" height="150" isMale={true} />
        <Person name="小蓝" height="250" isMale={false} />
      </View>
    );
  }
}
```

### 6.1.3. Props 的只读性

为了规范而定，在组件中，是不能修改传入的`props`属性的。

```javascript
class Person extends Component {
  constructor(props) {
    super(props);
    // 不要修改
    this.props.name='大白';
  }
    ...
 }
```

### 6.1.4. 使用 PropTypes 检查类型

随着应用日渐庞大，你可以通过类型检查捕获大量错误。要检查组件的属性，你需要配置特殊的 `propTypes` 属性：

> _目前在小程序端还有些问题_，但在 H5 端可以使用，用法和在 React 里一样。 更多可参照[React 的相关文档](https://reactjs.org.cn/doc/typechecking-with-proptypes.html)。

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
// 引入 propTypes
import PropTypes from "prop-types";
class Person extends Component {
  constructor(props) {
    super(props);
    this.props.name = "大白";
  }
  render() {
    return (
      <View className="fz">
        <View>{this.props.name}</View>
        <View>{this.props.height}</View>
        <View>{this.props.isMale}</View>
      </View>
    );
  }
}

// 约束类型
Person.PropTypes = {
  name: PropTypes.string,
  height: PropTypes.number,
  isMale: PropTypes.bool
};
```

### 6.1.5. props 不能使用 `...` 拓展操作符

React 可以使用 `...` 拓展操作符来传递属性，但在 Taro 中你不能这么做。例如：

```javascript
const props = { firstName: "Plus", lastName: "Second" };
return <Greeting {...props} />;
```

这样的操作会报错。你只能手动地把所有需要引用的 props 写上去：

```javascript
<Greeting firstName="Plus" lastName="Second" />
```

## 6.2. State

state 含义为**状态**，状态可变。

当组件需要实现动态修改某些数据时，可以通过 `state`来实现。

### 6.2.1. 使用

一般是在组件的构造函数中进行初始化，然后就可以在组件的标签中进行使用。

- 初始化 `this.state={msg:'hello'}`
- 修改值 `this.setState({msg:'world'})`
- 标签中使用 `<View>{this.state.msg}</View>`

```javascript
// 声明
class Clock extends Component {
  constructor(props) {
    super(props);
    // 初始化
    this.state = {
      msg: "hello"
    };
    // 修改
    this.setState({
      msg: "world"
    });
  }
  render() {
    return (
      <View>
        <View>{this.state.msg}</View>
      </View>
    );
  }
}
```

### 6.2.2. 状态更新一定是异步的

React 的 `setState` 不一定总是异步的。而对于 Taro 而言，``setState``一定是异步的。如：

```javascript
  constructor(props) {
    super(props);
    // 初始化 count为 0
    this.state = {
      count:0
    };
    // 修改 count 为1
    this.setState({
      count:1
    })
    // 打印count的值 为 0
    console.log(this.state.count);
  }
```

如想要顺利的拿到修改后的值，正确的做法是 在 `setState` 的第二个参数传入一个 callback：

```javascript
this.setState(
  {
    count: 1
  },
  () => {
    // 在这个函数内你可以拿到 setState 之后的值
    console.log(this.state.count);
  }
);
```

区别于 react，下面这种写法也不行。

```javascript
this.setState((prevState, props) => ({
  count: prevState.count + 1
}));
console.log(this.state.count);
```

### 6.2.3. 组件 `state` 与 `props` 里字段重名

不要在 `state` 与 `props` 上用同名的字段，因为这些被字段在微信小程序中都会挂在 `data` 上。

# 7. 事件处理

Taro 中关于事件的触发有区别于微信小程序。

## 7.1. 事件的绑定

- Taro 事件绑定属性的命名采用驼峰式写法 并且是`on`开头

  **如:**

  ```html
  <button onClick={this.clickHandle}>点我点我</button>
  ```

  而微信小程序中 事件的绑定是以 `bind` 或者 `catch` 开头，`value`值 则是一个字符串

  ```html
  <button onclick="clickHandle">点我点我</button>
  ```

- 事件的处理函数不是字符串，而是一个 jsx 中的函数

- 可以在事件执行函数中直接使用 this，而不像 React 中需要调用下列代码来传入`this`

  ```javascript
    constructor(props) {
      super(props);
      // Taro 中不需要这样
  	this.clickHandle = this.clickHandle.bind(this);
    }
  ```

- 使用`stopPropagation`来阻止事件冒泡，而不是微信小程序中的`catchEvent`

## 7.2. 事件触发

Taro 中，事件处理函数要写在和**构造函数**同层级，如

```javascript
class Index extends React.Component {
  constructor (props) {
    super(props)
  }
  clickHandle = (e) => {
  // 事件的逻辑
    }))
  }
}
```

## 7.3. 阻止事件冒泡

在 Taro 中不能像微信小程序一样 使用 `catchEvent`阻止事件冒泡，必须在执行事件中调用`e.stopPropagation`

```javascript
clickHandle = e => {
  // 阻止事件冒泡
  e.stopPropagation();
};
```

## 7.4. 事件传递参数

当我们向事件的处理函数传递参数时，可以使用 `bind`的方式来传递，同时，事件对象 `e` 要排在所传递参数的后面。如

```javascript
class Popper extends Component {
  constructor() {
    super(props);
    this.state = { name: "Hello world!" };
  }

  // 你可以通过 bind 传入多个参数
  preventPop(name, test, e) {
    //事件对象 e 要放在最后
    e.preventDefault();
  }

  render() {
    return (
      <Button onClick={this.preventPop.bind(this, this.state.name, "test")} />
    );
  }
}
```

区别于 React 中的箭头函数传参，Taro 目前不支持如下写法。

```javascript
class Popper extends Component {
  constructor() {
    super(props);
    this.state = { name: "Hello world!" };
  }

  // 你可以通过 bind 传入多个参数
  preventPop(name, test, e) {
    //事件对象 e 要放在最后
    e.preventDefault();
  }

  render() {
    // Taro不支持
    return (
      <Button onClick={e => this.preventPop(this.state.name, "test", e)} />
    );
  }
}
```

## 7.5. 事件的传递

事件的传递，其实就是 子组件触发父组件中的事件，并且可以传递对应的参数的过程。

> 需要注意的是 任何组件的事件传递都要以 `on` 开头

**组件 IndexComA**

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

class IndexComA extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View onClick={this.props.onClick.bind(this, "IndexComA")}>
        IndexComA
      </View>
    );
  }
}
```

**组件 IndexComB**

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

class IndexComB extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View onClick={this.props.onClick.bind(this, "IndexComB")}>
        IndexComB
      </View>
    );
  }
}
```

**父组件**

```javascript
import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import IndexComA from "../../components/IndexComA";
import IndexComB from "../../components/IndexComB";
import "./index.scss";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "index"
  };
  constructor(props) {
    super(props);
  }
  clickHd(arg) {
    console.log("组件 " + arg);
  }
  render() {
    return (
      <View>
        <IndexComA onClick={this.clickHd} />
        <IndexComB onClick={this.clickHd} />
      </View>
    );
  }
}
```

# 8. 条件渲染

在 Taro 中，我们可以使用 **元素变量**， **if**， **三元运算符** ，**逻辑运算符** `&&`来增加标签的渲染能力。

## 8.1. 元素变量 和 if

```javascript
// LoginStatus.js
class LoginStatus extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    // 这里最好初始化声明为 `null`，初始化又不赋值的话
    // 小程序可能会报警为变量为 undefined
    let status = null;
    if (isLoggedIn) {
      status = <Text>已登录</Text>;
    } else {
      status = <Text>未登录</Text>;
    }

    return <View>{status}</View>;
  }
}
// app.js
import LoginStatus from "./LoginStatus";

// 这样会渲染 `已登录`
class App extends Component {
  render() {
    return (
      <View>
        <LoginStatus isLoggedIn={true} />
      </View>
    );
  }
}
```

## 8.2. 逻辑运算符 `&&`

更加方便的渲染方式。

```javascript
class LoginStatus extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <View>
        {isLoggedIn && <Text>已登录</Text>}
        {!isLoggedIn && <Text>未登录</Text>}
      </View>
    );
  }
}
```

## 8.3. 三元运算符

条件渲染的另一种方法是使用 JavaScript 的条件运算符 `condition ? true : false`。

```javascript
class LoginStatus extends Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn;

    return (
      <View>{isLoggedIn ? <Text>已登录</Text> : <Text>未登录</Text>}</View>
    );
  }
}
```

# 9. 列表渲染

在 Taro 中，需要渲染列表时，是通过 javascript 中的`map`方法进行遍历的。同时也需要指定 `key`属性

如：

```javascript
const numbers = [...Array(50).keys()]; // [0, 1, 2, ..., 98, 99]
const listItems = numbers.map(number => {
  return (
    <View key={number} className="li">
      我是第 {number + 1} 个数字
    </View>
  );
});
```

## 9.1. 注意

1. `key`不会作为参数传递到子组件

2. 不同于`React` 在`Taro`中，能把 map 函数生成的模板当做一个数组来处理

   ```javascript
   // 错误
   const list = this.state.list
     .map(l => {
       if (l.selected) {
         return <li>{l.text}</li>;
       }
     })
     .filter(React.isValidElement);
   ```

# 10. Children 与组合

## 10.1. Children

在我们设计组件时，有些组件通常不知道自己的子组件会有什么内容，例如 `Sidebar` 和 `Dialog` 这样的容器组件。

我们建议在这样的情况使用 `this.props.children` 来传递子元素：

```javascript
class Dialog extends Component {
  render() {
    return (
      <View className="dialog">
        <View className="header">Welcome!</View>
        <View className="body">{this.props.children}</View>
        <View className="footer">-- divider --</View>
      </View>
    );
  }
}
```

这样就能允许其它组件在 JSX 中嵌套任意子组件传递给 `Dialog`:

```javascript
class App extends Component {
  render() {
    return (
      <View className="container">
        <Dialog>
          <View className="dialog-message">Thank you for using Taro.</View>
        </Dialog>
      </View>
    );
  }
}
```

在 `<Dialog />` JSX 标签内的任何内容都会作为它的子元素(Children)都会传递到它的组件。

## 10.2. 组合

有些情况你不仅仅需要只传递一个子组件，可能会需要很多个「占位符」。

**dialog**

```javascript
class Dialog extends Component {
  render() {
    return (
      <View className="dialog">
        <View className="header">{this.props.renderHeader}</View>
        <View className="body">{this.props.children}</View>
        <View className="footer">{this.props.renderFooter}</View>
      </View>
    );
  }
}
```

**APP**

```javascript
class App extends Component {
  render() {
    return (
      <View className="container">
        <Dialog
          renderHeader={<View className="welcome-message">Welcome!</View>}
          renderFooter={<Button className="close">Close</Button>}
        >
          <View className="dialog-message">Thank you for using Taro.</View>
        </Dialog>
      </View>
    );
  }
}
```

## 10.3. 注意事项

**请不要对 this.props.children 进行任何操作**。Taro 在小程序中实现这个功能使用的是小程序的 [`slot`](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html) 功能，也就是说你可以把 `this.props.children` 理解为 `slot` 的语法糖，`this.props.children` 在 Taro 中并不是 React 的 `ReactElement` 对象，因此形如 `this.props.children && this.props.children`、`this.props.children[0]` 在 Taro 中都是非法的。

**this.props.children 无法用 defaultProps 设置默认内容**。由于小程序的限制，Taro 也无法知道组件的消费者是否传入内容，所以无法应用默认内容。

**不能把 this.props.children 分解为变量再使用**。由于普通的 `props` 有一个确切的值，所以当你把它们分解为变量运行时可以处理，`this.props.children` 则不能这样操作，你必须显性地把 `this.props.children` 全部都写完整才能实现它的功能。

**组件的组合需要遵守 this.props.children 的所有规则**。组合这个功能和 `this.props.children` 一样是通过 `slot` 实现的，也就是说 `this.props.children` 的限制对于组件组合也都同样适用。

**所有组合都必须用 render 开头，且遵守驼峰式命名法**。和我们的事件规范以 `on` 开头一样，组件组合使用 `render` 开头。

**组合只能传入单个 JSX 元素，不能传入其它任何类型**。当你需要进行一些条件判断或复杂逻辑操作的时候，可以使用一个 `Block` 元素包裹住，然后在 `Block` 元素的里面填充其它复杂的逻辑。

# 11. 组件的外部样式和全局样式

自定义组件对应的样式文件，**默认**只对该组件内的节点生效。编写组件样式时需要注意

- 组件和引用组件的页面不能使用 id 选择器（`#a`）、属性选择器（`[a]`）和标签名选择器，请改用 class 选择器。
- **继承样式，如 font 、 color ，会从组件外（父组件）继承到组件内。但是引用组件时在组件节点上书写的 className 无效。**

## 11.1. 外部样式类

如果想传递样式给引用的自定义组件，直接传递 `className`**不可行**

需要利用 `externalClasses` 定义段定义若干个外部样式类

**CustomComp.js**

```javascript

export default CustomComp extends Component {
  static externalClasses = ['my-class']

  render () {
    return <View className="my-class">这段文本的颜色由组件外的 class 决定</View>
  }
}
```

**MyPage.js**

```javascript
export default MyPage extends Component {
  render () {
    return <CustomComp my-class="red-text" />
  }
}
```

## 11.2. 全局样式类

使用外部样式类可以让组件使用指定的组件外样式类，如果希望组件外样式类能够完全影响组件内部，可以将组件构造器中的 `options.addGlobalClass` 字段置为 `true`。

**CustomComp.js**

```javascript
export default CustomComp extends Component {
  static options = {
    addGlobalClass: true
  }
  render () {
    return <View className="red-text">这段文本的颜色由组件外的 class 决定</View>
  }
}
```

# 12. [Refs 引用](https://nervjs.github.io/taro/docs/ref.html)

该知识点主要应用在 h5 端，如可以直接操作到对应的 dom 元素，动态设置焦点等。在微信小程序中并没有太多的使用场景。因此省略。

# 13 其他

## 13.1. [最佳实践](https://nervjs.github.io/taro/docs/best-practice.html)

### 13.1.1关于 JSX 支持程度补充说明

由于 JSX 中的写法千变万化，我们不能支持到所有的 JSX 写法，同时由于微信小程序端的限制，也有部分 JSX 的优秀用法暂时不能得到很好地支持，特在此补充说明一下对于 JSX 的支持程度

- [不能在包含 JSX 元素的 map 循环中使用 if 表达式](https://github.com/NervJS/taro/blob/master/packages/eslint-plugin-taro/docs/if-statement-in-map-loop.md)
- [不能使用 Array#map 之外的方法操作 JSX 数组](https://github.com/NervJS/taro/blob/master/packages/eslint-plugin-taro/docs/manipulate-jsx-as-array.md)
- [不能在 JSX 参数中使用匿名函数](https://github.com/NervJS/taro/blob/master/packages/eslint-plugin-taro/docs/no-anonymous-function-in-props.md)
- [暂不支持在 render() 之外的方法定义 JSX](https://github.com/NervJS/taro/blob/master/packages/eslint-plugin-taro/docs/no-jsx-in-class-method.md)
- [不能在 JSX 参数中使用对象展开符](https://github.com/NervJS/taro/blob/master/packages/eslint-plugin-taro/docs/no-spread-in-props.md)
- [不支持无状态组件](https://github.com/NervJS/taro/blob/master/packages/eslint-plugin-taro/docs/no-stateless-function.md)
- .....................................................................................

