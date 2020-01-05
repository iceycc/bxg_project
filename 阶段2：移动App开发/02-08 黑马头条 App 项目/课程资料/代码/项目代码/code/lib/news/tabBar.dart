import 'package:flutter/material.dart';

class TabBarBtn extends StatelessWidget {
  final List channel;
  TabBarBtn(this.channel);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: TabBar(
        labelColor: Colors.black,
        unselectedLabelColor: Colors.black45,
        labelStyle: TextStyle(
          fontSize: 14.0
        ),
        indicatorColor: Colors.blueAccent,
        indicatorWeight: 3.0,
        indicatorSize: TabBarIndicatorSize.label,
        labelPadding: EdgeInsets.symmetric(horizontal: 20.0),
        isScrollable: true,
        tabs: channel.map((value){
          return Tab(text: value['name'],);
        }).toList()
      ),
    );
  }
}