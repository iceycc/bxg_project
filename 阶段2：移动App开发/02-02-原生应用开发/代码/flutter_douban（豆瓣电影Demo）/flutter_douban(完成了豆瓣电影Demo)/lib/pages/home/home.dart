import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class HomePage extends StatelessWidget {
  List<String> images = [
    'http://www.itcast.cn/images/slidead/BEIJING/2017410109413000.jpg',
    'http://www.itcast.cn/images/slidead/BEIJING/2017440109442800.jpg',
    'http://www.itcast.cn/images/slidead/BEIJING/2017441409442800.jpg'
  ];
  @override
  Widget build(BuildContext context) {
     TextStyle textStyle = new TextStyle(
        color: Colors.black,
        fontFamily: 'Roboto',
        letterSpacing: 0.5,
        fontSize: 14.0);
    return new MaterialApp(
        theme: new ThemeData(
          primarySwatch: Colors.blue,
        ),
        debugShowCheckedModeBanner: false,
        home: new Scaffold(
            appBar: new AppBar(
                title:
                    new Text('首页', style: new TextStyle(color: Colors.black)),
                backgroundColor: Colors.white),
            body: new Container(
              height: 300,
              child: new Column(children: <Widget>[
                new Container(
                  height: 250,
                  child: new Swiper(
                    itemBuilder: (BuildContext context, int index) {
                      return new Image.network(
                        images[index],
                        fit: BoxFit.fill,
                      );
                    },
                    itemCount: images.length,
                    pagination: new SwiperPagination(),
                    control: new SwiperControl(),
                  ),
                ),
                new Container(
                  height: 50,
                  color: Colors.orangeAccent,
                  child: new Row(
                    mainAxisAlignment:MainAxisAlignment.spaceAround,
                    children: <Widget>[
                    new Text('首页',style: textStyle),
                    new Text('电影',style: textStyle),
                    new Text('我的',style: textStyle)
                  ]),
                )
              ]),
            )));
  }
}
