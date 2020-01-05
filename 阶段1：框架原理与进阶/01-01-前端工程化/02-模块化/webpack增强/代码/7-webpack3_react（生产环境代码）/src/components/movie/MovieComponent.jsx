import React, { Component } from "react";

import { Layout, Menu, Icon } from "antd";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import MovieListComponent from './MovieListComponent'
import MovieInfoComponent from './MovieInfoComponent'

// import Loadable from 'react-loadable'

// import LoadingComponent from '../loading/LoadingComponent';

// const MovieListComponent = Loadable({
//   loader: () => import('./MovieListComponent'),
//   loading: LoadingComponent
// })

// const MovieInfoComponent = Loadable({
//   loader: () => import('./MovieInfoComponent'),
//   loading: LoadingComponent
// })

import {Route,Link} from 'react-router-dom'

export default class MovieComponent extends Component {
  render() {
    return (
      <Layout style={{height: '100%'}}>
        <Sider width={200} style={{ background: "#fff",height:'100%'}}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: '1px solid #e8e8e8' }}
          >
            <Menu.Item key="1">
              <Link to="/movie/in_theaters">正在热映</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/movie/coming_soon">即将上映</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/movie/top250">Top250</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        {/* <Layout style={{height:'100%',backgroundColor:"#ffffff" }}> */}
          <Content
            style={{
              background: "#fff",
              margin: 0,
              padding:24,
              minHeight: 280
            }}
          >
            {/* 设置电影列表的路由规则 */}
            <Route path="/movie/:movieType" exact component={MovieListComponent} />
            {/* 设置电影详情的路由规则 */}
            <Route path="/movie/info/:movieId" component={MovieInfoComponent} />
          </Content>
        {/* </Layout> */}
      </Layout>
    );
  }
}
