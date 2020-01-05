import React, { Component } from "react";
// import { hot } from "react-hot-loader";

import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

//导入样式
import "./statics/style/App.css";

import { HashRouter  as Router, Route, Link, Switch } from "react-router-dom";

// import HomeComponent from "./components/home/HomeComponent";
// import MovieComponent from "./components/movie/MovieComponent";
// import AboutComponent from "./components/about/AboutComponent";
// import { ErrorComponent } from "./components/error/ErrorComponent";
// import {NotFoundComponent} from './components/notfound/NotFoundComponent'

import Loadable from 'react-loadable'

import LoadingComponent from './components/loading/LoadingComponent';

const HomeComponent = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './components/home/HomeComponent'),
  loading:LoadingComponent //这个不要忘记写
});
const MovieComponent = Loadable({
  loader: () => import(/* webpackChunkName: "movie" */ './components/movie/MovieComponent'),
  loading:LoadingComponent
});
const AboutComponent = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ './components/about/AboutComponent'),
  loading:LoadingComponent
});
// const ErrorComponent = Loadable({
//   loader: () => import('./components/error/ErrorComponent'),
//   loading:LoadingComponent
// });

class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedIndex: "1"
    };
  }
  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[this.state.selectedIndex]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to="/">首 页</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/movie/in_theaters">电 影</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/about">关 于</Link>
              </Menu.Item>
              {/* <Menu.Item key="4">
                <Link to="/asdadf">错 误</Link>
              </Menu.Item> */}
            </Menu>
          </Header>
          {/* <Layout style={{
              height:'100%',
              backgroundColor: "green"
            }} /> */}
          <Content
            style={{
              height:'100%',minHeight:200,
              backgroundColor: "green"
            }}>
            {/* 到时候用路由去做 */}
            <Switch>
              <Route path="/" exact component={HomeComponent} />
              <Route path="/movie" component={MovieComponent} />
              <Route path="/about" component={AboutComponent} />
              {/* <Route component={ErrorComponent} /> */}
              {/* <Route path="*" component={NotFoundComponent} /> */}
            </Switch>
          </Content>
          {/* </Layout> */}
          <Footer style={{ textAlign: "center" }}>
            我是吃货 ©2018 Created by duanzihuang
          </Footer>
        </Layout>
      </Router>
    );
  }
  componentDidMount() {
  //   const hashValue = window.location.hash;

  //   let selectedIndex = "0";

  //   switch (hashValue) {
  //     case "#/":
  //       selectedIndex = "1";
  //       break;
  //     case "#/movie":
  //     console.log("come here")
  //       selectedIndex = "2";
  //       break;

  //     case "#/about":
  //       selectedIndex = "3";
  //       break;
  //     default:
  //       selectedIndex = "1";
  //       break;
  //   }
    
  //   this.setState({
  //     selectedIndex:"2"
  //   })
  }
}

// export default hot(module)(App);

export default App
