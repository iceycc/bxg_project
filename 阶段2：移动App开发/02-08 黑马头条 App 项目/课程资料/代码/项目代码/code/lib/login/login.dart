import 'dart:async';
import 'package:flutter/material.dart';
import 'package:heim_app/moudle/pub.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('登录'),
        elevation: 0.0,
      ),
      body: Container(
        color: Colors.grey[100],
        child: Formregist()
      ),
    );
  }
}

class Formregist extends StatefulWidget {
  @override
  _FormregistState createState() => _FormregistState();
}

class _FormregistState extends State<Formregist> {

  String _verifyStr = '获取验证码';
  int _seconds = 0;
  Timer _timer;

  String username = '';
  String smsCode = '';

  _getSmsCode() async{
    if(_seconds == 0 && username != ''){
      print('开始定时器');
      _startTimer();
      //1开始倒计时
      //2请求短信接口


      PubMoudle.httpRequest('get', '/getsmscode?phone=$username').then((value){
        print(value.data['code']);
        if(value.data['code'] == 1){
          Scaffold.of(context).showSnackBar(
            SnackBar(content: Text('验证码已发送'),)
          );
        }else{
          Scaffold.of(context).showSnackBar(
            SnackBar(content: Text(value.data['message']),)
          );
        }
      });

      //http请求
      //1.引入io
      //2.建立client
      // var httpClient = new HttpClient();
      // //3.构造URI
      // var uri = new Uri.http('example.com', '/path', {'name':'黑马'});
      // //4。发起请求
      // var request = await httpClient.getUrl(uri);
      // //5。关闭请求等待
      // var response = await request.close();
    }
  }

  _startTimer(){
    _seconds = 60;
    _timer = Timer.periodic(Duration(seconds: 1), (timer){
      if(_seconds == 0){
        _cancelTimer();
        return;
      }
      _seconds--;
      setState(() {
        if(_seconds == 0){
          _verifyStr = '重新获取';
        }else{
          _verifyStr = '$_seconds(S)';
        }
      });
    });
  }

  _cancelTimer(){
    _timer.cancel();
  }

  _login (){
    PubMoudle.httpRequest('post', '/authorizations', {"username": username, "smscode": smsCode}).then((value) async{
      print(value);
      SharedPreferences prefs = await SharedPreferences.getInstance();
      // print(prefs.getString('token'));
      if(value.data['code'] == 1){
        Scaffold.of(context).showSnackBar(
          SnackBar(content: Text('登录成功'),)
        );
        await prefs.setString('token', value.data['data']['token']);
        //跳转
        // Navigator.push(context, MaterialPageRoute(
        //   builder: (context) => Home()
        // ));

        // Navigator.pushNamed(context, '/home');

        Navigator.pushNamedAndRemoveUntil(context, '/home', (route)=>false);

      }else{
        Scaffold.of(context).showSnackBar(
          SnackBar(content: Text(value.data['message']),)
        );
      }
    });
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    super.dispose();
    _cancelTimer();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Container(
          color: Colors.white,
          padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
          child: TextField(
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
            onSubmitted: (value){},
          ),
        ),
        Container(
          color: Colors.white,
          child: Row(
            children: <Widget>[
              Expanded(
                child: Padding(
                  padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 5.0),
                  child: TextField(
                    keyboardType: TextInputType.phone,
                    decoration: InputDecoration(
                      prefixIcon: Icon(
                        Icons.lock,
                        color: Colors.grey,
                      ),
                      focusedBorder: UnderlineInputBorder(
                        borderSide: BorderSide.none
                      ),
                      enabledBorder: UnderlineInputBorder(
                        borderSide: BorderSide.none
                      ),
                      hintText: '请输入验证码',
                      hintStyle: TextStyle(
                        color: Colors.black38,
                        fontSize: 14.0
                      )
                    ),
                    onChanged: (value){
                      setState(() {
                        smsCode = value;                
                      });
                    },
                    onSubmitted: (value){},
                  ),
                ),
              ),
              GestureDetector(
                onTap: (){
                  print('获取了验证码');
                  _getSmsCode();
                },
                child: Container(
                  alignment: Alignment.center,
                  width: 110.0,
                  height: 30.0,
                  decoration: BoxDecoration(
                    color: Color.fromRGBO(237, 237, 237, 1),
                    borderRadius: BorderRadius.circular(120.0)
                  ),
                  child: Text(_verifyStr),
                ),
              ),
              SizedBox(
                width: 10.0,
              )
            ],
          ),
        ),
        Container(
          height: 45.0,
          padding: EdgeInsets.symmetric(horizontal: 10.0),
          width: double.infinity,
          margin: EdgeInsets.only(top:20.0),
          child: RaisedButton(
            onPressed: username =='' || smsCode == '' ? null : (){
              _login();
            },
            child: Text(
              '登录',
              style: TextStyle(
                color: Colors.white
              ),
            ),
            elevation: 0.0,
            color: Colors.blue,
            disabledColor: Colors.blue[200],
          ),
        )
      ],
    );
  }
}