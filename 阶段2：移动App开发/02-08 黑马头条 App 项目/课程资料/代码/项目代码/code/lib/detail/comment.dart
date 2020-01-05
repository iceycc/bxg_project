import 'package:flutter/material.dart';

class Comment extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(20.0),
      child: Column(
        children: <Widget>[
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                margin: EdgeInsets.only(top:5.0),
                width: 30.0,
                height: 30.0,
                child: CircleAvatar(
                  backgroundColor: Colors.red,
                ),
              ),
              SizedBox(width: 10.0,),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Padding(
                          padding: EdgeInsets.all(0.0),
                          child: Text('传智播客'),
                        ),
                        Row(
                          children: <Widget>[
                            Icon(
                              Icons.thumb_up,
                              size: 20.0,
                            ),
                            Text('12')
                          ],
                        )
                      ],
                    ),
                    Text('猜你喜欢猜你喜欢猜你喜欢猜你喜欢'),
                    Row(
                      children: <Widget>[
                        Text('2019-10-12'),
                        SizedBox(width: 10.0,),
                        Chip(
                          padding: EdgeInsets.all(0.0),
                          label: Text('12 回复'),
                        )
                      ],
                    )
                  ],
                ),
              )
            ],
          ),
          Divider(),
          Row(
            children: <Widget>[
              Expanded(
                child: Container(
                  height: 30.0,
                  decoration: BoxDecoration(
                    border: Border.all(
                      color: Colors.black12
                    ),
                    borderRadius: BorderRadius.circular(30.0)
                  ),
                  child: TextField(
                    decoration: InputDecoration(
                      hintText: '写评论',
                      hintStyle: TextStyle(
                        fontSize: 14.0
                      ),
                      contentPadding: EdgeInsets.all(4.0),
                      enabledBorder: InputBorder.none,
                      focusedBorder: InputBorder.none
                    ),
                    onSubmitted: (str){
                      //
                    },
                  ),
                ),
              ),
              IconButton(
                icon: Icon(Icons.share),
                onPressed: (){},
              ),
              IconButton(
                icon: Icon(Icons.favorite),
                onPressed: (){},
              ),
              IconButton(
                icon: Icon(Icons.chat),
                onPressed: (){},
              ),
            ],
          )
        ],
      ),
    );
  }
}