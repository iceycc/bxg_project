import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:flutter_douban/pages/movie/movieList.dart';
import 'package:flutter_douban/pages/movie/movieDetail.dart';

class MoviePage extends StatelessWidget {
  var parentContext;
  MoviePage(this.parentContext);
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
        theme: new ThemeData(
          primarySwatch: Colors.blue,
        ),
        debugShowCheckedModeBanner: false,
        home: new MovieWidget(this.parentContext));
  }
}

class MovieWidget extends StatefulWidget {
  var parentContext;
  MovieWidget(this.parentContext);
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return new MovieState();
  }
}

class MovieState extends State<MovieWidget> {
  var _inTheatersList;
  var _comingSoonList;
  var _top250List;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    //获取我们正在热映，即将上映和Top250的数据
    _getMovieListData();
  }

  // 在这个异步方法里面去发送网络请求
  _getMovieListData() async {
    Dio dio1 = new Dio(new Options(extra: {"type": 'in_theaters'}));
    Dio dio2 = new Dio(new Options(extra: {"type": 'coming_soon'}));
    Dio dio3 = new Dio(new Options(extra: {"type": 'top250'}));

    List<Response> responses = await Future.wait([
      dio1.get("https://api.douban.com/v2/movie/in_theaters?start=0&count=10"),
      dio2.get("https://api.douban.com/v2/movie/coming_soon?start=0&count=10"),
      dio3.get("https://api.douban.com/v2/movie/top250?start=0&count=10")
    ]);

    //遍历获取结果，并且赋值给 _inTheatersList、_comingSoonList、_top250List
    responses.map((Response response) {
      switch (response.request.extra["type"]) {
        case "in_theaters":
          setState(() {
            _inTheatersList = response.data["subjects"];
          });
          break;
        case "coming_soon":
          setState(() {
            _comingSoonList = response.data["subjects"];
          });
          break;
        case "top250":
          setState(() {
            _top250List = response.data["subjects"];
          });
          break;
        default:
      }
    }).toList();
  }

  /**
   * 电影类型，将来进行挑战到电影列表需要带上
   */
  Widget buildMovieScrollView(
      String movieType, List movieList, BuildContext context) {
    var movieTypeName = '';
    switch (movieType) {
      case 'in_theaters':
        movieTypeName = '正在热映';
        break;
      case 'coming_soon':
        movieTypeName = '即将上映';
        break;
      case 'top250':
        movieTypeName = 'top250';
        break;
      default:
    }
    if (movieList == null) {
      return null;
    }
    return new Container(
      margin: EdgeInsets.fromLTRB(0.0, 0.0, 0.0, 10.0),
      color: Colors.white,
      height: 220,
      child: Column(
        children: <Widget>[
          // 标题部分
          new InkWell(
            onTap: () {
              Navigator.of(widget.parentContext).push(new MaterialPageRoute(
                  builder: (ctx) => new MovieList(movieType: movieType)));
            },
            child: new Container(
              // color: Colors.red,
              padding: const EdgeInsets.fromLTRB(10.0, 0.0, 10.0, 0.0),
              height: 40,
              child: new Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  new Text(movieTypeName),
                  new Container(
                    width: 22.0,
                    height: 22.0,
                    child: new Image.asset('images/arrow-right.png'),
                  )
                ],
              ),
            ),
          ),
          new Container(
            // color: Colors.purple,
            height: 180,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: movieList.length,
              itemBuilder: (BuildContext context, int index) {
                String title = movieList[index]["title"];
                var movieId = movieList[index]["id"];
                var imageUrl = movieList[index]["images"]["small"];
                return new InkWell(
                  onTap: () {
                     Navigator.of(widget.parentContext).push(
                        new MaterialPageRoute(
                            builder: (ctx) =>
                                new MovieDetail(movieId: movieId)));
                  },
                  child: new Container(
                    height: 170.0,
                    width: 120.0,
                    margin: const EdgeInsets.fromLTRB(5.0, 0.0, 5.0, 0.0),
                    // color: Colors.green,
                    child: new Column(
                      children: <Widget>[
                        new Container(
                            width: 120.0,
                            height: 150.0,
                            child: new Image.network(imageUrl)),
                        new Text(
                          '$title',
                          style: new TextStyle(fontSize: 13.0),
                          overflow: TextOverflow.ellipsis,
                        )
                      ],
                    ),
                  ),
                );
              },
            ),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Scaffold(
      backgroundColor: const Color(0xFFe9e9ef),
      appBar: new AppBar(
          title: new Text('电影', style: new TextStyle(color: Colors.black)),
          backgroundColor: Colors.white),
      body: _top250List == null
          ? new CircularProgressIndicator()
          : new ListView(
              children: <Widget>[
                // 正在热映部分
                buildMovieScrollView('in_theaters',
                    _inTheatersList != null ? _inTheatersList : [], context),
                // 即将部分
                buildMovieScrollView('coming_soon',
                    _comingSoonList != null ? _comingSoonList : [], context),
                // top250
                buildMovieScrollView(
                    'top250', _top250List != null ? _top250List : [], context)
              ],
            ),
    );
  }
}
