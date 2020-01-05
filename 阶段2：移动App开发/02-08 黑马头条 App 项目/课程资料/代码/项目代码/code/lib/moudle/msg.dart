// import 'package:adhara_socket_io/adhara_socket_io.dart';
// import 'package:heim_app/redux/init.dart';

// SocketIO socket;

// class MsgSocket {

//   static link (store) async{
//     socket = await SocketIOManager().createInstance('http://192.168.1.2:7000/');

//     print('正在链接...');

//     socket.onConnect((data){
//       //链接成功
//     });

//     socket.on("news", (data){   //sample event
//       print(data);
//       store.dispatch(ChatAction(data));
//     });

//     socket.on("msgPrise", (data){   //sample event
//       print(data);
//       store.dispatch(MessageActionPrise(data));
//     });

//     socket.on("msgShare", (data){   //sample event
//       print(data);
//       store.dispatch(MessageActionShare(data));
//     });

//   }

//   static sendMsg(msg){
//     socket.emit("news", ["Hello world!"]);
//   }
  
// }