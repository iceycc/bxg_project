import 'package:flutter/material.dart';
import 'package:heim_app/personal/collect.dart';

class UserBtn extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 15.0),
      child: Row(
        children: <Widget>[
          PubBtn(Icons.star_border, '收藏'),
          PubBtn(Icons.access_time, '历史'),
          PubBtn(Icons.loyalty, '作品')
        ],
      ),
    );
  }
}

class PubBtn extends StatelessWidget {
  final IconData icon;
  final String str;

  PubBtn(this.icon, this.str);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: (){
          if(str == '历史' || str == '收藏'){
            // Navigator.pushNamed(context, '/collect');
            Navigator.push(context, MaterialPageRoute(
              builder: (context) => CollectPage(str)
            ));
          }else{
            Navigator.pushNamed(context, '/work');
          }
        },
        child: Column(
          children: <Widget>[
            Icon(
              icon,
              size: 30.0,
            ),
            SizedBox(height: 5.0,),
            Text(
              str,
              style: TextStyle(
                fontSize: 16.0
              ),
            )
          ],
        ),
      )
    );
  }
}