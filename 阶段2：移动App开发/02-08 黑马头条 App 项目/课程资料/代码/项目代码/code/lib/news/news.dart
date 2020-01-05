import 'package:flutter/material.dart';
import 'package:heim_app/moudle/pub.dart';
import 'package:heim_app/news/drawer.dart';
import 'package:heim_app/news/searchBox.dart';
import 'package:heim_app/news/tabBar.dart';
import 'package:heim_app/news/tabContent.dart';

class News extends StatefulWidget {
  @override
  _NewsState createState() => _NewsState();
}

class _NewsState extends State<News> {

  List channels = [];

  _getChannels () async{
    print('关闭之后刷新复机');
    var data = await PubMoudle.httpRequest('get', '/getchannels');
    // print(data.data['data']['channels']);
    setState(() {
      channels = data.data['data']['channels'];
    });
  }

  @override
  void initState() {
    super.initState();
    _getChannels();
  }

  @override
  Widget build(BuildContext context) {
    return channels.length == 0 ?SizedBox():DefaultTabController(
      length: channels.length,
      child: Scaffold(
        appBar: AppBar(
          title: SearchBox(),
          elevation: 0.0,
          bottom: PreferredSize(
            preferredSize: Size.fromHeight(50.0),
            child: TabBarBtn(channels)
          )
        ),
        body: TabBarView(
          children: channels.map((value){
            return TabBarContent(value['id']);
          }).toList()
        ),
        drawer: DrawerList(_getChannels),
      ),
    );
  }
}
