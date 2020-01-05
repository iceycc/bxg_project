import 'package:flutter/material.dart';

class ButtonDemo extends StatelessWidget {

  Widget floatButton(context){
    return FloatingActionButton(
      child: Icon(Icons.settings),
      elevation: 0.0,
      onPressed: (){
        Navigator.pop(context);
      },
      backgroundColor: Colors.red,
    );
  }

  Widget flatButton (){
    return FlatButton(
      child: Text('文字按钮'),
      textColor: Colors.red,
      onPressed: (){
        print('按下了文字按钮');
      },
    );
  }

  Widget flatButtonIcon (){
    return FlatButton.icon(
      icon: Icon(Icons.arrow_back),
      label: Text('图标文字'),
      textColor: Colors.blue,
      onPressed: (){
        print('按下了文字按钮');
      },
    );
  }
  
  Widget raisedButton (){
    return RaisedButton(
      onPressed: (){

      },
      color: Colors.blue,
      elevation: 0.0,
      child: Text('带效果的按钮', style: TextStyle(color: Colors.white),),
      splashColor: Colors.red,
    );
  }

  Widget raisedButtonIcon (){
    return RaisedButton.icon(
      onPressed: (){

      },
      icon: Icon(Icons.arrow_drop_down),
      color: Colors.blue,
      elevation: 0.0,
      label: Text('带效果的按钮', style: TextStyle(color: Colors.white),),
      splashColor: Colors.blue,
    );
  }

  Widget outlineButton (){
    return OutlineButton(
      child: Text('带边框的按钮'),
      onPressed: (){},
      splashColor: Colors.red,
      textColor: Colors.blue,
      borderSide: BorderSide(
        color: Colors.black,
        // width: 3.0
      ),
    );
  }

  Widget outlineButtonIcon (){
    return OutlineButton.icon(
      label: Text('带边框的按钮'),
      icon: Icon(Icons.arrow_drop_up),
      onPressed: (){},
      splashColor: Colors.red,
      textColor: Colors.blue,
      borderSide: BorderSide(
        color: Colors.blue,
        // width: 3.0
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('按钮'),
        elevation: 0.0,
      ),
      body: Column(
        children: <Widget>[
          flatButton(),
          flatButtonIcon(),
          raisedButton(),
          raisedButtonIcon(),
          outlineButton(),
          outlineButtonIcon(),
        ],
      ),
      floatingActionButton: floatButton(context),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}