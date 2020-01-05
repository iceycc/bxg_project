import 'package:flutter/material.dart';
import 'package:heim_app/detail/comment.dart';
import 'package:heim_app/detail/share_sheet.dart';
import 'package:heim_app/moudle/pub.dart';
import 'package:timeago/timeago.dart' as timeago;

class DetailPage extends StatefulWidget {
  final int id;
  DetailPage(this.id);
  @override
  _DetailPageState createState() => _DetailPageState();
}

class _DetailPageState extends State<DetailPage> {

  var detail;
  List recommnets;
  bool _isFollow;

  _getDetail() async{
    var detailData = await PubMoudle.httpRequest('get', '/getDetail?id=${widget.id}');
    setState(() {
      detail = detailData.data['data'];
      recommnets = detail['recomments'];
      _isFollow = detail['is_followed'];
    });
  }

  _follow () async{
    // var detailData = await PubMoudle.httpRequest('get', '/getDetail?id=${widget.id}');
    setState(() {
      _isFollow = !_isFollow;     
    });
  }

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration(seconds: 1),(){
      _getDetail();
    });
    
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: detail == null ? Center(
        child: CircularProgressIndicator(),
      ):CustomScrollView(
        slivers: <Widget>[
          SliverAppBar(
            title: Text(detail['title']),
            actions: <Widget>[
              IconButton(
                icon: Icon(Icons.more_horiz),
                onPressed: (){
                  print('点击了举报');
                  showModalBottomSheet(
                    context: context,
                    builder: (BuildContext context){
                      return ShareSheet();
                    }
                  );
                },
              )
            ],
          ),
          SliverList(
            delegate: SliverChildListDelegate([
              Padding(
                padding: EdgeInsets.all(20.0),
                child: Text(
                  detail['title'],
                  style: TextStyle(
                    fontSize: 22.0,
                    fontWeight: FontWeight.w600
                  ),
                ),
              )
            ]),
          ),
          ///作者
          MediaQuery.removePadding(
            context: context,
            removeBottom: true,
            child: SliverPersistentHeader(
              pinned: true,
              delegate: _SliverAppBarDelegate(
                childBar: AppBar(
                  brightness: Brightness.light,
                  elevation: 0.0,
                  title: Container(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            SizedBox(
                              width: 35.0,
                              height: 35.0,
                              child: GestureDetector(
                                onTap: (){

                                },
                                child: CircleAvatar(
                                  backgroundImage: NetworkImage(detail['aut_photo']),
                                ),
                              ),
                            ),
                            SizedBox(width: 10.0,),
                            Text(
                              detail['aut_name'],
                              style: TextStyle(
                                color: Colors.black,
                                fontSize: 14.0
                              ),
                            ),
                          ],
                        ),
                        RaisedButton.icon(
                          onPressed: (){

                          },
                          icon: Icon(
                            detail['is_followed'] == false ? Icons.add: Icons.timelapse,
                            color: Colors.white,
                          ),
                          label: Text(
                            detail['is_followed'] == false ? '关注': '已关注',
                            style: TextStyle(
                              color: Colors.white
                            ),
                          ),
                          color: Colors.blue,
                          elevation: 0.0,
                        )
                      ],
                    ),
                  ),
                  backgroundColor: Color.fromRGBO(247, 247, 247, 1),
                  leading: IconButton(
                    icon: Icon(
                      Icons.arrow_back_ios,
                      color: Colors.grey,
                    ),
                    onPressed: (){},
                  ),
                  actions: <Widget>[
                    IconButton(
                      icon: Icon(
                        Icons.more_horiz,
                        color: Colors.grey,
                      ),
                      onPressed: (){

                      },
                    )
                  ],
                ),
                child: Container(
                  padding: EdgeInsets.all(20.0),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          SizedBox(
                            width: 45.0,
                            height: 45.0,
                            child: GestureDetector(
                              onTap: (){

                              },
                              child: CircleAvatar(
                                backgroundImage: NetworkImage(detail['aut_photo']),
                              ),
                            ),
                          ),
                          SizedBox(width: 10.0,),
                          Column(
                            children: <Widget>[
                              Text(
                                detail['aut_name'],
                                style: TextStyle(
                                  color: Colors.black,
                                ),
                              ),
                              Text(
                                timeago.format(DateTime.parse(detail['pubdate'])),
                                style: TextStyle(
                                  color: Colors.grey,
                                  fontSize: 14.0
                                ),
                              ),
                            ],
                          )
                        ],
                      ),
                      RaisedButton.icon(
                        onPressed: (){

                        },
                        icon: Icon(
                          detail['is_followed'] == false ? Icons.add: Icons.timelapse,
                          color: Colors.white,
                        ),
                        label: Text(
                          detail['is_followed'] == false ? '关注': '已关注',
                          style: TextStyle(
                            color: Colors.white
                          ),
                        ),
                        color: Colors.blue,
                        elevation: 0.0,
                      )
                    ],
                  ),
                )
              ),
            ),
          ),
          SliverList(
            delegate: SliverChildListDelegate([
              Padding(
                padding: EdgeInsets.all(20.0),
                child: Text(
                  '''${detail['content']}''',
                  style: TextStyle(
                    fontSize: 16.0,
                  ),
                ),
              ),
              Padding(
                padding: EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      '猜你喜欢',
                      style: TextStyle(
                        fontSize: 16.0,
                        fontWeight: FontWeight.w600
                      ),
                    ),
                    SizedBox(height: 10.0,),
                    Wrap(
                      children: recommnets.map((value){
                        return GestureDetector(
                          onTap: (){
                            Navigator.push(context, MaterialPageRoute(
                              builder: (context) => DetailPage(value['id'])
                            ));
                          },
                          child: Container(
                            margin: EdgeInsets.only(bottom: 10.0),
                            width: MediaQuery.of(context).size.width / 2 - 20,
                            child: Text(
                              value['title'],
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        );
                      }).toList()
                    )
                  ],
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  GestureDetector(
                    onTap: (){

                    },
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 25.0, vertical: 5.0),
                      decoration: BoxDecoration(
                        border: Border.all(
                          width: 1.0,
                          color: Colors.red
                        ),
                        borderRadius: BorderRadius.circular(15.0)
                      ),
                      child: Row(
                        children: <Widget>[
                          Icon(
                            Icons.thumb_up,
                            color: Colors.red,
                          ),
                          SizedBox(width: 4.0,),
                          Text(
                            '点赞',
                            style: TextStyle(
                              color: Colors.red
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: (){},
                    child: Container(
                      padding: EdgeInsets.symmetric(horizontal: 25.0, vertical: 5.0),
                      decoration: BoxDecoration(
                        border: Border.all(
                          width: 1.0,
                          color: Colors.grey
                        ),
                        borderRadius: BorderRadius.circular(15.0)
                      ),
                      child: Row(
                        children: <Widget>[
                          Icon(Icons.delete),
                          SizedBox(width: 4.0,),
                          Text('不喜欢')
                        ],
                      ),
                    ),
                  )
                ],
              ),
              Comment(),
            ]),
          ),
        ],
      ),
    );
  }
}

class _SliverAppBarDelegate extends SliverPersistentHeaderDelegate {

  final Widget child;
  final Widget childBar;
  _SliverAppBarDelegate({this.child, this.childBar});

  @override
  double get maxExtent => 100.0;

  @override
  double get minExtent => 100.0;

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    if(shrinkOffset > 0){
      return SizedBox(child: childBar,);
    }else{
      return SizedBox(child: child,);
    }
    
  }

  @override
  bool shouldRebuild(SliverPersistentHeaderDelegate oldDelegate) {
    return false;
  }

}