import 'package:flutter/material.dart';

class InputWidget extends StatefulWidget {
  @override
  _InputWidgetState createState() => _InputWidgetState();
}

class _InputWidgetState extends State<InputWidget> {

  String username;
  String password;

  _login(){
    print(username);
    print(password);
  }
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(20.0),
      child: Column(
        children: <Widget>[
          // TextField(
          //   decoration: InputDecoration(
          //     icon: Icon(Icons.supervised_user_circle),
          //     labelText: '用户名',
          //     hintText: '请输入用户名',
          //     filled: true,
          //     fillColor: Colors.grey[100],
          //     border: InputBorder.none
          //   ),
          //   onChanged: (value){},
          //   onSubmitted: (value){},
          // ),
          TextField(
            keyboardType: TextInputType.phone,
            decoration: InputDecoration(
              prefixIcon: Icon(
                Icons.mobile_screen_share,
                color: Colors.grey,
              ),
              focusedBorder: UnderlineInputBorder(
                borderSide: BorderSide(
                  color: Colors.black12
                )
              ),
              enabledBorder: UnderlineInputBorder(
                borderSide: BorderSide(
                  color: Colors.black12
                )
              ),
              hintText: '请输入手机号',
              hintStyle: TextStyle(
                color: Colors.black38,
                fontSize: 14.0
              )
            ),
            onChanged: (value){
              setState(() {
                username = value;
              });
            },
          ),
          TextField(
            obscureText: true,
            keyboardType: TextInputType.text,
            decoration: InputDecoration(
              prefixIcon: Icon(
                Icons.code,
                color: Colors.grey,
              ),
              focusedBorder: UnderlineInputBorder(
                borderSide: BorderSide(
                  color: Colors.black12
                )
              ),
              enabledBorder: UnderlineInputBorder(
                borderSide: BorderSide(
                  color: Colors.black12
                )
              ),
              hintText: '请输入手机号',
              hintStyle: TextStyle(
                color: Colors.black38,
                fontSize: 14.0
              )
            ),
            onChanged: (value){
              setState(() {
                password = value;
              });
            },
          ),
          Container(
            width: double.infinity,
            child: RaisedButton(
              color: Colors.blue,
              onPressed: (){
                _login();
              },
              child: Text(
                '登录',
                style: TextStyle(
                  color: Colors.white
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}