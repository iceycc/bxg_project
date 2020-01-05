/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Image} from 'react-native'
import { createBottomTabNavigator,createStackNavigator } from 'react-navigation'

//导入相应的组件
import HomeScreen from './src/components/home/Home.js'
import MovieScreen from './src/components/movie/Movie.js'
import MovieListScreen from './src/components/movie/MovieList.js'
import MovieInfoScreen from './src/components/movie/MovieInfo.js'
import MineScreen from './src/components/mine/Mine.js'

//创建首页独立的Navigation
const HomeStack = createStackNavigator({
  Home: {
    screen:HomeScreen,
    // 如果是静态的，就可以写死在这里，如果是动态的，不要在这里写，应该在每个组件中进行设置
    navigationOptions:{
      headerTitle:'首 页',
      // headerTintColor:'#ff0000',
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  }
});

//创建电影独立的Navigation
const MovieStack = createStackNavigator({
  Movie: {
    screen:MovieScreen,
    // 如果是静态的，就可以写死在这里，如果是动态的，不要在这里写，应该在每个组件中进行设置
    navigationOptions:{
      headerTitle:'电 影',
      // headerTintColor:'#ff0000',
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  },
  MovieList:{
    screen:MovieListScreen,
    // 如果是静态的，就可以写死在这里，如果是动态的，不要在这里写，应该在每个组件中进行设置
    navigationOptions:{
      // headerTitle:'电影列表',
      // headerTintColor:'#ff0000',
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  },
  MovieInfo:{
    screen:MovieInfoScreen,
    navigationOptions:{
      // headerTitle:'电影详情',
      // headerTintColor:'#ff0000',
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  }
});


//创建我的独立的Navigation
const MineStack = createStackNavigator({
  Mine: {
    screen:MineScreen,
    // 如果是静态的，就可以写死在这里，如果是动态的，不要在这里写，应该在每个组件中进行设置
    navigationOptions:{
      headerTitle:'我 的',
      headerTintColor:'#ff0000',
      headerTitleStyle :{
        flex:1,
        textAlign:'center'
      }
    }
  }
});

// 设置底部TabBar
const TabBar = createBottomTabNavigator({
  Home: {
    screen:HomeStack,
    navigationOptions: {
      tabBarLabel: "首页",
      //focused代表你当前的TabBar是否选中,tintColor就是设置的前景色
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Image
            source={
              focused
                ? require("./src/statics/images/tarBar/home_selected.png")
                : require("./src/statics/images/tarBar/home_normal.png")
            }
            style={{ tintColor: tintColor, width: 25, height: 25 }}
          />
        );
      }
    }
  },
  Movie:{
    screen:MovieStack,
    navigationOptions: {
      tabBarLabel: "电影",
      //focused代表你当前的TabBar是否选中,tintColor就是设置的前景色
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Image
            source={
              focused
                ? require("./src/statics/images/tarBar/movie_selected.png")
                : require("./src/statics/images/tarBar/movie_normal.png")
            }
            style={{ tintColor: tintColor, width: 25, height: 25 }}
          />
        );
      }
    }
  },
  Mine:{
    screen:MineStack,
    navigationOptions: {
      tabBarLabel: "我的",
      //focused代表你当前的TabBar是否选中,tintColor就是设置的前景色
      tabBarIcon: ({ focused, tintColor }) => {
        return (
          <Image
            source={
              focused
                ? require("./src/statics/images/tarBar/mine_selected.png")
                : require("./src/statics/images/tarBar/mine_normal.png")
            }
            style={{ tintColor: tintColor, width: 25, height: 25 }}
          />
        );
      }
    }
  }
},
{
  tabBarOptions:{
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
  }
})

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <TabBar />
  }
}
