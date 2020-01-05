# Flutter 开发使用Dart语言
    地址：https://www.dartlang.org/

# Flutter 中文网
    地址：https://flutterchina.club/

# 编写您的第一个 Flutter App
    地址：https://flutterchina.club/get-started/codelab/

# 编写注意事项
    1、我们在Flutter中使用图片的时候，一定要在pubspec.yaml中进行注册

    2、Flutter组件中只有一些组件可以设置宽高，比如Container

    3、Flutter组件中，Column和Row就类似于前端中的Flex布局的两个方向

    4、Flutter中，在Row和Column中，布局最常用的两个属性 mainAxisAlignment
        crossAxisAlignment

    5、Dart中获取对象的属性值，不能通过`.`，必须使用`[]`

# 用到的第三方插件
    首页轮播图:【flutter_swiper】
        https://github.com/best-flutter/flutter_swiper

    电影页面发送网络请求【dio】
        https://github.com/flutterchina/dio

# 跳转页面
    注意点：需要拿到根页面的上下文
    
    Navigator.of(widget.parentContext).push(
                        new MaterialPageRoute(
                            builder: (ctx) =>
                                new 组件名称(key: value)));

# 下拉刷新 & 上拉加载更多
    下拉刷新，需要使用组件 RefreshIndicator
        new RefreshIndicator(
                child: 组件,
                onRefresh: 下拉刷新要执行的函数));

    上拉加载更多
        创建ScrollController

        在构造器中，初始化它 _controller.addListener

        在ListView中加上即可 
        ListView.builder(
            itemCount: movieList.length,
            itemBuilder: (context, i) => renderRow(i, context),
            controller: _controller
        )

    



