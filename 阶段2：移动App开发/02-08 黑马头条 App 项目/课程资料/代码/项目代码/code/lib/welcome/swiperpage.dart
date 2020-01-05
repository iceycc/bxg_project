import 'package:flutter/material.dart';
import 'package:flutter_swiper/flutter_swiper.dart';

class SwiperPage extends StatelessWidget {

  final List<String> imageList = [
    'images/1.png',
    'images/2.png',
    'images/3.png',
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Swiper(
        loop: false,
        itemCount: imageList.length,
        itemBuilder: (BuildContext context, int index){
          if(index == imageList.length - 1){
            // return GestureDetector(
            //   onTap: (){
            //     print('点击了最后一张');
            //   },
            //   child: Image.asset(
            //     imageList[index],
            //     fit: BoxFit.cover
            //   ),
            // );

            return Stack(
              children: <Widget>[
                Image.asset(
                  imageList[index],
                  fit: BoxFit.cover,
                  height: double.infinity,
                ),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 20.0),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20.0),
                      border: Border.all(
                        color: Colors.blueAccent
                      )
                    ),
                    margin: EdgeInsets.only(bottom: 30.0),
                    child: FlatButton(
                      onPressed: (){
                        print('点击了体验');
                        Navigator.pushNamed(context, '/login');
                      },
                      child: Text(
                        '立即体验',
                        style: TextStyle(
                          fontSize: 22.0,
                          color: Colors.blue,
                          fontWeight: FontWeight.normal
                        ),
                      ),
                    ),
                  ),
                )
              ],
            );
          }else{
            return Image.asset(
              imageList[index],
              fit: BoxFit.cover
            );
          }
        },
      ),
    );
  }
}