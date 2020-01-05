import 'package:flutter/material.dart';


//建立组件
class Hello extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        'hello world',
        textDirection: TextDirection.ltr,
        style: TextStyle(
          color: Colors.yellow,
          fontSize: 30.0,
          fontWeight: FontWeight.w600,
          fontStyle: FontStyle.italic
        ),
      ),
    );
  }
}