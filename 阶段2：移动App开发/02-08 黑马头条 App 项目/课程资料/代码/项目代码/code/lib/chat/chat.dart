import 'package:flutter/material.dart';
import 'package:heim_app/moudle/msg.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:heim_app/redux/init.dart';

class ChatPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('小智同学'),
        elevation: 0.0,
      ),
      body: ChatMain(),
    );
  }
}


class ChatMain extends StatefulWidget {
  @override
  _ChatMainState createState() => _ChatMainState();
}

class _ChatMainState extends State<ChatMain> {

  _sendMsg(str){
    // MsgSocket.sendMsg(str);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Expanded(
          child: StoreBuilder<AppState>(builder: (context, store){
            // MsgSocket.link(store);
            return ListView(
              children: store.state.chatList.map((value){
                return Padding(
                  padding: EdgeInsets.only(top: 20.0, left: 20.0),
                  child: Row(
                    children: <Widget>[
                      SizedBox(
                        width: 40.0,
                        height: 40.0,
                        child: CircleAvatar(
                          backgroundImage: NetworkImage('http://www.itcast.cn/files/image/201811/20181129154459467.jpg'),
                        ),
                      ),
                      SizedBox(width: 10.0,),
                      Container(
                        padding: EdgeInsets.all(8.0),
                        child: Text('你好，我在这里'),
                        decoration: BoxDecoration(
                          color: Color.fromRGBO(224, 239, 251, 1),
                          borderRadius: BorderRadius.circular(8.0)
                        ),
                      )
                    ],
                  ),
                );
              }).toList()
              // <Widget>[
                
              //   Padding(
              //     padding: EdgeInsets.all(20.0),
              //     child: Row(
              //       mainAxisAlignment: MainAxisAlignment.end,
              //       children: <Widget>[
              //         Container(
              //           padding: EdgeInsets.all(8.0),
              //           child: Text('你好，我在这里'),
              //           decoration: BoxDecoration(
              //             color: Color.fromRGBO(224, 239, 251, 1),
              //             borderRadius: BorderRadius.circular(8.0)
              //           ),
              //         ),
              //         SizedBox(width: 10.0,),
              //         SizedBox(
              //           width: 40.0,
              //           height: 40.0,
              //           child: CircleAvatar(
              //             backgroundImage: NetworkImage('http://www.itcast.cn/files/image/201811/20181129154459467.jpg'),
              //           ),
              //         ),
              //       ],
              //     ),
              //   )
              // ],
            );
          })
        ),
        Container(
          color: Colors.grey[200],
          padding: EdgeInsets.all(16.0),
          child: Container(
            height: 40.0,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(15.0),
              color: Colors.white,
            ),
            child: TextField(
              onSubmitted: (str){
                _sendMsg(str);
              },
              decoration: InputDecoration(
                enabledBorder: InputBorder.none,
                focusedBorder: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 9.0)
              ),
            ),
          ),
        )
      ],
    );
  }
}