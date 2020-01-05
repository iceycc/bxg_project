
import 'package:redux/redux.dart';
import 'package:flutter/material.dart';

class AppState {
  String token;
  ThemeData themeData;
  List chatList;
  List msgList;
  AppState({this.token, this.themeData, this.chatList, this.msgList});
}

AppState appReducer(state, action){
  return AppState(
    token: UpdateToken(state.token, action),
    themeData: UpdateTheme(state.themeData, action),
    chatList: UpdateChat(state.chatList, action),
    msgList: GetMsgList(state.msgList, action),
  );
}

final GetMsgList = combineReducers<List>([
  TypedReducer<List, MessageActionPrise>(_msgPrise),
  TypedReducer<List, MessageActionShare>(_msgShare),
]);

List _msgShare(List msgList, action){
  msgList.insert(0, action.msg);
  return msgList;
}

class MessageActionShare {
  final String msg;
  MessageActionShare(this.msg);
}


List _msgPrise(List msgList, action){
  msgList.insert(0, action.msg);
  return msgList;
}

class MessageActionPrise {
  final String msg;
  MessageActionPrise(this.msg);
}


final UpdateChat = combineReducers<List>([
  TypedReducer<List, ChatAction>(_addChat)
]);

List _addChat(List chatList, action){
  chatList.insert(0, action.chatlist);
  return chatList;
}

class ChatAction {
  List chatlist;
  ChatAction(this.chatlist);
}

final UpdateTheme = combineReducers<ThemeData>([
  TypedReducer<ThemeData, ThemeAction>(_refreshTheme)
]);

ThemeData _refreshTheme (ThemeData themeDta, action){
  themeDta = action.theme;
  return themeDta;
}

class ThemeAction {
  final ThemeData theme;
  ThemeAction(this.theme);
}



final UpdateToken = combineReducers<String>([
  TypedReducer<String, TokenAction>(_refreshToken)
]);

//action方法
String _refreshToken (String token, action){
  token = action.token;

  return token;
}

//定义一个action类
class TokenAction {
  final token;

  TokenAction(this.token);
}