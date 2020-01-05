import 'package:flutter/material.dart';

class TabDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text(
            'Tab标签切换'
          ),
          elevation: 0.0,
          leading: Icon(Icons.menu),
          actions: <Widget>[
            Icon(Icons.search)
          ],
          bottom: TabBar(
            labelColor: Colors.white,
            labelStyle: TextStyle(
              fontSize: 20.0
            ),
            unselectedLabelColor: Colors.grey,
            unselectedLabelStyle: TextStyle(
              fontSize: 18.0
            ),
            indicatorColor: Colors.white,
            indicatorSize: TabBarIndicatorSize.label,
            indicatorWeight: 3.0,
            tabs: <Widget>[
              Tab(text: 'HTML',),
              Tab(text: 'Java',),
              Tab(text: 'Python',),
            ],
          ),
        ),
        body: TabBarView(
          children: <Widget>[
            Icon(Icons.settings,size: 90.0,),
            Icon(Icons.search,size: 90.0,),
            Icon(Icons.satellite,size: 90.0,),
          ],
        )
      ),
    );
  }
}