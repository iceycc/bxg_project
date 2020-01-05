import React, { Component } from "react";

import { View, Text, ActivityIndicator, ScrollView, Image } from "react-native";

export default class MovieList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title")
        ? navigation.getParam("title")
        : "正在加载中...",
      headerRight: <View />
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      movieId: props.navigation.getParam("movieId"),
      movieInfo: {}
    };
  }

  componentWillMount() {
    fetch(`https://api.douban.com/v2/movie/subject/${this.state.movieId}`)
      .then(res => res.json())
      .then(res => {
        //给导航栏设置属性title
        this.props.navigation.setParams({
            title:
            res.title.length > 9
                ? res.title.substring(0, 9) + "..."
                : res.title
          });
        this.setState({
          isLoading: false,
          movieInfo: res
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return (
        <ScrollView style={{ padding: 10 }}>
          <Text style={{ marginTop: 10, textAlign: "center", fontSize: 25 }}>
            {this.state.movieInfo.title}
          </Text>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Image
              style={{ width: 300, height: 330 }}
              source={{ uri: this.state.movieInfo.images.large }}
            />
          </View>
          <Text style={{ fontSize: 20, marginTop: 20 }}>主要演员:</Text>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {this.state.movieInfo.casts.map((item, key) => {
              return (
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={{ uri: item.avatars.small }}
                    style={{
                      width: 100,
                      height: 130,
                      marginLeft: 5,
                      marginRight: 5
                    }}
                  />
                  <Text style={{ fontSize: 12, marginTop: 5 }}>
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text style={{ fontSize: 20, marginTop: 20 }}>电影简介:</Text>
          <Text
            style={{ fontSize: 14, color: "#666", padding: 10, lineHeight: 35 }}
          >
            {" "}
            {this.state.movieInfo.summary}
          </Text>
        </ScrollView>
      );
    }
  }
}
