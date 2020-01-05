import 'package:dio/dio.dart';
import 'package:heim_app/moudle/config.dart';
import 'package:shared_preferences/shared_preferences.dart';

Dio dio = new Dio();


class PubMoudle {

  static httpRequest(method, url, [data]) async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    try{
      dio.options.headers['Authorization'] = prefs.getString('token')??'';
      Response response;
      switch (method){
        case "get":
        response = await dio.get(Config.baseUrl + url);
        break;
        case "post":
        response = await dio.post(Config.baseUrl + url, data: data);
        break;
        case "delete":
        response = await dio.delete(Config.baseUrl + url, data: data);
        break;
      }
      return response;
    } catch(err){
      print(err);
    }
  }

  static checkUser ()async{
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

}