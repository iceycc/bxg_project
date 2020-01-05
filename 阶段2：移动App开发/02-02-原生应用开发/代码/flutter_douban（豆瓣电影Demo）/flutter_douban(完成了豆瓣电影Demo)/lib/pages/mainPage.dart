import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter_douban/pages/home/home.dart';
import 'package:flutter_douban/pages/movie/movie.dart';
import 'package:flutter_douban/pages/mine/mine.dart';

class MainPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(home: new MainPageWidget());
  }
}

class MainPageWidget extends StatefulWidget {
  @override
  createState() => new MainPageState();
}

class MainPageState extends State<MainPageWidget> {
  //当前选中的tabBar的索引
  int _tabIndex = 0;
  var tabImages;
  var appBarTitles = ['首页', '电影', '我的'];

  /*
   * 根据image路径获取图片
   * 这个图片的路径需要在 pubspec.yaml 中去定义
   */
  Image getTabImage(path) {
    return new Image.asset(path, width: 25.0, height: 25.0);
  }

  /*
   * 根据索引获得对应的normal或是press的icon
   */
  Image getTabIcon(int curIndex) {
    if (curIndex == _tabIndex) {
      return tabImages[curIndex][1];
    }
    return tabImages[curIndex][0];
  }

  /*
   * 获取bottomTab的颜色和文字
   */
  Text getTabTitle(int curIndex) {
    if (curIndex == _tabIndex) {
      return new Text(appBarTitles[curIndex],
          style: new TextStyle(color: Colors.black, fontSize: 14.0));
    } else {
      return new Text(appBarTitles[curIndex],
          style: new TextStyle(color: const Color(0xff888888), fontSize: 14.0));
    }
  }

  /*
   * 存储的四个页面，和Fragment一样
   */
  var _bodys;

  void initData() {
    /*
      bottom的按压图片
     */
    tabImages = [
      [
        getTabImage('images/tabBar/home_normal.png'),
        getTabImage('images/tabBar/home_selected.png')
      ],
      [
        getTabImage('images/tabBar/movie_normal.png'),
        getTabImage('images/tabBar/movie_selected.png')
      ],
      [
        getTabImage('images/tabBar/mine_normal.png'),
        getTabImage('images/tabBar/mine_selected.png')
      ]
    ];

    _bodys = [new HomePage(), new MoviePage(context), new MinePage()];
  }

  @override
  Widget build(BuildContext context) {
    initData();
    // TODO: implement build
    return new Scaffold(
        body: _bodys[_tabIndex],
        bottomNavigationBar: new BottomNavigationBar(
          items: <BottomNavigationBarItem>[
            new BottomNavigationBarItem(
                icon: getTabIcon(0), title: getTabTitle(0)),
            new BottomNavigationBarItem(
                icon: getTabIcon(1), title: getTabTitle(1)),
            new BottomNavigationBarItem(
                icon: getTabIcon(2), title: getTabTitle(2))
          ],
          //设置显示的模式
          type: BottomNavigationBarType.fixed,
          //设置当前的索引
          currentIndex: _tabIndex,
          //tabBottom的点击监听
          onTap: (index) {
            setState(() {
              _tabIndex = index;
            });
          },
        ));
  }
}
