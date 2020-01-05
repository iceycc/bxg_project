import 'package:flutter/material.dart';
import 'package:heim_app/approve/approve.dart';
import 'package:heim_app/approve/image_upload.dart';
import 'package:heim_app/chat/chat.dart';
import 'package:heim_app/chat/message.dart';
import 'package:heim_app/home/home.dart';
import 'package:heim_app/login/login.dart';
import 'package:heim_app/moudle/pub.dart';
import 'package:heim_app/personal/collect.dart';
import 'package:heim_app/personal/work.dart';
import 'package:heim_app/redux/init.dart';
import 'package:heim_app/search/search_page.dart';
import 'package:heim_app/sys_set/sysset.dart';
import 'package:heim_app/welcome/swiperpage.dart';
import 'package:heim_app/welcome/welcome_page.dart';
import 'package:redux/redux.dart';
import 'package:flutter_redux/flutter_redux.dart';

void main() {
  PubMoudle.checkUser().then((value){
    runApp(App(value));
  });
}

class App extends StatelessWidget {
  final String token;
  App(this.token);

  final store = new Store<AppState>(
    appReducer,
    initialState: AppState(
      themeData: ThemeData(
        primaryColor: Colors.blue
      ),
      msgList: List()
    )
  );

  @override
  Widget build(BuildContext context) {
    return StoreProvider(
      store: store,
      child: StoreBuilder<AppState>(builder: (context,store){
        return MaterialApp(
          title: '黑马头条',
          home: token!=null?Home():LoginPage(),
          // home: WelcomePage(token),
          // home: SwiperPage(),
          debugShowCheckedModeBanner: false,
          theme: store.state.themeData,
          routes: {
            '/home': (context) => Home(),
            '/login': (context) => LoginPage(),
            '/seach': (context) => SearchPage(),
            '/chat': (context) => ChatPage(),
            '/approve': (context) => ApprovePage(),
            '/imageupload': (context) => ImageUpload(),
            // '/collect': (context) => CollectPage()
            '/work': (context) => WorkPage(),
            '/message': (context) => MessagePage(),
            '/sysset': (context) => SysSet(),
          },
        );
      })
    );
  }
}