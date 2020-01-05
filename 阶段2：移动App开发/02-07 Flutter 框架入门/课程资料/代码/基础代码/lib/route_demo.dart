import 'package:flutter/material.dart';
import 'package:flutterdemo/button_demo.dart';

class RouteDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('路由'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){
          Navigator.push(context, 
            MaterialPageRoute(builder: (context)=>ButtonDemo())
          );
          Navigator.pushNamed(context, '/button');
        },
        child: Icon(Icons.arrow_forward_ios),
      ),
    );
  }
}