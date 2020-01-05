import React from 'react'

import {
    TouchableOpacity,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native'

export default (props) => {
    return <View style={{backgroundColor:"white"}}>
        {/* 1.0 头部 */}
        <TouchableOpacity activeOpacity={0.8} style={{direction:'flex',flexDirection:'row',height:35,alignItems:'center',paddingLeft:5,paddingRight:5,justifyContent:'space-between'}} onPress={()=>{
            props.navigation.navigate('MovieList',{title:props.title,movieType:props.movieType})
        }}>
            <Text>{props.title}</Text>
            <Image style={{width:20,height:20}} source={require("../../../statics/images/arrow-right.png")}></Image>
        </TouchableOpacity>

        {/* 2.0 显示内容 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
           {
                props.movieList.map((item,index)=>{
                    return <TouchableOpacity  activeOpacity={0.8}  key={index} style={{width:150,height:250,marginLeft:5,marginRight:5,alignItems:'center'}} onPress={()=>{
                        props.navigation.navigate('MovieInfo',{movieId:item.id})
                    }}>
                        <Image style={{width:150,height:220}} source={{uri:item.images.small}}></Image>
                        <Text style={{fontSize:12,marginTop:5}}>{item.title}</Text>
                    </TouchableOpacity>
                })
           }
        </ScrollView>
    </View>
}