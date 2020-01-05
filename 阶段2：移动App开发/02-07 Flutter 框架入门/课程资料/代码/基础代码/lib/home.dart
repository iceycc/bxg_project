import 'package:flutter/material.dart';
import 'package:flutterdemo/drawer_list.dart';
import 'package:flutterdemo/hello.dart';



class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter'),
        leading: Icon(Icons.menu),
        actions: <Widget>[
          Icon(Icons.search)
        ],
      ),
      body: Hello(),
      drawer: DrawerList(),
    );
  }
}
