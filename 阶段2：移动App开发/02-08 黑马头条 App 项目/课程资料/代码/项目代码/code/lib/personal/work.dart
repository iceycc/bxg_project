import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

class WorkPage extends StatelessWidget {

  final List<Tab> myTabs = <Tab>[
    Tab(text: '作品',),
    Tab(text: '公告',),
    Tab(text: '数据',),
  ];

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: Text('黑马程序员'),
          elevation: 0.0,
          bottom: PreferredSize(
            preferredSize: Size.fromHeight(50.0),
            child: Container(
              color: Colors.white,
              child: TabBar(
                unselectedLabelColor: Colors.black,
                labelColor: Colors.blue,
                labelStyle: TextStyle(
                  fontSize: 16.0
                ),
                indicatorColor: Colors.blueAccent,
                indicatorSize: TabBarIndicatorSize.label,
                tabs: myTabs,
              ),
            ),
          ),
        ),
        body: TabBarView(
          children: <Widget>[
            WorkContent(),
            NoticeContent(),
            DataContent(),
          ],
        ),
      ),
    );
  }
}

class DataContent extends StatefulWidget {
  @override
  _DataContentState createState() => _DataContentState();
}

class _DataContentState extends State<DataContent> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 10.0),
      padding: EdgeInsets.symmetric(vertical: 20.0),
      color: Colors.white,
      child: Row(
        children: <Widget>[
          Expanded(
            child: Column(
              children: <Widget>[
                Text(
                  '56',
                  style: TextStyle(
                    fontSize: 22.0,
                    fontWeight: FontWeight.w600
                  ),
                ),
                Text(
                  '粉丝数'
                ),
              ],
            ),
          ),
          Expanded(
            child: Column(
              children: <Widget>[
                Text(
                  '56',
                  style: TextStyle(
                    fontSize: 22.0,
                    fontWeight: FontWeight.w600
                  ),
                ),
                Text(
                  '累计阅读量'
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class NoticeContent extends StatefulWidget {
  @override
  _NoticeContentState createState() => _NoticeContentState();
}

class _NoticeContentState extends State<NoticeContent> {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        Container(
          color: Colors.white,
          margin: EdgeInsets.symmetric(vertical: 5.0),
          child: ListTile(
            title: Text(
              '传智播客年度Java技术盘点，懂这些技术的程序员2019年薪资翻倍妥妥的！',
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            contentPadding: EdgeInsets.all(15.0),
            subtitle: Padding(
              padding: EdgeInsets.only(top:6.0),
              child: Text(
                '2018-01-01'
              ),
            ),
          ),
        ),
        Container(
          color: Colors.white,
          margin: EdgeInsets.symmetric(vertical: 5.0),
          child: ListTile(
            title: Text(
              '传智播客年度Java技术盘点，懂这些技术的程序员2019年薪资翻倍妥妥的！',
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            contentPadding: EdgeInsets.all(15.0),
            subtitle: Padding(
              padding: EdgeInsets.only(top:6.0),
              child: Text(
                '2018-01-01'
              ),
            ),
          ),
        ),
        Container(
          color: Colors.white,
          margin: EdgeInsets.symmetric(vertical: 5.0),
          child: ListTile(
            title: Text(
              '传智播客年度Java技术盘点，懂这些技术的程序员2019年薪资翻倍妥妥的！',
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            contentPadding: EdgeInsets.all(15.0),
            subtitle: Padding(
              padding: EdgeInsets.only(top:6.0),
              child: Text(
                '2018-01-01'
              ),
            ),
          ),
        )
      ],
    );
  }
}

class WorkContent extends StatefulWidget {
  @override
  _WorkContentState createState() => _WorkContentState();
}

class _WorkContentState extends State<WorkContent> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: ListView(
        children: <Widget>[
          Container(
            color: Colors.white,
            margin: EdgeInsets.symmetric(vertical: 5.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                ListTile(
                  leading: CircleAvatar(
                    backgroundImage: NetworkImage('http://www.itcast.cn/files/image/201811/20181129154459467.jpg'),
                  ),
                  title: Text(
                    '黑马李依依'
                  ),
                  subtitle: Text(
                    '2018-01-01'
                  ),
                ),
                Padding(
                  padding: EdgeInsets.all(15.0),
                  child: Text(
                    '黑马李依依黑马李依依黑马李依依黑马李依依黑马李依依',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 16.0,
                    ),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 15.0),
                  child: Row(
                    children: <Widget>[
                      Expanded(
                        child: CachedNetworkImage(
                          imageUrl: "http://www.itcast.cn/files/image/201809/20180914163608668.jpg",
                          placeholder: new CircularProgressIndicator(),
                          errorWidget: new Icon(Icons.error),
                        ),
                      ),
                      SizedBox(width: 3.0,),
                      Expanded(
                        child: CachedNetworkImage(
                          imageUrl: "http://www.itcast.cn/files/image/201809/20180914163608668.jpg",
                          placeholder: new CircularProgressIndicator(),
                          errorWidget: new Icon(Icons.error),
                        ),
                      ),
                      SizedBox(width: 3.0,),
                      Expanded(
                        child: CachedNetworkImage(
                          imageUrl: "http://www.itcast.cn/files/image/201809/20180914163608668.jpg",
                          placeholder: new CircularProgressIndicator(),
                          errorWidget: new Icon(Icons.error),
                        ),
                      ),
                    ],
                  ),
                ),
                Divider(),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 15.0),
                  child: Row(
                    children: <Widget>[
                      Expanded(
                        child: RaisedButton.icon(
                          label: Text('123'),
                          icon: Icon(Icons.chat_bubble_outline),
                          color: Colors.white,
                          onPressed: (){},
                          elevation: 0.0,
                        ),
                      ),
                      Expanded(
                        child: RaisedButton.icon(
                          label: Text('123'),
                          icon: Icon(Icons.chat_bubble_outline),
                          color: Colors.white,
                          onPressed: (){},
                          elevation: 0.0,
                        ),
                      ),
                      Expanded(
                        child: RaisedButton.icon(
                          label: Text('123'),
                          icon: Icon(Icons.chat_bubble_outline),
                          color: Colors.white,
                          onPressed: (){},
                          elevation: 0.0,
                        ),
                      )
                    ],
                  ),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}