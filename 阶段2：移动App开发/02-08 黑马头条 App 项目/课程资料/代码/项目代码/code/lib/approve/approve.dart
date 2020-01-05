import 'package:flutter/material.dart';

class ApprovePage extends StatelessWidget {

  Widget tapButton(context){
    return Container(
      margin: EdgeInsets.only(top: 25.0, left: 10.0, right: 10.0),
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(7.0)
      ),
      child: FlatButton(
        onPressed: (){
          Navigator.pushNamed(context, '/imageupload');
        },
        child: Text(
          '申请身份认证',
          style: TextStyle(
            color: Colors.white,
            fontSize: 16.0,
            fontWeight: FontWeight.normal
          ),
        ),
      ),
    );
  }

  Widget prerogative(){
    return Container(
      color: Colors.white,
      child: Column(
        children: <Widget>[
          ListTile(
            title: Text(
              '认证特权'
            ),
          ),
          Divider(height: 0,),
          ListTile(
            leading: CircleAvatar(
              backgroundColor: Colors.blue[100],
              child: Icon(
                Icons.print,
                color: Colors.red,
              ),
            ),
            title: Text(
              '独家标识'
            ),
            subtitle: Text(
              '享受独家标识'
            ),
          ),
          Divider(height: 10.0,),
          ListTile(
            leading: CircleAvatar(
              backgroundColor: Colors.red[100],
              child: Icon(
                Icons.satellite,
                color: Colors.green,
              ),
            ),
            title: Text(
              '优先推荐'
            ),
            subtitle: Text(
              '内容优先推荐'
            ),
          ),
          Divider(height: 10.0,),
          ListTile(
            leading: CircleAvatar(
              backgroundColor: Colors.red[100],
              child: Icon(
                Icons.satellite,
                color: Colors.green,
              ),
            ),
            title: Text(
              '更多特权'
            ),
            subtitle: Text(
              '内容优先推荐'
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('实名认证'),
        elevation: 0.0,
      ),
      body: Container(
        color: Colors.grey[200],
        child: ListView(
          children: <Widget>[
            ApproveContent(),
            prerogative(),
            tapButton(context),
          ],
        ),
      )
    );
  }
}

class ApproveContent extends StatefulWidget {
  @override
  _ApproveContentState createState() => _ApproveContentState();
}

class _ApproveContentState extends State<ApproveContent> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      margin: EdgeInsets.only(bottom: 10.0),
      child: Column(
        children: <Widget>[
          ListTile(
            title: Text(
              '申请条件'
            ),
          ),
          Divider(height: 0,),
          ListTile(
            title: Text(
              '有清晰的头像',
              style: TextStyle(
                color: Colors.grey,
                fontSize: 14.0
              ),
            ),
            trailing: Text(
              '已完成',
              style: TextStyle(
                fontSize: 14.0
              ),
            ),
          ),
          Divider(height: 0,),
          ListTile(
            title: Text(
              '有合法的用户名',
              style: TextStyle(
                color: Colors.grey,
                fontSize: 14.0
              ),
            ),
            trailing: Text(
              '已完成',
              style: TextStyle(
                fontSize: 14.0
              ),
            ),
          ),
          Divider(height: 0,),
          ListTile(
            title: Text(
              '绑定手机',
              style: TextStyle(
                color: Colors.grey,
                fontSize: 14.0
              ),
            ),
            trailing: Text(
              '未完成',
              style: TextStyle(
                fontSize: 14.0,
                color: Colors.blue
              ),
            ),
          ),
          Divider(height: 0,),
          ListTile(
            title: Text(
              '发布过内容',
              style: TextStyle(
                color: Colors.grey,
                fontSize: 14.0
              ),
            ),
            trailing: Text(
              '未完成',
              style: TextStyle(
                fontSize: 14.0,
                color: Colors.blue
              ),
            ),
          ),
        ],
      ),
    );
  }
}