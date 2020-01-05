import 'package:flutter/material.dart';
import 'package:heim_app/personal/collect_content.dart';

class CollectPage extends StatelessWidget {
  final String str;
  CollectPage(this.str);

  final List<Tab> myTabs = <Tab>[
    Tab(
      text: '我的收藏',
    ),
    Tab(
      text: '我的历史',
    )
  ];

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      initialIndex: str == '历史'?1:0,
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('收藏/历史'),
          elevation: 0.0,
          bottom: PreferredSize(
            preferredSize: Size.fromHeight(50.0),
            child: Container(
              color: Colors.white,
              child: TabBar(
                labelStyle: TextStyle(
                  fontSize: 16.0
                ),
                labelColor: Colors.blue,
                unselectedLabelColor: Colors.black,
                indicatorColor: Colors.blueAccent,
                indicatorWeight: 2.0,
                indicatorSize: TabBarIndicatorSize.label,
                tabs: myTabs,
              ),
            )
          ),
        ),
        body: TabBarView(
          children: myTabs.map((value){
            return CollectContent(value.text);
          }).toList()
        ),
      ),
    );
  }
}