import 'package:flutter/material.dart';

class WidgetDemo extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text(
      '2018年11年30日，由新华网举办的“解锁未来”主题教育论坛在北京金茂万丽酒店举行，知名大中小学校校长、专家学者、教育产业企业家等在内的资深大咖汇聚一堂，围绕在“完善职业教育和培训体系”、“深化产教融合”、“加快双一流建设”、“探索数字化、个性化、终身化教育体系”、“促进优质教育资源共建共享”等话题进行深度讨论。传智播客教育集团受邀参加并获得“2018年度.影响力教育集团”荣誉称号。传智播客助理总裁李廷伟作为代表上台领奖，并接受了新华网教育的专访。',
      style: TextStyle(
        color: Colors.blue,
        fontSize: 20.0,
        fontWeight: FontWeight.w600
      ),
      maxLines: 3,
      overflow: TextOverflow.ellipsis,
    );
  }
}

class WidgetDemoRichText extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        text: '传智播客',
        style: TextStyle(
          color: Colors.blue,
          fontSize: 24.0,
        ),
        children: [
          TextSpan(
            text: '网址：',
            style: TextStyle(
              color: Colors.black,
            )
          ),
          TextSpan(
            text: 'itcast.cn',
            style: TextStyle(
              fontSize: 20.0,
              color: Colors.red,
              fontStyle: FontStyle.italic
            )
          )
        ]
      ),
    );
  }
}


class WidgetDemoContainer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      // color: Colors.grey,
      margin: EdgeInsets.all(10.0),
      padding: EdgeInsets.all(10.0),
      width: double.infinity,
      height: double.infinity,
      decoration: BoxDecoration(
        color: Colors.grey,
        // border: Border(
        //   top: BorderSide(
        //     color: Colors.blue,
        //     width: 3.0
        //   ),
        //   left: BorderSide(
        //     color: Colors.red,
        //     width: 3.0
        //   ),
        //   right: BorderSide(
        //     color: Colors.yellow,
        //     width: 3.0
        //   )
        // )
        border: Border.all(
          color: Colors.blue,
          width: 2.0
        ),
        // borderRadius: BorderRadius.circular(10.0)
        // borderRadius: BorderRadius.all(Radius.circular(10.0))
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(10.0),
          bottomRight: Radius.circular(10.0),
          bottomLeft: Radius.circular(10.0),
        )
      ),
      child: Text('黑马头条App'),
    );
  }
}

class WidgetDemoColumn extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.pink,
      width: double.infinity,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center, //主轴
        crossAxisAlignment: CrossAxisAlignment.end, //交叉轴
        children: <Widget>[
          Icon(Icons.search,size: 40.0,),
          Icon(Icons.cloud,size: 40.0,),
          Icon(Icons.settings,size: 40.0,),
          Icon(Icons.verified_user,size: 40.0,),
          Icon(Icons.archive,size: 40.0,),
        ],
      ),
    );
  }
}

class WidgetDemoRow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.pink,
      height: double.infinity,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center, //主轴
        crossAxisAlignment: CrossAxisAlignment.end, //交叉轴
        children: <Widget>[
          Icon(Icons.search,size: 40.0,),
          Icon(Icons.cloud,size: 40.0,),
          Icon(Icons.settings,size: 40.0,),
          Icon(Icons.verified_user,size: 40.0,),
          Icon(Icons.archive,size: 40.0,),
        ],
      ),
    );
  }
}