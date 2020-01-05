import 'package:flutter/material.dart';
import 'package:heim_app/moudle/pub.dart';
import 'package:heim_app/search/commend.dart';
import 'package:heim_app/search/search_hitory.dart';
import 'package:heim_app/search/search_result.dart';

class SearchPage extends StatefulWidget {
  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {

  String keyword;
  List searchData = [];

  _getSearch() async{
    var searchResult = await PubMoudle.httpRequest('get', '/searchresult?str=${keyword}');
    print(searchResult.data['data']['keyword']);
    setState(() {
      searchData = searchResult.data['data']['keyword'];      
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Expanded(
              child: Container(
                height: 35.0,
                padding: EdgeInsets.symmetric(horizontal: 5.0),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(5.0)
                ),
                child: TextField(
                  autofocus: true,
                  onChanged: (str){
                    setState(() {
                      keyword = str;                   
                    });
                    _getSearch();
                  },
                  decoration: InputDecoration(
                    contentPadding: EdgeInsets.all(6.0),
                    hintText: '请输入关键词',
                    enabledBorder: InputBorder.none,
                    focusedBorder: InputBorder.none,
                    prefixIcon: Icon(
                      Icons.search,
                      color: Colors.grey,
                    )
                  ),
                ),
              ),
            ),
            FlatButton(
              onPressed: (){},
              child: Text(
                '取消',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 18.0,
                  fontWeight: FontWeight.normal
                ),
              ),
            )
          ],
        ),
      ),
      body: keyword == null || keyword == '' ? Column(
        children: <Widget>[
          SearchHitory(),
          CommendContent()
        ],
      ):
      ListView(
        children: searchData.map((value){
          return ListTile(
            leading: Icon(
              Icons.search,
              color: Colors.grey,
              size: 20.0,
            ),
            title: Text(value),
            onTap: (){
              Navigator.push(context, MaterialPageRoute(
                builder: (context)=> SearchResult(value)
              ));
            },
          );
        }).toList()
      )
    );
  }
}