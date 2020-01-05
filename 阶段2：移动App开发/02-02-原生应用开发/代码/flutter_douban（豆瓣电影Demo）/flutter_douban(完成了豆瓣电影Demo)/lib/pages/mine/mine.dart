import 'package:flutter/material.dart';

class MinePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        theme: new ThemeData(
          primarySwatch: Colors.blue,
        ),
        debugShowCheckedModeBanner: false,
        home: new Scaffold(
            appBar: new AppBar(
                title:
                    new Text('我的', style: new TextStyle(color: Colors.black)),
                backgroundColor: Colors.white),
            body: new Center(child: new Text('我的'))));
  }
}