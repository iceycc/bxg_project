---
typora-copy-images-to: medias
---

# 1. 美团项目介绍

> 美团小程序

通过`mpvue`来实现一个美团首页应用，加深对`mpvue`框架的理解。

# 2. 技术铺垫

- `html` 和 `css` 和 `JavaScript` 基本功
- 部分 `es6`
- 微信小程序基础
- `mpvue`

# 3. 关键技术

| 名称             | 链接                                                         | 备注             |
| ---------------- | ------------------------------------------------------------ | ---------------- |
| 微信小程序       | [开发文档](https://developers.weixin.qq.com/miniprogram/dev/component/) | 官方文档         |
| mpvue            | [官网](http://mpvue.com/mpvue/)                              | 官方文档         |
| 腾讯地图开发中心 | [官网](https://lbs.qq.com/index.html)                        | 用来获取地理位置 |

# 4. 成果

<img src="./medias/1.jpg" style="display:block;margin:0 auto;border:1px solid #ccc;" width="400">

# 5. 项目搭建

1. 在电脑任意地方 输入 以下命令 开始创建项目

   ```sh
   vue init mpvue/mpvue-quickstart mpvue_meituan
   ```

2. 进入项目，并且安装依赖

   ```sh
   cd meituan
   npm install
   ```

3. 安装`sass`依赖

   ```sh
   npm i node-sass sass-loader --save-dev
   ```

4. 启动项目

   ```sh
   npm run dev
   ```

# 6. 小程序全局配置和页面配置

全局配置文件是`app.json`，页面配置文件，需要在对应的pages文件夹内新建文件 `main.json`。mpvue在打包编译时会自动把`main.json`同步到`dist`文件夹内。

# 7. 接口地址

公共路径：https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3

| 接口名称   | 接口路径        | 备注 |
| ---------- | --------------- | ---- |
| 首页轮播图 | /index/swiper   |      |
| 首页导航   | /index/entry    |      |
| 首页广告   | /index/ad       |      |
| 首页拼团   | /index/pingtuan |      |
| 猜你喜欢   | /index/like     |      |

