import 'package:flutter/material.dart';

class ReportSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.all(10.0),
            child: Text('文章问题'),
          ),
          Divider(),
          Padding(
            padding: EdgeInsets.all(10.0),
            child: Text('文章问题'),
          ),
          Divider(),
          Padding(
            padding: EdgeInsets.all(10.0),
            child: Text('文章问题'),
          ),
          Divider(),
          Padding(
            padding: EdgeInsets.all(10.0),
            child: Text('文章问题'),
          ),
          Divider(),
          Padding(
            padding: EdgeInsets.all(10.0),
            child: Text('文章问题'),
          ),
          Divider(),
          Padding(
            padding: EdgeInsets.all(10.0),
            child: Text('文章问题'),
          ),
          Divider(),
          Padding(
            padding: EdgeInsets.all(10.0),
            child: Text('文章问题'),
          ),
          Divider(),
          GestureDetector(
            onTap: (){
              Navigator.pop(context);
            },
            child: Padding(
              padding: EdgeInsets.all(10.0),
              child: Text('取消'),
            ),
          )
        ],
      ),
    );
  }
}