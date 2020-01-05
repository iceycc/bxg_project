import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:heim_app/moudle/pub.dart';

class CollectContent extends StatefulWidget {
  final String text;
  CollectContent(this.text);

  @override
  _CollectContentState createState() => _CollectContentState();
}

class _CollectContentState extends State<CollectContent> {

  List collectData;

  _getData(){
    var collecctResult = PubMoudle.httpRequest('get', '/getCollect?type=${widget.text == '我的收藏'?1:2}');
    setState(() {
      collectData = collecctResult.data['data']['result'];
    });
  }

  @override
  void initState() {
    super.initState();
    _getData();
  }
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: collectData.map((value){
        return Container(
          margin: EdgeInsets.symmetric(vertical: 5.0),
          color: Colors.white,
          padding: EdgeInsets.all(10.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Text(
                'cached_network_image 0.5.1',
                style: TextStyle(
                  fontSize: 20.0,
                ),
              ),
              SizedBox(height: 10.0,),
              Row(
                children: <Widget>[
                  Expanded(
                    child: CachedNetworkImage(
                      imageUrl: "http://www.itcast.cn/files/image/201809/20180914163608668.jpg",
                      placeholder: new CircularProgressIndicator(),
                      errorWidget: new Icon(Icons.error),
                    ),
                  ),
                  Expanded(
                    child: CachedNetworkImage(
                      imageUrl: "http://www.itcast.cn/files/image/201809/20180914163608668.jpg",
                      placeholder: new CircularProgressIndicator(),
                      errorWidget: new Icon(Icons.error),
                    ),
                  ),
                  Expanded(
                    child: CachedNetworkImage(
                      imageUrl: "http://www.itcast.cn/files/image/201809/20180914163608668.jpg",
                      placeholder: new CircularProgressIndicator(),
                      errorWidget: new Icon(Icons.error),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 10.0,),
              Text('黑马程序员 2018-10-10'),
              SizedBox(height: 10.0,),
              Row(
                children: <Widget>[
                  Expanded(
                    child: RaisedButton.icon(
                      onPressed: (){},
                      icon: Icon(Icons.chat_bubble_outline),
                      label: Text('评论'),
                      elevation: 0.0,
                      color: Colors.white,
                    ),
                  ),
                  Expanded(
                    child: RaisedButton.icon(
                      onPressed: (){},
                      icon: Icon(Icons.thumb_up),
                      label: Text('点赞'),
                      elevation: 0.0,
                      color: Colors.white,
                    ),
                  ),
                  Expanded(
                    child: RaisedButton.icon(
                      onPressed: (){},
                      icon: Icon(Icons.favorite_border),
                      label: Text('收藏'),
                      elevation: 0.0,
                      color: Colors.white,
                    ),
                  ),
                ],
              )
            ],
          ),
        );
      }).toList()
    );
  }
}