import 'package:flutter/material.dart';
import 'package:heim_app/moudle/pub.dart';

class DrawerList extends StatefulWidget {
  final VoidCallback refresh;
  DrawerList(this.refresh);
  @override
  _DrawerListState createState() => _DrawerListState();
}

class _DrawerListState extends State<DrawerList> {

  List userChannel = [];
  List allChannel = [];
  bool isEdite = false;

  _getUserChannels() async{
    var channelData = await PubMoudle.httpRequest('get', '/getchannels');
    setState(() {
      userChannel = channelData.data['data']['channels'];   
    });
  }
  _getAllChannels() async{
    var channelData = await PubMoudle.httpRequest('get', '/getallchannels');
    setState(() {
      allChannel = channelData.data['data']['channels']; 
    });
  }

  _getUserInfo(){

  }

  _removeChannel(id) async{
    // var channelData = await PubMoudle.httpRequest('delete', '/removechannels', {'id':id});
  }

  _addChannel(id) async{

  }

  @override
  void initState() {
    super.initState();
    _getAllChannels();
    _getUserChannels();
    _getUserInfo();
  }

  @override
  void dispose() {
    super.dispose();
    widget.refresh();
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.all(0.0),
        children: <Widget>[
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue
            ),
            child: Center(
              child: SizedBox(
                width: 60.0,
                height: 60.0,
                child: CircleAvatar(
                  child: Text('张三'),
                ),
              ),
            ),
          ),
          ListTile(
            title: Text(
              '我的频道',
              style: TextStyle(
                fontSize: 16.0,
                fontWeight: FontWeight.normal
              ),
            ),
            trailing: Container(
              padding: EdgeInsets.symmetric(horizontal: 10.0, vertical: 2.0),
              decoration: BoxDecoration(
                border: Border.all(
                  color: Colors.red
                ),
                borderRadius: BorderRadius.circular(15.0)
              ),
              child: GestureDetector(
                onTap: (){
                  setState(() {
                    isEdite = !isEdite;                 
                  });
                },
                child: Text(
                  isEdite?'完成':'编辑',
                  style: TextStyle(
                    color: Colors.red
                  ),
                ),
              )
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 15.0),
            child: Wrap(
              spacing: 15.0,
              children: userChannel.map((value){
                return Chip(
                  label: Text(value['name']),
                  onDeleted: isEdite?(){
                    setState(() {
                      userChannel.remove(value);                     
                    });
                    //接口
                    _removeChannel(value['id']);
                  }:null,
                );
              }).toList()
            ),
          ),
          ListTile(
            title: Text(
              '频道推荐',
              style: TextStyle(
                fontSize: 16.0,
                fontWeight: FontWeight.normal
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 15.0),
            child: Wrap(
              spacing: 15.0,
              children: allChannel.map((value){
                return FilterChip(
                  avatar: CircleAvatar(
                    backgroundColor: Colors.grey,
                    child: Text(
                      '+',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16.0
                      ),
                    ),
                  ),
                  label: Text(value['name']),
                  onSelected: (status){
                    //走接口
                    _addChannel(value['id']);
                    setState(() {
                      allChannel.remove(value); 
                      userChannel.add(value);                     
                    });
                  },
                );
              }).toList()
            ),
          ),
        ],
      ),
    );
  }
}