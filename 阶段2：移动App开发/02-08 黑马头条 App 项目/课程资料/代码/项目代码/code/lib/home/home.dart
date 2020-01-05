import 'package:flutter/material.dart';
import 'package:heim_app/news/news.dart';
import 'package:heim_app/question/question.dart';
import 'package:heim_app/user/user.dart';
import 'package:heim_app/video/video.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

  int _index = 0;

  List _bodys = [
    News(),
    Question(),
    Video(),
    User(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _bodys[_index],
      bottomNavigationBar: BottomNavigationBar(
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            title: Text('首页')
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.question_answer),
            title: Text('问答')
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.video_label),
            title: Text('视频')
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            title: Text('我的')
          ),
        ],
        type: BottomNavigationBarType.fixed,
        currentIndex: _index,
        onTap: (index){
          setState(() {
            _index = index;          
          });
        },
      ),
    );
  }
}
