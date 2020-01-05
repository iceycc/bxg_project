import React, { Component } from "react";

import fetchJsonp from "fetch-jsonp";

import {Button,Icon,Spin,Alert} from 'antd'

export default class MovieInfoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieId: props.match.params.movieId, //电影id
      isLoading: true, //正在加载中
      movieInfo: {} //电影对象
    };
  }
  componentWillMount() {
    const url = `https://api.douban.com/v2/movie/subject/${this.state.movieId}`;
    fetchJsonp(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoading: false,
          movieInfo: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {/* 返回按钮 */}
        <Button onClick={()=>{this.goBack()}} type="primary">
          <Icon type="left" />返回电影列表
        </Button>

        {/* 渲染真正的内容 */}
        {
            this.renderMovieInfo()
        }
      </div>
    );
  }

  renderMovieInfo(){
    if(this.state.isLoading){
        return (
            <Spin style={{marginTop:'15px'}} tip="加载中...">
              <Alert
                message="正在加载中"
                description="哥正在拼命加载中..."
                type="info"
              />
            </Spin>
          );
    }else{
        return <div style={{marinTop:'25px'}}>
            {/* 标题 */}
            <h2 style={{textAlign:'center'}}>{this.state.movieInfo.title}</h2>
            {/* 图片 */}
            <div style={{textAlign:'center'}}>
                <img src={this.state.movieInfo.images.large}></img>
            </div>
            {/* 主要演员 */}
            <p style={{fontSize:20,fontWeight:700,marginTop:10}}>主要演员:</p>
            <ul style={{listStyle:'none',display:'flex',margin:0,padding:0}}>
            {
                this.state.movieInfo.casts.map((item,i)=>{
                    return <li key={i} style={{margin:'0 5px'}}>
                        <img width="120" heigth="150" src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=aebe0389cc5c10383073c690d378f876/9a504fc2d5628535a233d1b29aef76c6a6ef6355.jpg" alt=""/>
                        <p style={{textAlign:'center'}}>{item.name}</p>
                    </li>
                })
            }
            </ul>
            {/* 剧情简介 */}
            <p style={{fontSize:20,fontWeight:700,marginTop:10}}>剧情简介:</p>
            <p style={{fontSize:14,marginTop:10,lineHeight:'35px',textIndent:'2em'}}>{this.state.movieInfo.summary}</p>
        </div>
    }
  }

  goBack(){
    this.props.history.goBack()
  }
}
