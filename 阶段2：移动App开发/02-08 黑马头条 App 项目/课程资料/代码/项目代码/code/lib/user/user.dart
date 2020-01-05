import 'package:flutter/material.dart';
import 'package:flutter_redux/flutter_redux.dart';
import 'package:heim_app/redux/init.dart';
import 'package:heim_app/user/btn_list.dart';
import 'package:heim_app/user/user_btn.dart';
import 'package:heim_app/user/user_info.dart';

class User extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StoreBuilder<AppState>(builder: (context, store){
      return Scaffold(
        floatingActionButton: FloatingActionButton(
          onPressed: (){
            ThemeData theme = ThemeData(primaryColor: Colors.red);
            store.dispatch(ThemeAction(theme));
          },
        ),
        body: Column(
          children: <Widget>[
            UserInfo(),
            UserBtn(),
            BtnList()
          ],
        ),
      );
    });
  }
}