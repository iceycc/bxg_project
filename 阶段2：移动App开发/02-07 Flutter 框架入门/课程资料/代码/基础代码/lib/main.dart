import 'package:flutter/material.dart';
import 'package:flutterdemo/button_demo.dart';
import 'package:flutterdemo/home.dart';
import 'package:flutterdemo/route_demo.dart';

void man(){
  // runApp(
  //   Center(
  //     child: Text(
  //       'hello world',
  //       textDirection: TextDirection.ltr,
  //     ),
  //   )
  // );

  // runApp(Hello());

  runApp(App());

}


//https://material.io/ 官网

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter',
      // home: Home(),
      initialRoute: '/',
      debugShowCheckedModeBanner: false,
      routes: {
        '/': (context) => RouteDemo(),
        '/home': (context) => Home(),
        '/button': (context) => ButtonDemo(),
      },
    );
  }
}
