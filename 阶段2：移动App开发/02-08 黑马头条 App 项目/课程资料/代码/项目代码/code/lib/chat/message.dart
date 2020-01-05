import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:heim_app/redux/init.dart';


class MessagePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('消息'),
        elevation: 0.0,
      ),
      body: StoreBuilder<AppState>(
        builder: (context, store){
          print(store.state.msgList);
          return ListView(
            children: store.state.msgList.map((value){
              return Padding(
                padding: EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Row(
                      children: <Widget>[
                        SizedBox(
                          width: 40.0,
                          height: 40.0,
                          child: CircleAvatar(
                            backgroundImage: NetworkImage('http://www.itcast.cn/files/image/201811/20181129154459467.jpg'),
                          ),
                        ),
                        SizedBox(width: 10.0,),
                        Text(
                          '余周周',
                        ),
                        SizedBox(width: 5.0,),
                        Text(
                          '关注了我',
                          style: TextStyle(
                            color: Colors.blue
                          ),
                        )
                      ],
                    ),
                    Padding(
                      padding: EdgeInsets.only(left: 50.0),
                      child: Text(
                        '2018-10-10',
                        style: TextStyle(
                          fontSize: 12.0,
                          color: Colors.grey
                        ),
                      ),
                    )
                  ],
                ),
              );
            }).toList()
          );
        }
      )
    );
  }
}