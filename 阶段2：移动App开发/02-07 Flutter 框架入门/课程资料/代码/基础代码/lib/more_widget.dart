import 'package:flutter/material.dart';

class MoreWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        //固定比例的组件
        AspectRatio(
          aspectRatio: 16/9,
          child: Container(
            color: Colors.lightBlue,
          ),
        ),
        AspectRatio(
          aspectRatio: 4/3,
          child: Image.asset(
            'images/pic.jpg',
            fit: BoxFit.cover,
          )
        ),
        Stack(
          children: <Widget>[
            Container(
              color: Colors.blue,
              width: double.infinity,
              height: 200.0,
            ),
            Positioned(
              right: 10.0,
              child: Icon(Icons.ac_unit, color: Colors.white,),
            ),
            Positioned(
              right: 30.0,
              child: Icon(Icons.ac_unit, color: Colors.white,),
            ),
            Positioned(
              left: 10.0,
              child: Icon(Icons.ac_unit, color: Colors.white,),
            ),
            Positioned(
              top: 100.0,
              child: Icon(Icons.ac_unit, color: Colors.white,),
            ),
          ],
        ),
        ListTile(
          title: Text('个人中心'),
          subtitle: Text('进入个人中心'),
          leading: Icon(Icons.supervised_user_circle),
          trailing: Icon(Icons.arrow_forward_ios),
          onTap: (){
            print('点击了个人中心');
          },
        ),
        Divider(height: 0,),
        ListTile(
          title: Text('我的收藏'),
          subtitle: Text('进入我的收藏'),
          leading: Icon(Icons.favorite),
          trailing: Icon(Icons.arrow_forward_ios),
          onTap: (){
            print('');
          },
        ),
        Divider(height: 0,),
        ListTile(
          title: Text('设置'),
          subtitle: Text('进入设置'),
          leading: Icon(Icons.settings),
          trailing: Icon(Icons.arrow_forward_ios),
          onTap: (){
            print('');
          },
        ),
        Divider(height: 0,),
        Chip(
          label: Text('html'),
          backgroundColor: Colors.red,
          avatar: CircleAvatar(
            backgroundColor: Colors.yellow,
            child: Text('E'),
          ),
          // deleteIcon: Icon(Icons.delete),
          onDeleted: (){
            print('删除');
          },
        )
      ],
    );
  }
}