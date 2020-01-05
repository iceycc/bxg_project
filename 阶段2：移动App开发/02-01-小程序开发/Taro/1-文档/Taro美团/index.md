---
typora-copy-images-to: medias
---

# 1. 美团项目介绍

> 美团小程序

通过`Taro`来实现一个美团首页应用，加深对`Taro`框架的理解。

# 2. 技术铺垫

- `html` 和 `css` 和 `JavaScript` 基本功
- `React`语法知识
- 部分 `es6`
- 微信小程序基础
- `Taro`

# 3. 关键技术

| 名称             | 链接                                                         | 备注             |
| ---------------- | ------------------------------------------------------------ | ---------------- |
| 微信小程序       | [开发文档](https://developers.weixin.qq.com/miniprogram/dev/component/) | 官方文档         |
| Taro             | [开发文档](https://nervjs.github.io/taro/docs/README.html)   | 官方文档         |
| 腾讯地图开发中心 | [官网](https://lbs.qq.com/index.html)                        | 用来获取地理位置 |

# 4. 成果

<img src="./medias/1.jpg" style="display:block;margin:0 auto;border:1px solid #ccc;" width="400">

# 5. 项目搭建

1. 在电脑任意地方 输入 以下命令 开始创建项目

   ```sh
   taro init taro_meituan
   ```

2. 启动项目

   ```sh
   npm run dev:weapp
   ```

# 6. 接口地址

公共路径：https://nei.netease.com/api/apimock/f24b78ec29760fc9073f012abfd4c4f3

| 接口名称   | 接口路径        | 备注 |
| ---------- | --------------- | ---- |
| 首页轮播图 | /index/swiper   |      |
| 首页导航   | /index/entry    |      |
| 首页广告   | /index/ad       |      |
| 首页拼团   | /index/pingtuan |      |
| 猜你喜欢   | /index/like     |      |

