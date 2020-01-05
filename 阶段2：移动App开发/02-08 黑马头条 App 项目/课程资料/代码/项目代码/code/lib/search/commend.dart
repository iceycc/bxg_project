import 'package:flutter/material.dart';

class CommendContent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 15.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Text(
                '猜你想搜',
                style: TextStyle(
                  fontSize: 14.0,
                  color: Colors.black45
                ),
              ),
              FlatButton(
                onPressed: (){},
                child: Text(
                  '不看',
                  style: TextStyle(
                    color: Colors.blue
                  ),
                ),
              )
            ],
          ),
        ),
        Column(
          children: <Widget>[
            ListTile(
              onTap: (){},
              title: Text(
                '大数据课程开发',
                style: TextStyle(
                  fontSize: 14.0
                ),
              ),
            )
          ],
        )
      ],
    );
  }
}