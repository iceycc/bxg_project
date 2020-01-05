import 'package:flutter/material.dart';

class PageDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
        //图片
        Image.asset('images/pic.jpg'),
        //标题
        Padding(
          padding: EdgeInsets.all(20.0),
          child: Row(
            children: <Widget>[
              //两行标题
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      '传智播客发布“N+12”课程,拓展在职阶段IT技能提升培训',
                      style: TextStyle(
                        fontWeight: FontWeight.w600
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    SizedBox(height: 5.0,),
                    Text(
                      '多知网9月11日消息，昨日IT培训公司传智播客在京举行2018秋季课程发布会，并推出新的教学模式——传智播客“N+12”课程体系',
                      style: TextStyle(
                        color: Colors.grey
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              Icon(Icons.star, color: Colors.red,),
              Text('12')
            ],
          )
        ),
        //按钮
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            // Column(
            //   children: <Widget>[
            //     Icon(Icons.share, color: Colors.blue,),
            //     SizedBox(height: 7.0,),
            //     Text('SHARE',style: TextStyle(color: Colors.blue),)
            //   ],
            // )
            PubIcon(Icons.phone,'PHONE'),
            PubIcon(Icons.router,'ROUTE'),
            PubIcon(Icons.share,'SHARE'),
          ],
        ),
        //长文字
        Padding(
          padding: EdgeInsets.all(20.0),
          child: Text(
            '传智播客副总裁毕向东表示，当前通过在线平台进行学习的人群在大幅度增加，而51.7%在线学习者主要目的是为了升职加薪。因IT技术更新迭代速度快，IT开发者如不坚持学习，很容易被淘汰，这类人群在线学习的需求更盛。而市面上存在的IT在线学习课程，多是大而全，针对性不强，在职人员往往无法找到和自身技术匹配的在线课程，学习效率并不高.IT培训不应该再是一锤子买卖”毕向东如是说。IT培训行业发展了18年，一直是学员学完课程，高薪就业了，服务就算结束。可是这些学员就业后面对陌生的职场和工作要求，很多都是迷茫的。如何才能快速升职加薪，对IT从业者来说尤为重要。'
          ),
        )
      ],
    );
  }
}

class PubIcon extends StatelessWidget {
  final IconData icon;
  final String text;
  PubIcon(this.icon, this.text);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Icon(icon, color: Colors.blue,),
        SizedBox(height: 7.0,),
        Text(text,style: TextStyle(color: Colors.blue),)
      ],
    );
  }
}