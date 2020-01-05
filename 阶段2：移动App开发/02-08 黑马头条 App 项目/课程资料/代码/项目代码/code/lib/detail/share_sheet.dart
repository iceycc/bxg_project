import 'package:flutter/material.dart';
import 'package:heim_app/detail/report_sheet.dart';

class ShareSheet extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 250.0,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: <Widget>[
          Row(
            children: <Widget>[
              Expanded(
                child: Column(
                  children: <Widget>[
                    Icon(Icons.settings, size: 40.0),
                    Text('微信'),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  children: <Widget>[
                    Icon(Icons.settings, size: 40.0),
                    Text('朋友圈'),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  children: <Widget>[
                    Icon(Icons.settings, size: 40.0),
                    Text('微博'),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  children: <Widget>[
                    Icon(Icons.settings, size: 40.0),
                    Text('QQ'),
                  ],
                ),
              ),
            ],
          ),
          Row(
            children: <Widget>[
              Expanded(
                child: Column(
                  children: <Widget>[
                    Icon(Icons.settings, size: 40.0),
                    Text('显示设置'),
                  ],
                ),
              ),
              Expanded(
                child: GestureDetector(
                  onTap: (){
                    Navigator.pop(context);
                    showModalBottomSheet(
                      context: context,
                      builder: (BuildContext context){
                        return ReportSheet();
                      }
                    );
                  },
                  child: Column(
                    children: <Widget>[
                      Icon(Icons.error, size: 40.0),
                      Text('举报'),
                    ],
                  ),
                )
              ),
              Expanded(
                child: Column(
                  children: <Widget>[
                    
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  children: <Widget>[
                    
                  ],
                ),
              ),
            ],
          ),
          Center(
            child: Text('取消'),
          )
        ],
      )
    );
  }
}