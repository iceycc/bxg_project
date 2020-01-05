import React, { Component } from "react";

import { Spin, Alert, Rate } from "antd";

import fetchJsonp from "fetch-jsonp";

import "../../statics/style/MovieList.css"

const everyItemStyle = {
  border: "1px solid #eee",
  margin: 5,
  paddingTop: 5
};

export default class MovieListComponent extends Component {
  constructor() {
    super();

    this.state = {
      movieType: "in_theaters", //电影类型
      isLoading: true, //是否正在加载中
      movieList: [] //电影列表
    };
  }
  componentWillMount() {
    this.getMovieListByMovieType();
  }
  getMovieListByMovieType() {
    const url = `https://api.douban.com/v2/movie/${this.state.movieType}`;
    fetchJsonp(url)
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        this.setState({
          isLoading: false, //不需要再加载了
          movieList: data.subjects //给电影列表赋上了值
        });
      })
      .catch(function(e) {
        console.log(e);
        console.log("Oops, error");
      });
  }
  // 当父组件给我们传递了新的值的时候，就可以实现该生命周期钩子，拿到父组件传递过来的最新的数据
  componentWillReceiveProps(props) {
    // console.log(props)

    this.setState(
      {
        isLoading: true,
        movieType: props.match.params.movieType
      },
      () => {
        this.getMovieListByMovieType();
      }
    );
  }
  render() {
    if (this.state.isLoading) {
      return (
        <Spin tip="加载中...">
          <Alert
            message="正在加载中"
            description="哥正在拼命加载中..."
            type="info"
          />
        </Spin>
      );
    } else {
      return (
        <div style={{ display: "flex", flexWrap: "wrap", textAlign: "center" }}>
          {/* 在JSX中使用js函数，或是赋值，都要使用`{}` */}
          {this.state.movieList.map((item, i) => {
            return (
              <div style={everyItemStyle} className="movieItem" key={i} onClick={()=>{this.goMovieInfo(item.id)}}>
                {/* 图片 */}
                <img width={270} height={385} src={item.images.small} alt="" />
                {/* 标题 */}
                <p>
                  <strong>{item.title}</strong>
                </p>
                {/* 电影类型 */}
                <p>
                  <strong>{item.genres.join(",")}</strong>
                </p>
                {/* 上映年份 */}
                <p>
                  <strong>{item.year}年</strong>
                </p>
                {/* 评分 */}
                <div>
                  <Rate disabled defaultValue={item.rating.average / 2} />
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  }
  goMovieInfo(movieId){
    // 拿到this，我们就需要绑定函数

    // 使用编程式导航触发路由
    this.props.history.push(`/movie/info/${movieId}`)
  }
}
